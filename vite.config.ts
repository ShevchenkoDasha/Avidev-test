import { defineConfig } from "vitest/config";
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    emptyOutDir: true,
    copyPublicDir: true,
    minify: true,
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
       output: {
        manualChunks(id) {
          if (id.includes('/node_modules/@mui/')) return 'muiVendor'
          if (
            id.includes('/node_modules/react/') ||
            id.includes('/node_modules/react-dom/') ||
            id.includes('/node_modules/react-router-dom/')
          ) return 'reactVendor'
          if (
            id.includes('/node_modules/@reduxjs/toolkit/') ||
            id.includes('/node_modules/react-redux/')
          ) return 'stateVendor'
          if (id.includes('/node_modules/@tanstack/react-query/')) return 'dataVendor'
          if (id.includes('/node_modules/firebase/')) return 'firebaseVendor'
          if (
            id.includes('/node_modules/formik/') ||
            id.includes('/node_modules/yup/')
          ) return 'formVendor'
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 3000,
  },
  test: {
    environment: "jsdom",
    dir: './src',
    include: ['**/*.{test}.{ts,tsx}'],
    globals: true,
    setupFiles: "./src/test/setup.ts",
    css: true,
    restoreMocks: true,
    clearMocks: false,
    mockReset: false,
    coverage: {
      enabled: false,
      reporter: ["text", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.d.ts",
        "src/main.tsx",
        "src/test/**"
      ],
      thresholds: {
        lines: 50,
        functions: 50,
        branches: 40,
        statements: 50,
      }
    }
  },
})