import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'REACT_APP_');
  return {
    define: {
      'process.env.REACT_APP_API_URL': JSON.stringify(env.REACT_APP_API_URL || '/api'),
      'process.env.PUBLIC_URL': JSON.stringify(''),
    },
    build: { outDir: 'build', sourcemap: false },
    server: { proxy: { '/api': { target: 'http://localhost:8080', changeOrigin: true, rewrite: path => path.replace(/^\/api/, '') } } },
    test: { environment: 'jsdom', globals: true, setupFiles: './src/setupTests.ts' },
  };
});
