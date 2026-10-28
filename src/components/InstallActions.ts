// Primary call-to-action bar shown at the top of the entry drawer: an
// optional one-click "Install now" / "Upgrade to X" button (admins with the
// installer enabled) next to a low-emphasis "… with Helm" toggle that reveals
// the copy-paste command.
import { React, h } from '../runtime';
import { runInstallerAction } from '../data';
import { CodeBlock } from './CodeBlock';
import { Alert, Box, Button, CircularProgress, Typography } from '@mui/material';
import type { CatalogEntry, InstallerAction, ReleaseInfo } from '../types';

const LABELS: Record<InstallerAction, { now: string; busy: string; helm: string }> = {
  install: { now: 'Install now', busy: 'Installing…', helm: 'Install with Helm' },
  upgrade: { now: 'Upgrade to', busy: 'Upgrading…', helm: 'Upgrade with Helm' },
};

export function InstallActions(props: {
  entry: CatalogEntry;
  mode: InstallerAction;
  targetVersion: string | null;
  helmCommand: string;
  canInstallNow: boolean;
  onDone: (release: ReleaseInfo) => void;
}): any {
  const { entry, mode, targetVersion, helmCommand, canInstallNow, onDone } = props;
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  // Without one-click install the Helm command is the only path, so show it
  // by default. Installer status loads asynchronously, so the default must
  // track canInstallNow until the user toggles explicitly.
  const [helmToggled, setHelmToggled] = React.useState<boolean | null>(null);
  const showHelm = helmToggled ?? !canInstallNow;
  const labels = LABELS[mode];
  const prerequisites = (entry.install?.prerequisites ?? []).map((p) => p.name);

  const run = () => {
    setPending(true);
    setError(null);
    runInstallerAction(mode, entry)
      .then(onDone)
      .catch((err: Error) => setError(err.message))
      .finally(() => setPending(false));
  };

  return h(
    Box,
    { sx: { mb: 2 } },
    h(
      Box,
      { sx: { display: 'flex', gap: 1, flexWrap: 'wrap' } },
      canInstallNow
        ? h(
            Button,
            {
              variant: 'contained',
              disabled: pending,
              onClick: run,
              startIcon: pending ? h(CircularProgress, { size: 14, color: 'inherit' }) : null,
              'data-testid': `plugin-hub-${mode}-now`,
            },
            pending
              ? labels.busy
              : mode === 'upgrade'
              ? `${labels.now} ${targetVersion ?? 'latest'}`
              : labels.now
          )
        : null,
      h(
        Button,
        {
          variant: 'outlined',
          color: 'inherit',
          onClick: () => setHelmToggled(!showHelm),
          'aria-expanded': showHelm,
          endIcon: h('span', { 'aria-hidden': true }, showHelm ? '▴' : '▾'),
          sx: { color: 'text.secondary', borderColor: 'divider' },
          'data-testid': `plugin-hub-${mode}-helm`,
        },
        labels.helm
      )
    ),
    canInstallNow && prerequisites.length
      ? h(
          Typography,
          { variant: 'caption', sx: { display: 'block', mt: 1, color: 'text.secondary' } },
          `Requires ${prerequisites.join(', ')} — not installed automatically, see Prerequisites below.`
        )
      : null,
    error ? h(Alert, { severity: 'error', sx: { mt: 1.5 } }, error) : null,
    showHelm ? h(CodeBlock, { command: helmCommand, mt: 1.5 }) : null
  );
}
