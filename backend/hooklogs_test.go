package main

import (
	"context"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes/fake"
)

func hookPod(name string, labels map[string]string, created time.Time, containers ...string) *corev1.Pod {
	pod := &corev1.Pod{ObjectMeta: metav1.ObjectMeta{
		Name: name, Namespace: "everest-system", Labels: labels, CreationTimestamp: metav1.NewTime(created),
	}}
	for _, c := range containers {
		pod.Spec.Containers = append(pod.Spec.Containers, corev1.Container{Name: c})
	}
	return pod
}

func TestHookOutput(t *testing.T) {
	now := time.Now()
	job := map[string]string{"job-name": "preflight"}
	clientset := fake.NewSimpleClientset(
		hookPod("preflight-1", job, now.Add(-3*time.Minute), "preflight"),
		hookPod("preflight-2", job, now.Add(-2*time.Minute), "preflight"),
		hookPod("preflight-3", job, now.Add(-1*time.Minute), "preflight"),
		hookPod("other", map[string]string{"job-name": "other"}, now, "main"),
		hookPod("hook-pod", nil, now, "init", "main"),
	)

	got := hookOutput(context.Background(), clientset, []hookRef{
		{kind: "Job", namespace: "everest-system", name: "preflight"},
		{kind: "ConfigMap", namespace: "everest-system", name: "preflight"},
	})
	assert.Equal(t,
		"--- hook Job/preflight, pod preflight-2, container preflight:\nfake logs\n"+
			"--- hook Job/preflight, pod preflight-3, container preflight:\nfake logs",
		got, "the newest pods of the Job; other kinds have no output")

	assert.Empty(t, hookOutput(context.Background(), clientset, []hookRef{{kind: "Job", namespace: "everest-system", name: "missing"}}))
}

func TestContainerState(t *testing.T) {
	assert.Equal(t, "waiting: ImagePullBackOff Back-off pulling image", containerState(corev1.ContainerStatus{
		State: corev1.ContainerState{Waiting: &corev1.ContainerStateWaiting{Reason: "ImagePullBackOff", Message: "Back-off pulling image"}},
	}))
	assert.Equal(t, "terminated: Error (exit code 2)", containerState(corev1.ContainerStatus{
		State: corev1.ContainerState{Terminated: &corev1.ContainerStateTerminated{Reason: "Error", ExitCode: 2}},
	}))
	assert.Empty(t, containerState(corev1.ContainerStatus{}))
}
