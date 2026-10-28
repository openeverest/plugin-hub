import { h } from '../runtime';
import { sx } from '../styles';
import { Box, Button, Typography } from '@mui/material';

export function NotFoundPage(props: { onBack: () => void }): any {
  return h(
    Box,
    { sx: sx.empty, 'data-testid': 'plugin-hub-not-found' },
    h(Typography, { variant: 'h6', sx: { color: 'text.primary', mb: 1 } }, 'Page not found'),
    h(
      Typography,
      { variant: 'body2', sx: { mb: 2 } },
      'This Hub page does not exist.'
    ),
    h(
      Button,
      { variant: 'contained', size: 'small', onClick: props.onBack },
      'Back to The Hub'
    )
  );
}
