import { h, React } from '../runtime';
import { styles } from '../styles';
import { defaultChannelVersion, helmInstallCommand } from '../catalog';
import { IconImg, resolveIconSrc } from '../icons';
import { CodeBlock } from './CodeBlock';
import type { CatalogEntry, Prerequisite } from '../types';

function humanizeKey(key: string): string {
  return key
    .replace(/[._-]/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function renderCapabilityValue(key: string, value: unknown): any {
  const label = humanizeKey(key);
  if (typeof value === 'boolean') {
    return value
      ? h('span', { key, style: styles.capChipYes }, `\u2713 ${label}`)
      : h('span', { key, style: styles.capChipNo }, `\u2717 ${label}`);
  }
  if (Array.isArray(value)) {
    return h(
      'div',
      { key, style: styles.capRow },
      h('span', { style: styles.capKey }, label),
      h(
        'div',
        null,
        ...value.map((v, i) =>
          h('span', { key: i, style: styles.categoryTag }, String(v)),
        ),
      ),
    );
  }
  if (value === null || value === undefined) return null;
  if (typeof value === 'object') {
    return h(
      'div',
      { key, style: styles.capRow },
      h('span', { style: styles.capKey }, label),
      h(
        'code',
        { style: { fontSize: '0.8125rem', color: '#374151' } },
        JSON.stringify(value),
      ),
    );
  }
  return h(
    'div',
    { key, style: styles.capRow },
    h('span', { style: styles.capKey }, label),
    h('span', { style: { color: '#111827' } }, String(value)),
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
    'div',
    { key, style: styles.prereqCard },
    h(
      'div',
      { style: styles.prereqHead },
      h('span', { style: styles.prereqName }, pre.name),
      pre.installUrl
        ? h(
            'a',
            {
              href: pre.installUrl,
              target: '_blank',
              rel: 'noopener noreferrer',
              style: styles.prereqLink,
            },
            'Docs ↗',
          )
        : null,
    ),
    pre.description ? h('div', { style: styles.prereqDesc }, pre.description) : null,
    pre.helm
      ? h(
          'details',
          null,
          h('summary', { style: styles.prereqSummary }, 'Install command'),
          h(CodeBlock, { command: prerequisiteHelmCommand(pre), style: { marginTop: '0.5rem' } }),
        )
      : null,
  );
}

function renderPrerequisites(prerequisites: Prerequisite[] | undefined): any {
  if (!prerequisites || !prerequisites.length) return null;
  return h(
    'div',
    { style: styles.section },
    h('h3', { style: styles.sectionTitle }, 'Prerequisites'),
    h('div', { style: styles.prereqList }, ...prerequisites.map(renderPrerequisite)),
  );
}

function renderCapabilities(caps: Record<string, unknown>): any {
  const entries = Object.entries(caps);
  if (!entries.length) return null;
  const booleans = entries.filter(([, v]) => typeof v === 'boolean');
  const others = entries.filter(([, v]) => typeof v !== 'boolean');
  return h(
    'div',
    null,
    booleans.length
      ? h(
          'div',
          { style: { marginBottom: others.length ? '0.75rem' : 0 } },
          ...booleans.map(([k, v]) => renderCapabilityValue(k, v)),
        )
      : null,
    others.length ? h('div', null, ...others.map(([k, v]) => renderCapabilityValue(k, v))) : null,
  );
}

function measureAppBar(): number {
  if (typeof document === 'undefined') return 64;
  const ab = document.querySelector('header.MuiAppBar-root') as HTMLElement | null;
  if (!ab) return 64;
  const height = Math.round(ab.getBoundingClientRect().height);
  return height > 0 ? height : 64;
}

function useAppBarOffset(): number {
  const [offset, setOffset] = React.useState<number>(measureAppBar);
  React.useEffect(() => {
    const update = () => setOffset(measureAppBar());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return offset;
}

export function Drawer(props: { entry: CatalogEntry; pluginName: string; onClose: () => void }): any {
  const { entry, pluginName, onClose } = props;
  const isGated = entry.access === 'gated';
  const version = isGated ? null : defaultChannelVersion(entry);
  const install = isGated ? null : helmInstallCommand(entry);
  const extensionPoints = entry.plugin?.extensionPoints ?? [];
  const supportedEngines = entry.provider?.supportedEngines ?? [];
  const maintainers = entry.maintainers ?? [];
  const appbarOffset = useAppBarOffset();
  const backdropStyle = { ...styles.drawerBackdrop, top: appbarOffset };

  return h(
    'div',
    { style: backdropStyle, onClick: onClose },
    h(
      'div',
      {
        style: styles.drawer,
        onClick: (e: any) => e.stopPropagation(),
      },
      h(
        'div',
        { style: styles.drawerHeader },
        h(IconImg, {
          src: resolveIconSrc(entry.icon, pluginName),
          style: { width: 40, height: 40 },
        }),
        h(
          'div',
          null,
          h(
            'h2',
            { style: { margin: 0, fontSize: '1.25rem', fontWeight: 600 } },
            entry.displayName || entry.name,
          ),
          h(
            'div',
            { style: { color: '#6b7280', fontSize: '0.8125rem' } },
            entry.name,
            ' · ',
            h('span', { style: styles.typeChip(entry.type) }, entry.type),
            isGated
              ? h('span', { style: { ...styles.gatedChip, marginLeft: 6 } }, 'Gated')
              : null,
          ),
        ),
        h('button', { type: 'button', style: styles.closeBtn, onClick: onClose }, '×'),
      ),

      entry.installed
        ? h(
            'div',
            { style: { marginBottom: '1rem' } },
            h(
              'span',
              { style: styles.statusInstalled },
              entry.installedVersion ? `Installed · ${entry.installedVersion}` : 'Installed',
            ),
            entry.installedPhase
              ? h(
                  'span',
                  { style: { marginLeft: 8, color: '#6b7280', fontSize: '0.8125rem' } },
                  `Phase: ${entry.installedPhase}`,
                )
              : null,
          )
        : null,

      entry.description
        ? h(
            'p',
            { style: { color: '#374151', whiteSpace: 'pre-line' } },
            entry.description,
          )
        : null,

      h(
        'div',
        { style: styles.section },
        h('h3', { style: styles.sectionTitle }, 'Metadata'),
        h(
          'div',
          { style: { fontSize: '0.875rem', lineHeight: 1.7 } },
          version ? h('div', null, h('b', null, 'Version: '), version) : null,
          entry.maturity
            ? h(
                'div',
                null,
                h('b', null, 'Maturity: '),
                h(
                  'span',
                  { style: styles.maturityChip(entry.maturity) },
                  entry.maturity,
                ),
              )
            : null,
          entry.compatibility?.openeverest
            ? h('div', null, h('b', null, 'Requires OpenEverest: '), entry.compatibility.openeverest)
            : null,
          entry.license ? h('div', null, h('b', null, 'License: '), entry.license) : null,
          entry.verified
            ? h('div', null, h('b', null, 'Verified: '), 'yes')
            : null,
        ),
      ),

      extensionPoints.length
        ? h(
            'div',
            { style: styles.section },
            h('h3', { style: styles.sectionTitle }, 'Extension points'),
            h(
              'div',
              null,
              ...extensionPoints.map((p) => h('span', { key: p, style: styles.categoryTag }, p)),
            ),
          )
        : null,

      supportedEngines.length
        ? h(
            'div',
            { style: styles.section },
            h('h3', { style: styles.sectionTitle }, 'Supported engines'),
            h(
              'div',
              null,
              ...supportedEngines.map((e) => h('span', { key: e, style: styles.categoryTag }, e)),
            ),
          )
        : null,

      entry.capabilities && Object.keys(entry.capabilities).length
        ? h(
            'div',
            { style: styles.section },
            h('h3', { style: styles.sectionTitle }, 'Capabilities'),
            renderCapabilities(entry.capabilities),
          )
        : null,

      maintainers.length
        ? h(
            'div',
            { style: styles.section },
            h('h3', { style: styles.sectionTitle }, 'Maintainers'),
            h(
              'ul',
              { style: { margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem' } },
              ...maintainers.map((m, i) =>
                h('li', { key: i }, m.name || m.github || m.email || 'unknown'),
              ),
            ),
          )
        : null,

      isGated ? null : renderPrerequisites(entry.install?.prerequisites),

      h(
        'div',
        { style: styles.section },
        isGated
          ? h(
              'div',
              null,
              h('h3', { style: styles.sectionTitle }, 'Access required'),
              h(
                'p',
                { style: { color: '#374151', fontSize: '0.875rem', marginTop: 0 } },
                entry.gated?.instructions ||
                  'This extension is not publicly available. Contact the vendor to request access.',
              ),
              entry.gated?.provider
                ? h(
                    'p',
                    { style: { color: '#6b7280', fontSize: '0.8125rem', marginTop: '-0.5rem' } },
                    `Provided by ${entry.gated.provider}`,
                  )
                : null,
              entry.gated?.contactUrl
                ? h(
                    'a',
                    {
                      href: entry.gated.contactUrl,
                      target: '_blank',
                      rel: 'noopener noreferrer',
                      style: styles.ctaBtn,
                    },
                    'Contact vendor ↗',
                  )
                : h(
                    'div',
                    { style: { color: '#6b7280', fontSize: '0.8125rem' } },
                    'No contact URL configured. See the source repository for details.',
                  ),
            )
          : h(
              'div',
              null,
              h('h3', { style: styles.sectionTitle }, 'Install with Helm'),
              h(CodeBlock, { command: install }),
            ),
      ),

      h(
        'div',
        { style: styles.section },
        h(
          'div',
          { style: { display: 'flex', gap: '0.75rem', flexWrap: 'wrap' } },
          entry.sourceRepo
            ? h(
                'a',
                { href: entry.sourceRepo, target: '_blank', rel: 'noopener noreferrer' },
                'Source repository ↗',
              )
            : null,
          entry.homepage
            ? h(
                'a',
                { href: entry.homepage, target: '_blank', rel: 'noopener noreferrer' },
                'Homepage ↗',
              )
            : null,
        ),
      ),
    ),
  );
}
