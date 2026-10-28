import { h, React } from '../runtime';
import { Drawer as MuiDrawer } from '@mui/material';

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

export function DrawerShell(props: { onClose: () => void; children?: any }): any {
  const appBarOffset = useAppBarOffset();
  return h(
    MuiDrawer,
    {
      anchor: 'right',
      open: true,
      onClose: props.onClose,
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
    props.children
  );
}
