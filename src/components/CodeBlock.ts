import { h, React } from '../runtime';
import { styles } from '../styles';

function copyIcon(): any {
  return h(
    'svg',
    { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true },
    h('rect', {
      x: 9,
      y: 9,
      width: 11,
      height: 11,
      rx: 2,
      stroke: 'currentColor',
      strokeWidth: 2,
    }),
    h('path', {
      d: 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    }),
  );
}

function checkIcon(): any {
  return h(
    'svg',
    { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true },
    h('path', {
      d: 'M20 6 9 17l-5-5',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    }),
  );
}

// A code snippet with a one-click copy button in the top-right corner.
export function CodeBlock(props: { command: string; style?: any }): any {
  const { command } = props;
  const [copied, setCopied] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);

  const copy = React.useCallback(() => {
    const flash = () => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(command).then(flash).catch(() => {});
      return;
    }
    flash();
  }, [command]);

  return h(
    'div',
    {
      style: { ...styles.codeBlockWrap, ...(props.style || {}) },
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
    },
    h(
      'button',
      {
        type: 'button',
        onClick: copy,
        style: {
          ...styles.copyBtn,
          opacity: hovered || copied ? 1 : 0,
          pointerEvents: hovered || copied ? 'auto' : 'none',
        },
        title: copied ? 'Copied!' : 'Copy to clipboard',
        'aria-label': copied ? 'Copied' : 'Copy to clipboard',
      },
      copied ? checkIcon() : copyIcon(),
    ),
    h('pre', { style: { ...styles.codeBlock, margin: 0 } }, command),
  );
}

