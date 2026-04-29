import babel from "@rolldown/plugin-babel"
import tailwindcss from "@tailwindcss/vite"
import react, { reactCompilerPreset } from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import type { ObjectType } from "./src/lib/types"
import path from "path"

// https://vite.dev/config/
export default function getConfig({ mode }: ObjectType) {
  const env = loadEnv(mode, process.cwd(), "")

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
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      sourcemap: false,
    },
  })
}
