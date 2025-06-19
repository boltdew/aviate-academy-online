
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { markdownProcessor } from "./vite-plugins/markdown-processor";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    headers: mode === 'development' ? {
      // Security headers for development
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    } : undefined,
  },
  build: {
    rollupOptions: {
      output: {
        // Security: Don't expose source maps in production
        sourcemap: mode === 'development'
      }
    }
  },
  plugins: [
    react(),
    markdownProcessor(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // Remove console logs in production
    'console.log': mode === 'production' ? '(() => {})' : 'console.log',
    'console.warn': mode === 'production' ? '(() => {})' : 'console.warn',
  }
}));
