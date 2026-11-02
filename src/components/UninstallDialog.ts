// Confirmation dialog for uninstalling an extension. It first asks the backend
// which instances still use the provider; when there are any, the user must
// type the confirmation phrase (also enforced server-side).
import { React, h } from '../runtime';
import { fetchUninstallPreflight, runUninstall, UNINSTALL_CONFIRM_PHRASE } from '../data';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import type { CatalogEntry, ReleaseInfo, UninstallPreflight } from '../types';

const MAX_LISTED_INSTANCES = 10;

export function UninstallDialog(props: {
  entry: CatalogEntry;
  onClose: () => void;
  onDone: (release: ReleaseInfo) => void;
}): any {
  const { entry, onClose, onDone } = props;
  const [preflight, setPreflight] = React.useState<UninstallPreflight | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [pending, setPending] = React.useState(false);
  const [typed, setTyped] = React.useState('');

  React.useEffect(() => {
    fetchUninstallPreflight(entry)
      .then(setPreflight)
      .catch((err: Error) => setError(err.message));
  }, [entry.type, entry.name]);

  const instances = preflight?.instances ?? [];
  const needsPhrase = instances.length > 0;
  const confirmed = !needsPhrase || typed === UNINSTALL_CONFIRM_PHRASE;
  const title = entry.displayName || entry.name;

  const run = () => {
    setPending(true);
    setError(null);
    runUninstall(entry, needsPhrase ? typed : undefined)
      .then(onDone)
      .catch((err: Error) => {
        setError(err.message);
        setPending(false);
      });
  };

  const body = !preflight
    ? error
      ? null
      : h(Box, { sx: { display: 'flex', justifyContent: 'center', py: 3 } }, h(CircularProgress, { size: 24 }))
    : h(
        Box,
        null,
        h(
          Typography,
          { variant: 'body2', sx: { mb: 1.5 } },
          `This removes the Helm release ${preflight.namespace}/${preflight.release}.`,
          entry.type === 'provider'
            ? ' The provider’s CRDs are kept, so database resources are not deleted.'
            : ''
        ),
        needsPhrase
          ? h(
              Alert,
              { severity: 'error', sx: { mb: 1.5 } },
              h(
                Typography,
                { variant: 'body2', sx: { fontWeight: 600, mb: 0.5 } },
                `There ${instances.length === 1 ? 'is 1 instance' : `are ${instances.length} instances`} running that use this provider.`
              ),
              h(
                'ul',
                { style: { margin: '0.25rem 0', paddingLeft: '1.25rem', fontSize: '0.8125rem' } },
                ...instances
                  .slice(0, MAX_LISTED_INSTANCES)
                  .map((name) => h('li', { key: name }, h('code', null, name)))
              ),
              instances.length > MAX_LISTED_INSTANCES
                ? h(Typography, { variant: 'caption' }, `…and ${instances.length - MAX_LISTED_INSTANCES} more`)
                : null,
              h(
                Typography,
                { variant: 'body2', sx: { mt: 0.5 } },
                'Their operator will be removed and they will no longer be managed until the provider is reinstalled.'
              )
            )
          : null,
        needsPhrase
          ? h(TextField, {
              fullWidth: true,
              size: 'small',
              autoFocus: true,
              label: `Type ${UNINSTALL_CONFIRM_PHRASE} to confirm`,
              value: typed,
              disabled: pending,
              onChange: (e: { target: { value: string } }) => setTyped(e.target.value),
              inputProps: { 'data-testid': 'plugin-hub-uninstall-confirm' },
            })
          : null
      );

  return h(
    Dialog,
    { open: true, onClose: pending ? undefined : onClose, maxWidth: 'sm', fullWidth: true },
    h(DialogTitle, null, `Uninstall ${title}?`),
    h(
      DialogContent,
      null,
      body,
      error ? h(Alert, { severity: 'error', sx: { mt: 1.5 } }, error) : null
    ),
    h(
      DialogActions,
      null,
      h(Button, { onClick: onClose, disabled: pending, color: 'inherit' }, 'Cancel'),
      h(
        Button,
        {
          variant: 'contained',
          color: 'error',
          disabled: !preflight || !confirmed || pending,
          onClick: run,
          startIcon: pending ? h(CircularProgress, { size: 14, color: 'inherit' }) : null,
          'data-testid': 'plugin-hub-uninstall-submit',
        },
        pending ? 'Uninstalling…' : 'Uninstall'
      )
    )
  );
}
