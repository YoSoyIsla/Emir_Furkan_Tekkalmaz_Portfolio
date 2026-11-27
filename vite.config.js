import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import {
  WORKS,
  renderGallery,
  renderHomeJsonLd,
  renderWorkPage,
  renderSitemap,
  workIdFromUrl,
} from './scripts/site-render.mjs';

const workIds = new Set(WORKS.map((w) => w.id));

// Clean URLs: /about, /contact, /work and /work/<artwork-id> (dev + preview servers)
function cleanUrlMiddleware({ preview = false } = {}) {
  return (req, res, next) => {
    const [pathname, query] = req.url.split('?');
    const qs = query ? `?${query}` : '';
    if (pathname === '/about' || pathname === '/contact' || pathname === '/work') {
      req.url = `${pathname}.html${qs}`;
    } else {
      const m = /^\/work\/([^/.]+)\/?$/.exec(pathname);
      if (m && workIds.has(m[1])) {
        // Dev renders the artwork into work.html on the fly; preview serves the generated file.
        req.url = preview ? `/work/${m[1]}.html${qs}` : `/work.html${qs}`;
      }
    }
    next();
  };
}

export default defineConfig({
  base: '/',
  plugins: [
    {
      name: 'clean-urls-dev-server',
      configureServer(server) {
        server.middlewares.use(cleanUrlMiddleware());
      },
      configurePreviewServer(server) {
        server.middlewares.use(cleanUrlMiddleware({ preview: true }));
      },
    },
    {
      // Gallery rows + structured data are generated from works-data.js (single source of truth).
      name: 'portfolio-html',
      transformIndexHtml: {
        order: 'pre',
        handler(html, ctx) {
          const file = ctx.filename.replace(/\\/g, '/');
          if (file.endsWith('/index.html')) {
            return html
              .replace('<!--ARTWORK_GALLERY-->', renderGallery())
              .replace('<!--HOME_JSONLD-->', renderHomeJsonLd());
          }
          if (file.endsWith('/work.html') && ctx.originalUrl) {
            // Dev server: pre-render the requested artwork exactly like the production build.
            const id = workIdFromUrl(ctx.originalUrl);
            const work = WORKS.find((w) => w.id === id);
            if (work) return renderWorkPage(html, work);
          }
          return html;
        },
      },
    },
    {
      name: 'clean-urls-build-generator',
      closeBundle() {
        const dist = (...p) => resolve(import.meta.dirname, 'dist', ...p);
        const copyToDir = (srcHtml, dirName) => {
          const targetDir = dist(dirName);
          if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
          }
          const content = fs.readFileSync(dist(srcHtml), 'utf8');
          fs.writeFileSync(resolve(targetDir, 'index.html'), content);
        };

        try {
          copyToDir('about.html', 'about');
          copyToDir('contact.html', 'contact');
          copyToDir('work.html', 'work');

          // One crawlable, shareable page per artwork: /work/<id> -> dist/work/<id>.html
          const workTemplate = fs.readFileSync(dist('work.html'), 'utf8');
          for (const work of WORKS) {
            fs.writeFileSync(dist('work', `${work.id}.html`), renderWorkPage(workTemplate, work));
          }

          fs.writeFileSync(dist('sitemap.xml'), renderSitemap());

          // Create 404.html fallback for GitHub Pages client-side routing
          const indexContent = fs.readFileSync(dist('index.html'), 'utf8');
          fs.writeFileSync(
            dist('404.html'),
            indexContent.replace(/<meta name="robots" content="[^"]*">/, '<meta name="robots" content="noindex, follow">'),
          );
        } catch (err) {
          console.error('Error generating clean URL directory structure:', err);
          throw err;
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
