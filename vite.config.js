import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

export default defineConfig({
  base: '/',
  plugins: [
    {
      name: 'clean-urls-dev-server',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url.split('?')[0];
          if (url === '/about') {
            req.url = req.url.replace('/about', '/about.html');
          } else if (url === '/contact') {
            req.url = req.url.replace('/contact', '/contact.html');
          } else if (url === '/work') {
            req.url = req.url.replace('/work', '/work.html');
          }
          next();
        });
      },
    },
    {
      name: 'clean-urls-build-generator',
      closeBundle() {
        const copyToDir = (srcHtml, dirName) => {
          const targetDir = resolve(import.meta.dirname, 'dist', dirName);
          if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
          }
          const content = fs.readFileSync(resolve(import.meta.dirname, 'dist', srcHtml), 'utf8');
          fs.writeFileSync(resolve(targetDir, 'index.html'), content);
        };

        try {
          copyToDir('about.html', 'about');
          copyToDir('contact.html', 'contact');
          copyToDir('work.html', 'work');

          // Create 404.html fallback for GitHub Pages client-side routing
          const indexContent = fs.readFileSync(resolve(import.meta.dirname, 'dist', 'index.html'), 'utf8');
          fs.writeFileSync(resolve(import.meta.dirname, 'dist', '404.html'), indexContent);
        } catch (err) {
          console.error('Error generating clean URL directory structure:', err);
        }
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        about: resolve(import.meta.dirname, 'about.html'),
        contact: resolve(import.meta.dirname, 'contact.html'),
        work: resolve(import.meta.dirname, 'work.html'),
      },
    },
  },
});
