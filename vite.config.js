import { defineConfig } from 'vite';
export default defineConfig({
  plugins: [{
    name: 'inject-api-base',
    transformIndexHtml(html) {
      return html.replace('%VITE_API_BASE%', JSON.stringify(process.env.VITE_API_BASE || ''));
    }
  }]
});
