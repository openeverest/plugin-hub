import { h, React } from '../runtime';
import { sx } from '../styles';
import { Box, IconButton, Tooltip } from '@mui/material';

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
export function CodeBlock(props: { command: string; mt?: number }): any {
  const { command, mt } = props;
  const [copied, setCopied] = React.useState(false);

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
    Box,
    { sx: { ...sx.codeBlockWrap, mt } },
    h(
      Tooltip,
      { title: copied ? 'Copied!' : 'Copy to clipboard' },
      h(
        IconButton,
        {
          size: 'small',
          className: 'copy-btn',
          onClick: copy,
          'aria-label': copied ? 'Copied' : 'Copy to clipboard',
          sx: [sx.copyBtn, { opacity: copied ? 1 : undefined }],
        },
        copied ? checkIcon() : copyIcon(),
      ),
    ),
    h(Box, { component: 'pre', sx: [sx.codeBlock, { m: 0 }] }, command),
  );
}
