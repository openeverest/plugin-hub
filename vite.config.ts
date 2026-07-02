import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// Packages the OpenEverest host exposes as browser-import-map singletons.
// Externalizing them keeps this bundle small and — more importantly — makes
// the browser resolve `import { Button } from '@mui/material'` to the same
// module instance the host uses, so ThemeProvider context, MUI defaultProps,
// styleOverrides, custom variants, and dark-mode tokens all apply here.
// Keep this list in sync with ui/apps/everest/vite-plugins/plugin-runtime-import-map.ts.
const HOST_SINGLETONS = [
  'react',
  'react-dom',
  'react-dom/client',
  'react/jsx-runtime',
  'react/jsx-dev-runtime',
  '@mui/material',
  '@mui/material/styles',
  '@mui/icons-material',
  '@mui/x-date-pickers',
  '@emotion/react',
  '@emotion/styled',
  '@emotion/cache',
  'react-router-dom',
  '@openeverest/plugin-sdk',
];

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/main.tsx',
      formats: ['es'],
      fileName: () => 'main.js',
    },
    rollupOptions: {
      // Bare-specifier imports are left in the bundle and resolved by the
      // host's <script type="importmap"> at runtime. Any deep subpath of a
      // listed package (e.g. '@mui/material/Button') is also externalized.
      external: (id) =>
        HOST_SINGLETONS.some((pkg) => id === pkg || id.startsWith(pkg + '/')),
    },
  },
  server: {
    port: 3001,
    cors: true,
  },
});
