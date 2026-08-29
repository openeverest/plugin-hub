import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  // Lib mode doesn't replace process.env.NODE_ENV, but bundled MUI/Emotion
  // reference it; without this the bundle throws "process is not defined" in the
  // browser and the plugin fails to register.
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    lib: {
      entry: 'src/main.tsx',
      formats: ['es'],
      fileName: () => 'main.js',
    },
    rollupOptions: {
      // Provided by the host via the import map, so not bundled:
      //  - react/react-dom: the shared singleton (hooks + theme context).
      //  - @mui/material/colors: static color scales that MUI's createPalette
      //    self-imports as a bare specifier the plugin bundler can't resolve.
      // Everything else (MUI components/theme, Emotion) IS bundled so the plugin
      // carries its own pinned copy and stays upgrade-independent.
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@mui/material/colors',
      ],
    },
  },
  server: {
    port: 3001,
    cors: true,
  },
});
