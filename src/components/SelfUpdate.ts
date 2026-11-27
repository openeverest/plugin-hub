// How plugin-hub updates itself, shown in its own drawer to admins. Bundled in
// the OpenEverest chart it updates its image in that release and keeps the
// chart; in its own release it upgrades that release; without a Helm release
// (Argo CD, OLM) it names the value to set where it is deployed.
import { React, h } from '../runtime';
import { runSelfUpdate } from '../data';
import { CodeBlock } from './CodeBlock';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import type { ReleaseInfo, SelfUpdateStatus } from '../types';

// The helm command that does what a bundled self-update does.
export function bundledUpdateCommand(status: SelfUpdateStatus, version: string): string {
  const repo = status.parentChartRepository ?? '';
  const chart = status.parentChart ?? '<chart>';
  const ref = repo.startsWith('oci://') ? `${repo.replace(/\/$/, '')}/${chart}` : chart;
  return [
    `helm upgrade ${status.release} ${ref}`,
    repo && !repo.startsWith('oci://') ? `  --repo ${repo}` : null,
    `  -n ${status.namespace}`,
    `  --version ${status.parentChartVersion}`,
    '  --reuse-values',
    `  --set ${status.valuesPath}=${version}`,
  ]
    .filter(Boolean)
    .join(' \\\n');
}

export function SelfUpdate(props: {
  status: SelfUpdateStatus;
  onDone: (release: ReleaseInfo) => void;
}): any {
  const { status, onDone } = props;
  const [pending, setPending] = React.useState(false);
  const [confirming, setConfirming] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { mode, available, blocked } = status;
  const running = status.version ?? 'unknown';

  if (status.error) {
    return h(
      Alert,
      { severity: 'info', sx: { mb: 2 }, 'data-testid': 'plugin-hub-self-update' },
      `Could not check for plugin-hub updates: ${status.error}`
    );
  }

  const blockedNote = blocked
    ? h(
        Alert,
        { severity: 'info', sx: { mb: 1.5 }, 'data-testid': 'plugin-hub-self-update-blocked' },
        `plugin-hub ${blocked.version} needs plugin-hub chart ${blocked.minChartVersion} or later; ` +
          `${status.parentChart ?? 'the OpenEverest chart'} ${status.parentChartVersion ?? ''} bundles ` +
          `${status.chartVersion ?? 'an older one'}. Upgrade OpenEverest to a release that bundles it.`
      )
    : null;

  if (!available) {
    return blockedNote ? h(Box, { 'data-testid': 'plugin-hub-self-update' }, blockedNote) : null;
  }

  if (mode === 'unmanaged') {
    return h(
      Box,
      { sx: { mb: 2 }, 'data-testid': 'plugin-hub-self-update' },
      h(
        Alert,
        { severity: 'warning', sx: { mb: 1.5 } },
        `plugin-hub ${available} is available (running ${running}). plugin-hub is not deployed by a Helm ` +
          'release the hub can update; set this value where it is deployed, such as its Argo CD application.'
      ),
      blockedNote,
      h(CodeBlock, { command: `${status.valuesPath}=${available}` })
    );
  }

  const run = () => {
    setConfirming(false);
    setPending(true);
    setError(null);
    runSelfUpdate(available)
      .then((release) => onDone({ ...release, appVersion: available }))
      .catch((err: Error) => setError(err.message))
      .finally(() => setPending(false));
  };

  const what =
    mode === 'bundled'
      ? `This changes only the plugin-hub image in Helm release ${status.namespace}/${status.release}: ` +
        `it keeps ${status.parentChart} ${status.parentChartVersion} and its values.`
      : `This upgrades Helm release ${status.namespace}/${status.release} to plugin-hub chart ${available}.`;

  return h(
    Box,
    { sx: { mb: 2 }, 'data-testid': 'plugin-hub-self-update' },
    h(
      Alert,
      { severity: 'warning', sx: { mb: 1.5 } },
      `plugin-hub ${available} is available (running ${running}).`
    ),
    blockedNote,
    h(
      Button,
      {
        variant: 'contained',
        disabled: pending,
        onClick: () => setConfirming(true),
        startIcon: pending ? h(CircularProgress, { size: 14, color: 'inherit' }) : null,
        'data-testid': 'plugin-hub-self-update-now',
      },
      pending ? 'Updating…' : `Update to ${available}`
    ),
    error ? h(Alert, { severity: 'error', sx: { mt: 1.5, whiteSpace: 'pre-wrap' } }, error) : null,
    mode === 'bundled' ? h(CodeBlock, { command: bundledUpdateCommand(status, available), mt: 1.5 }) : null,
    confirming
      ? h(
          Dialog,
          { open: true, onClose: () => setConfirming(false), maxWidth: 'sm', fullWidth: true },
          h(DialogTitle, null, `Update plugin-hub to ${available}?`),
          h(
            DialogContent,
            null,
            h(Typography, { variant: 'body2', sx: { mb: 1.5 } }, what),
            h(
              Typography,
              { variant: 'body2' },
              'The hub restarts once the new version is ready; reload the page then.'
            )
          ),
          h(
            DialogActions,
            null,
            h(Button, { onClick: () => setConfirming(false), color: 'inherit' }, 'Cancel'),
            h(
              Button,
              { variant: 'contained', onClick: run, 'data-testid': 'plugin-hub-self-update-confirm' },
              'Update'
            )
          )
        )
      : null
  );
}
