import { h, React } from '../runtime';
import { sx, maturityColor, typeColor } from '../styles';
import { defaultChannelVersion, helmInstallCommand } from '../catalog';
import { IconImg, resolveIconSrc } from '../icons';
import {
  Drawer as MuiDrawer,
  Box,
  Typography,
  Chip,
  IconButton,
  Link,
  Divider,
} from '@openeverest/ui-lib';
import type { CatalogEntry } from '../types';

function humanizeKey(key: string): string {
  return key
    .replace(/[._-]/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function renderCapabilityValue(key: string, value: unknown): any {
  const label = humanizeKey(key);
  if (typeof value === 'boolean') {
    return h(Chip, {
      key,
      label,
      size: 'small',
      color: value ? 'success' : 'default',
      variant: value ? 'filled' : 'outlined',
      sx: { mr: 0.75, mb: 0.75, textDecoration: value ? 'none' : 'line-through' },
    });
  }
  if (Array.isArray(value)) {
    return h(
      Box,
      { key, sx: sx.capRow },
      h(Typography, { component: 'span', sx: sx.capKey }, label),
      h(
        Box,
        null,
        ...value.map((v, i) =>
          h(Chip, {
            key: i,
            label: String(v),
            size: 'small',
            variant: 'outlined',
            sx: { mr: 0.5, mb: 0.5 },
          })
        )
      )
    );
  }
  if (value === null || value === undefined) return null;
  if (typeof value === 'object') {
    return h(
      Box,
      { key, sx: sx.capRow },
      h(Typography, { component: 'span', sx: sx.capKey }, label),
      h(
        Typography,
        { component: 'code', variant: 'body2' },
        JSON.stringify(value)
      )
    );
  }
  return h(
    Box,
    { key, sx: sx.capRow },
    h(Typography, { component: 'span', sx: sx.capKey }, label),
    h(Typography, { component: 'span', variant: 'body2' }, String(value))
  );
}

function renderCapabilities(caps: Record<string, unknown>): any {
  const entries = Object.entries(caps);
  if (!entries.length) return null;
  const booleans = entries.filter(([, v]) => typeof v === 'boolean');
  const others = entries.filter(([, v]) => typeof v !== 'boolean');
  return h(
    Box,
    null,
    booleans.length
      ? h(
          Box,
          { sx: { mb: others.length ? 1.5 : 0 } },
          ...booleans.map(([k, v]) => renderCapabilityValue(k, v))
        )
      : null,
    others.length
      ? h(Box, null, ...others.map(([k, v]) => renderCapabilityValue(k, v)))
      : null
  );
}

const sectionTitle = (label: string): any =>
  h(Typography, { variant: 'overline', sx: sx.sectionTitle }, label);

const tagList = (items: string[]): any =>
  h(
    Box,
    null,
    ...items.map((p) =>
      h(Chip, {
        key: p,
        label: p,
        size: 'small',
        variant: 'outlined',
        sx: { mr: 0.5, mb: 0.5 },
      })
    )
  );

// The host AppBar is fixed at the top; measure it so the drawer opens below it
// instead of rendering behind it.
function measureAppBarHeight(): number {
  const appBar = document.querySelector('header.MuiAppBar-root');
  if (!appBar) return 64;
  const height = Math.round(appBar.getBoundingClientRect().height);
  return height > 0 ? height : 64;
}

function useAppBarOffset(): number {
  const [offset, setOffset] = React.useState<number>(measureAppBarHeight);
  React.useEffect(() => {
    const update = () => setOffset(measureAppBarHeight());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return offset;
}

export function Drawer(props: {
  entry: CatalogEntry;
  pluginName: string;
  onClose: () => void;
}): any {
  const { entry, pluginName, onClose } = props;
  const appBarOffset = useAppBarOffset();
  const isGated = entry.access === 'gated';
  const version = isGated ? null : defaultChannelVersion(entry);
  const install = isGated ? null : helmInstallCommand(entry);
  const extensionPoints = entry.plugin?.extensionPoints ?? [];
  const supportedEngines = entry.provider?.supportedEngines ?? [];
  const maintainers = entry.maintainers ?? [];

  return h(
    MuiDrawer,
    {
      anchor: 'right',
      open: true,
      onClose,
      PaperProps: {
        sx: {
          width: 'min(560px, 100%)',
          p: 3,
          boxSizing: 'border-box',
          top: appBarOffset,
          height: `calc(100% - ${appBarOffset}px)`,
        },
      },
      slotProps: {
        backdrop: { sx: { top: appBarOffset } },
      },
    },
    h(
      Box,
      { sx: sx.drawerHeader },
      h(IconImg, {
        src: resolveIconSrc(entry.icon, pluginName),
        style: { width: 40, height: 40 },
      }),
      h(
        Box,
        null,
        h(
          Typography,
          { variant: 'h6', sx: { fontWeight: 600 } },
          entry.displayName || entry.name
        ),
        h(
          Box,
          { sx: { display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.25 } },
          h(Typography, { variant: 'caption', sx: { color: 'text.secondary' } }, entry.name),
          h(Chip, {
            label: entry.type,
            size: 'small',
            color: typeColor(entry.type),
            variant: 'outlined',
            sx: { textTransform: 'capitalize' },
          }),
          isGated
            ? h(Chip, {
                label: 'Gated',
                size: 'small',
                color: 'secondary',
                variant: 'outlined',
              })
            : null
        )
      ),
      h(
        IconButton,
        { onClick: onClose, 'aria-label': 'Close', sx: { ml: 'auto' } },
        '×'
      )
    ),

    entry.installed
      ? h(
          Box,
          { sx: { mb: 2, display: 'flex', alignItems: 'center', gap: 1 } },
          h(Chip, {
            label: entry.installedVersion
              ? `Installed · ${entry.installedVersion}`
              : 'Installed',
            size: 'small',
            color: 'success',
          }),
          entry.installedPhase
            ? h(
                Typography,
                { variant: 'caption', sx: { color: 'text.secondary' } },
                `Phase: ${entry.installedPhase}`
              )
            : null
        )
      : null,

    entry.description
      ? h(
          Typography,
          { variant: 'body2', sx: { color: 'text.primary', whiteSpace: 'pre-line' } },
          entry.description
        )
      : null,

    h(
      Box,
      { sx: sx.section },
      sectionTitle('Metadata'),
      h(
        Box,
        { sx: { fontSize: '0.875rem', lineHeight: 1.7 } },
        version
          ? h(Typography, { variant: 'body2' }, h('b', null, 'Version: '), version)
          : null,
        entry.maturity
          ? h(
              Box,
              { sx: { display: 'flex', alignItems: 'center', gap: 1, my: 0.5 } },
              h('b', null, 'Maturity: '),
              h(Chip, {
                label: entry.maturity,
                size: 'small',
                color: maturityColor(entry.maturity),
                sx: { textTransform: 'capitalize' },
              })
            )
          : null,
        entry.compatibility?.openeverest
          ? h(
              Typography,
              { variant: 'body2' },
              h('b', null, 'Requires OpenEverest: '),
              entry.compatibility.openeverest
            )
          : null,
        entry.license
          ? h(Typography, { variant: 'body2' }, h('b', null, 'License: '), entry.license)
          : null,
        entry.verified
          ? h(Typography, { variant: 'body2' }, h('b', null, 'Verified: '), 'yes')
          : null
      )
    ),

    extensionPoints.length
      ? h(
          Box,
          { sx: sx.section },
          sectionTitle('Extension points'),
          tagList(extensionPoints)
        )
      : null,

    supportedEngines.length
      ? h(
          Box,
          { sx: sx.section },
          sectionTitle('Supported engines'),
          tagList(supportedEngines)
        )
      : null,

    entry.capabilities && Object.keys(entry.capabilities).length
      ? h(
          Box,
          { sx: sx.section },
          sectionTitle('Capabilities'),
          renderCapabilities(entry.capabilities)
        )
      : null,

    maintainers.length
      ? h(
          Box,
          { sx: sx.section },
          sectionTitle('Maintainers'),
          h(
            'ul',
            { style: { margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem' } },
            ...maintainers.map((m, i) =>
              h('li', { key: i }, m.name || m.github || m.email || 'unknown')
            )
          )
        )
      : null,

    h(Divider, { sx: { my: 2 } }),

    h(
      Box,
      { sx: sx.section },
      isGated
        ? h(
            Box,
            null,
            sectionTitle('Access required'),
            h(
              Typography,
              { variant: 'body2', sx: { mt: 0 } },
              entry.gated?.instructions ||
                'This extension is not publicly available. Contact the vendor to request access.'
            ),
            entry.gated?.provider
              ? h(
                  Typography,
                  { variant: 'caption', sx: { color: 'text.secondary' } },
                  `Provided by ${entry.gated.provider}`
                )
              : null,
            entry.gated?.contactUrl
              ? h(
                  Link,
                  {
                    href: entry.gated.contactUrl,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  },
                  'Contact vendor ↗'
                )
              : h(
                  Typography,
                  { variant: 'caption', sx: { color: 'text.secondary' } },
                  'No contact URL configured. See the source repository for details.'
                )
          )
        : h(
            Box,
            null,
            sectionTitle('Install with Helm'),
            h(Box, { component: 'pre', sx: sx.codeBlock }, install)
          )
    ),

    h(
      Box,
      { sx: sx.section },
      h(
        Box,
        { sx: { display: 'flex', gap: 1.5, flexWrap: 'wrap' } },
        entry.sourceRepo
          ? h(
              Link,
              { href: entry.sourceRepo, target: '_blank', rel: 'noopener noreferrer' },
              'Source repository ↗'
            )
          : null,
        entry.homepage
          ? h(
              Link,
              { href: entry.homepage, target: '_blank', rel: 'noopener noreferrer' },
              'Homepage ↗'
            )
          : null
      )
    )
  );
}
