import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import devtools from 'solid-devtools/vite';
import tailwindcss from '@tailwindcss/vite';
import wasm from "vite-plugin-wasm";


export default defineConfig({
  plugins: [
    devtools(), 
    tailwindcss(),
    solidPlugin(),
    wasm(),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
