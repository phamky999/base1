import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig, loadEnv, type ConfigEnv } from 'vite';

// https://vite.dev/config/
export default function getConfig({ mode }: ConfigEnv) {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    plugins: [
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      tailwindcss(),
    ],
    server: {
      port: env.VITE_APP_PORT ? Number(env.VITE_APP_PORT) : 5173,
    },
    resolve: {
      tsconfigPaths: true,
    },
    build: {
      sourcemap: false,
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [
              {
                name: 'vendor-excel',
                test: /node_modules[\\/](exceljs|xlsx)[\\/]/,
              },
            ],
          },
        },
      },
    },
  });
}
