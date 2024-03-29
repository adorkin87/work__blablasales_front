import UnoCSS from 'unocss/vite';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
    plugins: [react(), UnoCSS()],
    resolve: {
        alias: {
            src: '/src'
        }
    }
});
