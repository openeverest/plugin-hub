package main

import (
	"context"
	"fmt"
	"sort"
	"strings"
	"time"

	"helm.sh/helm/v3/pkg/kube"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
)

const (
	hookLogTimeout   = 10 * time.Second
	hookLogTailLines = 20
	hookLogMaxBytes  = 4 * 1024
	hookLogMaxPods   = 2
)

// hookLogClient adds the output of failed hook Jobs and Pods to the error
// Helm returns, which otherwise only says "BackoffLimitExceeded". Helm's own
// mechanism (Configuration.SetHookOutputFunc) only fires for hooks that opt
// in with the helm.sh/hook-output-log-policy annotation, which extension
// charts do not set. Helm waits for every hook through WatchUntilReady, and a
// failed hook is still there when it returns, before Helm applies the
// hook-failed delete policy, so its logs can be read then.
type hookLogClient struct {
	*kube.Client
}

// Helm type-asserts its client to these optional interfaces; the wrapper must
// keep them.
var (
	_ kube.Interface                    = (*hookLogClient)(nil)
	_ kube.InterfaceExt                 = (*hookLogClient)(nil)
	_ kube.InterfaceLogs                = (*hookLogClient)(nil)
	_ kube.InterfaceThreeWayMerge       = (*hookLogClient)(nil)
	_ kube.InterfaceDeletionPropagation = (*hookLogClient)(nil)
	_ kube.InterfaceResources           = (*hookLogClient)(nil)
)

func (c *hookLogClient) WatchUntilReady(resources kube.ResourceList, timeout time.Duration) error {
	err := c.Client.WatchUntilReady(resources, timeout)
	if err == nil {
		return nil
	}
	clientset, csErr := c.Factory.KubernetesClientSet()
	if csErr != nil {
		return err
	}
	var hooks []hookRef
	for _, info := range resources {
		if info.Mapping == nil {
			continue
		}
		hooks = append(hooks, hookRef{kind: info.Mapping.GroupVersionKind.Kind, namespace: info.Namespace, name: info.Name})
	}
	ctx, cancel := context.WithTimeout(context.Background(), hookLogTimeout)
	defer cancel()
	if out := hookOutput(ctx, clientset, hooks); out != "" {
		return fmt.Errorf("%w\n%s", err, out)
	}
	return err
}

type hookRef struct {
	kind, namespace, name string
}

// hookOutput returns the last log lines of every container of the pods of the
// given Job and Pod hooks, or how a container that wrote nothing is stuck.
func hookOutput(ctx context.Context, clientset kubernetes.Interface, hooks []hookRef) string {
	var b strings.Builder
	for _, h := range hooks {
		var opts metav1.ListOptions
		switch h.kind {
		case "Job":
			opts.LabelSelector = "job-name=" + h.name
		case "Pod":
			opts.FieldSelector = "metadata.name=" + h.name
		default:
			continue
		}
		pods, err := clientset.CoreV1().Pods(h.namespace).List(ctx, opts)
		if err != nil {
			fmt.Fprintf(&b, "hook %s/%s: could not list its pods: %v\n", h.kind, h.name, err)
			continue
		}
		items := pods.Items
		sort.Slice(items, func(i, j int) bool {
			return items[i].CreationTimestamp.Before(&items[j].CreationTimestamp)
		})
		if len(items) > hookLogMaxPods {
			items = items[len(items)-hookLogMaxPods:]
		}
		for i := range items {
			writePodOutput(ctx, &b, clientset, h, &items[i])
		}
	}
	return strings.TrimRight(b.String(), "\n")
}

func writePodOutput(ctx context.Context, b *strings.Builder, clientset kubernetes.Interface, h hookRef, pod *corev1.Pod) {
	statuses := map[string]corev1.ContainerStatus{}
	for _, list := range [][]corev1.ContainerStatus{pod.Status.InitContainerStatuses, pod.Status.ContainerStatuses} {
		for _, s := range list {
			statuses[s.Name] = s
		}
	}
	var containers []corev1.Container
	containers = append(containers, pod.Spec.InitContainers...)
	containers = append(containers, pod.Spec.Containers...)
	for _, c := range containers {
		tail, limit := int64(hookLogTailLines), int64(hookLogMaxBytes)
		raw, err := clientset.CoreV1().Pods(pod.Namespace).GetLogs(pod.Name, &corev1.PodLogOptions{
			Container:  c.Name,
			TailLines:  &tail,
			LimitBytes: &limit,
		}).DoRaw(ctx)
		logs := strings.TrimSpace(string(raw))
		if err != nil || logs == "" {
			logs = containerState(statuses[c.Name])
		}
		if logs == "" {
			continue
		}
		fmt.Fprintf(b, "--- hook %s/%s, pod %s, container %s:\n%s\n", h.kind, h.name, pod.Name, c.Name, logs)
	}
}

// containerState describes why a container produced no logs.
func containerState(s corev1.ContainerStatus) string {
	switch {
	case s.State.Waiting != nil:
		return strings.TrimSpace(fmt.Sprintf("waiting: %s %s", s.State.Waiting.Reason, s.State.Waiting.Message))
	case s.State.Terminated != nil:
		t := s.State.Terminated
		return strings.TrimSpace(fmt.Sprintf("terminated: %s (exit code %d) %s", t.Reason, t.ExitCode, t.Message))
	default:
		return ""
	}
}
