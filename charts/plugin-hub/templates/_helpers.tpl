{{/*
Expand the name of the chart.
*/}}
{{- define "plugin-hub.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this
(by the DNS naming spec).
*/}}
{{- define "plugin-hub.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "plugin-hub.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
The plugin-hub release that runs: the image tag when it is a version, which
an update from the hub's own UI sets without changing the chart, else the
chart's appVersion.
*/}}
{{- define "plugin-hub.version" -}}
{{- $tag := toString (.Values.image.tag | default "") | trimPrefix "v" }}
{{- if regexMatch "^[0-9]+\\.[0-9]+\\.[0-9]+" $tag }}
{{- $tag }}
{{- else }}
{{- .Chart.AppVersion }}
{{- end }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "plugin-hub.labels" -}}
helm.sh/chart: {{ include "plugin-hub.chart" . }}
{{ include "plugin-hub.selectorLabels" . }}
{{- with include "plugin-hub.version" . }}
app.kubernetes.io/version: {{ . | replace "+" "_" | trunc 63 | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "plugin-hub.selectorLabels" -}}
app.kubernetes.io/name: {{ include "plugin-hub.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
