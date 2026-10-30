import { h } from '../runtime';
import { sx, maturityColor, typeColor } from '../styles';
import {
  defaultChannelVersion,
  helmInstallCommand,
  helmUpgradeCommand,
  isVersionOutdated,
} from '../catalog';
import { IconImg, resolveIconSrc } from '../icons';
import { CodeBlock } from './CodeBlock';
import { DrawerShell } from './DrawerShell';
import {
  Alert,
  Box,
  Typography,
  Chip,
  IconButton,
  Link,
  Divider,
  Paper,
} from '@mui/material';
import type { CatalogEntry, IntegrationSpec, Prerequisite } from '../types';

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

function prerequisiteHelmCommand(pre: Prerequisite): string {
  const helm = pre.helm!;
  const release = pre.name;
  const lines = [`helm install ${release} ${helm.oci} \\`];
  if (helm.version) lines.push(`  --version ${helm.version} \\`);
  lines.push(`  -n ${helm.namespace}${helm.createNamespace ? ' --create-namespace' : ''}`);
  for (const [k, v] of Object.entries(helm.defaultValues ?? {})) {
    lines[lines.length - 1] += ' \\';
    lines.push(`  --set ${k}=${v}`);
  }
  return lines.join('\n');
}

function renderPrerequisite(pre: Prerequisite, key: number): any {
  return h(
    Paper,
    { key, variant: 'outlined', sx: sx.prereqCard },
    h(
      Box,
      { sx: sx.prereqHead },
      h(Typography, { variant: 'body2', sx: { fontWeight: 600 } }, pre.name),
      pre.installUrl
        ? h(
            Link,
            {
              href: pre.installUrl,
              target: '_blank',
              rel: 'noopener noreferrer',
              variant: 'caption',
              sx: { whiteSpace: 'nowrap' },
            },
            'Docs ↗',
          )
        : null,
    ),
    pre.description
      ? h(Typography, { variant: 'body2', sx: { mt: 0.25 } }, pre.description)
      : null,
    pre.helm
      ? h(
          'details',
          null,
          h(Typography, { component: 'summary', variant: 'caption', sx: sx.prereqSummary }, 'Install command'),
          h(CodeBlock, { command: prerequisiteHelmCommand(pre), mt: 1 }),
        )
      : null,
  );
}

function renderPrerequisites(prerequisites: Prerequisite[] | undefined): any {
  if (!prerequisites || !prerequisites.length) return null;
  return h(
    Box,
    { sx: sx.section },
    sectionTitle('Prerequisites'),
    h(Box, { sx: sx.prereqList }, ...prerequisites.map(renderPrerequisite)),
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

const INTEGRATION_AREA_LABEL: Record<string, string> = {
  monitoring: 'Monitoring',
};

const EXECUTION_MODE_LABEL: Record<string, string> = {
  ProviderManaged: 'Rendered by the provider',
  ExtensionManaged: 'Runs its own controller',
};

function labelFor(labels: Record<string, string>, key: string): string {
  return Object.prototype.hasOwnProperty.call(labels, key) ? labels[key] : humanizeKey(key);
}

function monitoringRequirements(
  monitoring: NonNullable<IntegrationSpec['monitoring']>
): string[] {
  const requirements: string[] = [];
  if (monitoring.requires?.metrics) requirements.push('Providers must expose metrics');
  if (monitoring.requires?.connection) {
    requirements.push('Providers must accept monitoring connections');
  }
  if (monitoring.nativeIntegration) {
    requirements.push(`Uses the provider's native ${monitoring.nativeIntegration} integration`);
  }
  return requirements;
}

const detailRow = (label: string, value: any): any =>
  h(
    Box,
    { key: label, sx: sx.capRow },
    h(Typography, { component: 'span', sx: sx.capKey }, label),
    value
  );

const textLines = (lines: string[]): any =>
  h(
    Box,
    null,
    ...lines.map((line) => h(Typography, { key: line, variant: 'body2' }, line))
  );

function renderIntegration(integration: IntegrationSpec | null | undefined): any {
  if (!integration?.area) return null;
  const monitoring = integration.monitoring;
  const classes = monitoring?.classes ?? [];
  const executionModes = monitoring?.executionModes ?? [];
  const requirements = monitoring ? monitoringRequirements(monitoring) : [];
  return h(
    Box,
    { sx: sx.section, 'data-testid': 'plugin-hub-integration-details' },
    sectionTitle('Integration'),
    detailRow(
      'Area',
      h(
        Typography,
        { component: 'span', variant: 'body2' },
        labelFor(INTEGRATION_AREA_LABEL, integration.area)
      )
    ),
    classes.length ? detailRow('Monitoring classes', tagList(classes)) : null,
    executionModes.length
      ? detailRow(
          'Execution',
          textLines(executionModes.map((mode) => labelFor(EXECUTION_MODE_LABEL, mode)))
        )
      : null,
    requirements.length ? detailRow('Requirements', textLines(requirements)) : null
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

export function Drawer(props: { entry: CatalogEntry; onClose: () => void }): any {
  const { entry, onClose } = props;
  const isGated = entry.access === 'gated';
  const version = isGated ? null : defaultChannelVersion(entry);
  const install = isGated ? null : helmInstallCommand(entry);
  const isOutdated = entry.installed && isVersionOutdated(entry.installedVersion, version);
  const upgradeCmd = isOutdated ? helmUpgradeCommand(entry) : null;
  const extensionPoints = entry.plugin?.extensionPoints ?? [];
  const supportedEngines = entry.provider?.supportedEngines ?? [];
  const maintainers = entry.maintainers ?? [];

  return h(
    DrawerShell,
    { onClose },
    h(
      Box,
      { sx: sx.drawerHeader },
      h(IconImg, {
        src: resolveIconSrc(entry.icon),
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
                variant: 'outlined',
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

    renderIntegration(entry.integration),

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

    isGated ? null : renderPrerequisites(entry.install?.prerequisites),

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
        : isOutdated
        ? h(
            Box,
            null,
            h(
              Alert,
              { severity: 'warning', sx: { mb: 1.5 } },
              `A newer version (${version}) is available. Currently installed: ${entry.installedVersion}`
            ),
            sectionTitle('Upgrade with Helm'),
            h(CodeBlock, { command: upgradeCmd })
          )
        : h(
            Box,
            null,
            sectionTitle('Install with Helm'),
            h(CodeBlock, { command: install })
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
