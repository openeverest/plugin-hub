// Primary call-to-action bar shown at the top of the entry drawer: an
// optional one-click "Install now" / "Upgrade to X" button (admins with the
// installer enabled) next to a low-emphasis "… with Helm" toggle that reveals
// the copy-paste command. The one-click target is the newest release that
// works with the OpenEverest in the cluster; a newer incompatible release can
// still be installed, behind a confirmation.
import { React, h } from '../runtime';
import { InstallerError, runInstallerAction } from '../data';
import { incompatibleLabel } from '../catalog';
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
import type { CatalogEntry, InstallerAction, ReleaseInfo, ReleaseVerdict } from '../types';

const LABELS: Record<InstallerAction, { now: string; busy: string; helm: string }> = {
  install: { now: 'Install now', busy: 'Installing…', helm: 'Install with Helm' },
  upgrade: { now: 'Upgrade to', busy: 'Upgrading…', helm: 'Upgrade with Helm' },
};

// A release that does not work with the cluster, and why, as a sentence.
interface Incompatible {
  version: string;
  explanation: string;
}

export function InstallActions(props: {
  entry: CatalogEntry;
  mode: InstallerAction;
  // The release to install; null when none works with the cluster.
  targetVersion: string | null;
  // Its verdict, when the cluster could be checked.
  targetVerdict?: ReleaseVerdict;
  // A newer release that does not work with the cluster.
  incompatible?: ReleaseVerdict;
  // The release's first install failed; installing again replaces it.
  retry?: boolean;
  helmCommand: string;
  canInstallNow: boolean;
  onDone: (release: ReleaseInfo) => void;
}): any {
  const { entry, mode, targetVersion, targetVerdict, incompatible, retry, helmCommand, canInstallNow, onDone } =
    props;
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  // Set when the backend refused the target because the chart it pulled does
  // not work with the cluster.
  const [refused, setRefused] = React.useState<Incompatible | null>(null);
  const [confirming, setConfirming] = React.useState<Incompatible | null>(null);
  // Without one-click install the Helm command is the only path, so show it
  // by default. Installer status loads asynchronously, so the default must
  // track canInstallNow until the user toggles explicitly.
  const [helmToggled, setHelmToggled] = React.useState<boolean | null>(null);
  const showHelm = helmToggled ?? !canInstallNow;
  const labels = LABELS[mode];
  const prerequisites = (entry.install?.prerequisites ?? []).map((p) => p.name);
  const title = entry.displayName || entry.name;
  const anyway: Incompatible | null =
    refused ??
    (incompatible
      ? { version: incompatible.version, explanation: `${title} ${incompatible.version} ${incompatible.message}.` }
      : null);

  const run = (version: string | null, acknowledgeIncompatible: boolean) => {
    setPending(true);
    setError(null);
    setConfirming(null);
    runInstallerAction(mode, entry, {
      ...(version ? { version } : {}),
      ...(acknowledgeIncompatible ? { acknowledgeIncompatible } : {}),
    })
      .then(onDone)
      .catch((err: Error) => {
        setError(err.message);
        if (err instanceof InstallerError && err.incompatible && version && !acknowledgeIncompatible) {
          setRefused({ version, explanation: err.message });
        }
      })
      .finally(() => setPending(false));
  };

  const primaryLabel = pending
    ? labels.busy
    : targetVersion === null
    ? incompatible
      ? incompatibleLabel(incompatible)
      : 'No compatible release'
    : retry
    ? 'Retry install'
    : mode === 'upgrade'
    ? `${labels.now} ${targetVersion}`
    : labels.now;

  return h(
    Box,
    { sx: { mb: 2 } },
    incompatible
      ? h(
          Alert,
          {
            severity: targetVersion === null && mode === 'install' ? 'warning' : 'info',
            sx: { mb: 1.5 },
            'data-testid': 'plugin-hub-incompatible',
          },
          `${title} ${incompatible.version} ${incompatible.message}.`,
          targetVersion !== null
            ? ` ${targetVersion} is the newest release that works with it.`
            : mode === 'upgrade'
            ? ' No newer release works with the OpenEverest in this cluster.'
            : ' No release in the catalog works with the OpenEverest in this cluster.'
        )
      : null,
    h(
      Box,
      { sx: { display: 'flex', gap: 1, flexWrap: 'wrap' } },
      canInstallNow
        ? h(
            Button,
            {
              variant: 'contained',
              disabled: pending || targetVersion === null,
              onClick: () => run(targetVersion, false),
              startIcon: pending ? h(CircularProgress, { size: 14, color: 'inherit' }) : null,
              'data-testid': `plugin-hub-${mode}-now`,
            },
            primaryLabel
          )
        : null,
      canInstallNow && anyway
        ? h(
            Button,
            {
              variant: 'outlined',
              color: 'warning',
              disabled: pending,
              onClick: () => setConfirming(anyway),
              'data-testid': `plugin-hub-${mode}-anyway`,
            },
            mode === 'upgrade' ? `Upgrade to ${anyway.version} anyway…` : `Install ${anyway.version} anyway…`
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
    targetVersion && targetVerdict?.status === 'Unknown'
      ? h(
          Typography,
          {
            variant: 'caption',
            sx: { display: 'block', mt: 1, color: 'text.secondary' },
            'data-testid': 'plugin-hub-compat-notice',
          },
          `${title} ${targetVersion} ${targetVerdict.message}.`
        )
      : null,
    canInstallNow && prerequisites.length
      ? h(
          Typography,
          { variant: 'caption', sx: { display: 'block', mt: 1, color: 'text.secondary' } },
          `Requires ${prerequisites.join(', ')} — not installed automatically, see Prerequisites below.`
        )
      : null,
    error ? h(Alert, { severity: 'error', sx: { mt: 1.5, whiteSpace: 'pre-wrap' } }, error) : null,
    showHelm ? h(CodeBlock, { command: helmCommand, mt: 1.5 }) : null,
    confirming
      ? h(
          Dialog,
          { open: true, onClose: () => setConfirming(null), maxWidth: 'sm', fullWidth: true },
          h(
            DialogTitle,
            null,
            mode === 'upgrade'
              ? `Upgrade ${title} to ${confirming.version} anyway?`
              : `Install ${title} ${confirming.version} anyway?`
          ),
          h(
            DialogContent,
            null,
            h(Typography, { variant: 'body2', sx: { mb: 1.5 } }, confirming.explanation),
            h(
              Typography,
              { variant: 'body2' },
              'OpenEverest may reject or misread what it installs. This only overrides the check for the OpenEverest release running now: it applies again once OpenEverest is upgraded.'
            )
          ),
          h(
            DialogActions,
            null,
            h(Button, { onClick: () => setConfirming(null), color: 'inherit' }, 'Cancel'),
            h(
              Button,
              {
                variant: 'contained',
                color: 'warning',
                onClick: () => run(confirming.version, true),
                'data-testid': 'plugin-hub-anyway-confirm',
              },
              mode === 'upgrade' ? 'Upgrade anyway' : 'Install anyway'
            )
          )
        )
      : null
  );
}
