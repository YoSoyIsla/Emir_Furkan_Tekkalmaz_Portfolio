// scripts/site-render.mjs
//
// Build-time HTML rendering used by vite.config.js:
//   - the home page gallery rows (from GALLERY_ROWS in works-data.js)
//   - the home page structured data (WebSite, Person, artwork ItemList)
//   - one pre-rendered, crawlable page per artwork (/work/<id>) with its own
//     title, description, canonical URL, Open Graph image and VisualArtwork JSON-LD
//   - sitemap.xml (with image entries)

import {
    WORKS,
    GALLERY_ROWS,
    SITE_URL,
    ARTIST,
    getWork,
    imageSet,
    altText,
    cardInfo,
    sublineText,
    fullTitle,
    metaDescription,
    workUrl,
    artworkJsonLd,
    artistJsonLd,
} from '../works-data.js';

export const SITE_DESCRIPTION =
    `Portfolio of ${ARTIST.name}, an Istanbul-based contemporary painter whose Rhythm series captures ` +
    'ballet, dance and music in pencil, charcoal and acrylic on canvas.';

const esc = (s) =>
    String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

const jsonForScript = (data) => JSON.stringify(data, null, 2).replace(/</g, '\\u003c');

// ---------------------------------------------------------------------------
// Home page gallery
// ---------------------------------------------------------------------------

export function renderGallery(indent = '            ') {
    const out = [];
    GALLERY_ROWS.forEach((ids, rowIndex) => {
        const works = ids.map((id) => {
            const w = getWork(id);
            if (!w) throw new Error(`GALLERY_ROWS references unknown work "${id}"`);
            return w;
        });
        const sizes = new Set(works.map((w) => w.size));
        if (sizes.size !== 1) {
            throw new Error(`Gallery row ${rowIndex + 1} mixes large and small works: ${ids.join(', ')}`);
        }
        const large = works[0].size === 'large';
        const cap = large ? 2 : 3;
        if (works.length > cap) {
            throw new Error(`Gallery row ${rowIndex + 1} has ${works.length} ${large ? 'large' : 'small'} works (max ${cap})`);
        }
        const totalAr = works.reduce((s, w) => s + w.aspectRatio, 0);
        out.push(`${indent}<!-- Row ${rowIndex + 1}: ${large ? 'Large' : 'Smaller'} Paintings (${works.length} ${works.length === 1 ? 'Image' : 'Images'}) -->`);
        out.push(`${indent}<div class="gallery-row row-${cap}">`);
        for (const w of works) {
            const img = imageSet(w);
            const share = Math.min(100, Math.ceil((w.aspectRatio / totalAr) * 100));
            out.push(
                `${indent}    <a href="/work/${w.id}" class="gallery-card" style="--ar: ${w.aspectRatio};" aria-label="View ${esc(w.title)}">`,
                `${indent}        <img src="${img.src}"`,
                `${indent}            srcset="${img.srcset}"`,
                `${indent}            sizes="${share >= 100 ? '100vw' : `(max-width: 900px) 100vw, ${share}vw`}"`,
                `${indent}            width="${img.width}" height="${img.height}" alt="${esc(altText(w))}" loading="lazy" decoding="async">`,
                `${indent}        <div class="card-caption">`,
                `${indent}            <h3 class="project-title">${esc(w.title)}</h3>`,
                `${indent}            <p class="project-info">${esc(cardInfo(w))}</p>`,
                `${indent}        </div>`,
                `${indent}    </a>`,
            );
        }
        out.push(`${indent}</div>`, '');
    });
    return out.join('\n').trimEnd();
}

export function renderHomeJsonLd() {
    const galleryWorks = GALLERY_ROWS.flat().map(getWork);
    const data = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebSite',
                '@id': `${SITE_URL}/#website`,
                url: `${SITE_URL}/`,
                name: ARTIST.name,
                description: SITE_DESCRIPTION,
                inLanguage: 'en',
                publisher: { '@id': `${SITE_URL}/#artist` },
            },
            artistJsonLd(),
            {
                '@type': 'CollectionPage',
                '@id': `${SITE_URL}/#artworks`,
                url: `${SITE_URL}/`,
                name: `Artworks by ${ARTIST.name}`,
                isPartOf: { '@id': `${SITE_URL}/#website` },
                about: { '@id': `${SITE_URL}/#artist` },
                mainEntity: {
                    '@type': 'ItemList',
                    numberOfItems: galleryWorks.length,
                    itemListElement: galleryWorks.map((w, i) => ({
                        '@type': 'ListItem',
                        position: i + 1,
                        url: workUrl(w),
                        name: fullTitle(w),
                        image: `${SITE_URL}${imageSet(w).og}`,
                    })),
                },
            },
        ],
    };
    return `<script type="application/ld+json">\n${jsonForScript(data)}\n    </script>`;
}

// ---------------------------------------------------------------------------
// Per-artwork page
// ---------------------------------------------------------------------------

function findTag(html, id) {
    const re = new RegExp(`<([a-zA-Z][\\w-]*)\\b[^>]*\\bid="${id}"[^>]*>`);
    const m = re.exec(html);
    if (!m) throw new Error(`work.html: element #${id} not found`);
    return m;
}

function setAttr(tag, name, value) {
    const re = new RegExp(`\\s${name}="[^"]*"`);
    const attr = ` ${name}="${esc(value)}"`;
    return re.test(tag) ? tag.replace(re, attr) : tag.replace(/\s*\/?>$/, (end) => attr + end);
}

function editAttrs(html, id, attrs) {
    const m = findTag(html, id);
    let tag = m[0];
    for (const [name, value] of Object.entries(attrs)) tag = setAttr(tag, name, value);
    return html.slice(0, m.index) + tag + html.slice(m.index + m[0].length);
}

function setInner(html, id, inner) {
    const m = findTag(html, id);
    const tagName = m[1];
    const start = m.index + m[0].length;
    const end = html.indexOf(`</${tagName}>`, start);
    if (end === -1) throw new Error(`work.html: closing tag for #${id} not found`);
    return html.slice(0, start) + inner + html.slice(end);
}

export function workPageTitle(work) {
    return `${work.title} (${work.year}) | ${ARTIST.name}`;
}

/** Fill the generic work.html template with one artwork's content and metadata. */
export function renderWorkPage(html, work) {
    const img = imageSet(work);
    const url = workUrl(work);
    const title = workPageTitle(work);
    const description = metaDescription(work);
    const ogImage = `${SITE_URL}${img.og}`;
    const ogHeight = Math.round((Math.min(1200, img.width) * img.height) / img.width);
    const portrait = work.aspectRatio < 1;
    const sizes = `(max-width: 768px) 100vw, ${portrait ? Math.round(work.aspectRatio * 75) + 'vh' : '70vw'}`;

    let out = html;
    out = setInner(out, 'pageTitle', esc(title));
    out = editAttrs(out, 'metaDescription', { content: description });
    out = editAttrs(out, 'canonicalLink', { href: url });
    out = editAttrs(out, 'ogTitle', { content: title });
    out = editAttrs(out, 'ogDescription', { content: description });
    out = editAttrs(out, 'ogUrl', { content: url });
    out = editAttrs(out, 'ogImage', { content: ogImage });
    out = editAttrs(out, 'ogImageWidth', { content: String(Math.min(1200, img.width)) });
    out = editAttrs(out, 'ogImageHeight', { content: String(ogHeight) });
    out = editAttrs(out, 'ogImageAlt', { content: altText(work) });
    out = editAttrs(out, 'twTitle', { content: title });
    out = editAttrs(out, 'twDescription', { content: description });
    out = editAttrs(out, 'twImage', { content: ogImage });
    out = setInner(
        out,
        'workJsonLd',
        '\n' +
            jsonForScript({
                '@context': 'https://schema.org',
                '@graph': [
                    {
                        '@type': 'WebPage',
                        '@id': `${url}#webpage`,
                        url,
                        name: title,
                        description,
                        isPartOf: { '@id': `${SITE_URL}/#website` },
                        primaryImageOfPage: `${SITE_URL}${img.full}`,
                        mainEntity: { '@id': `${url}#artwork` },
                        breadcrumb: {
                            '@type': 'BreadcrumbList',
                            itemListElement: [
                                { '@type': 'ListItem', position: 1, name: 'Artworks', item: `${SITE_URL}/#artworks` },
                                { '@type': 'ListItem', position: 2, name: work.title, item: url },
                            ],
                        },
                    },
                    artworkJsonLd(work),
                ],
            }) +
            '\n    ',
    );
    out = editAttrs(out, 'singleWorkCard', { style: `--ar: ${work.aspectRatio};` });
    out = editAttrs(out, 'singleWorkImg', {
        src: img.src,
        srcset: img.srcset,
        sizes,
        width: String(img.width),
        height: String(img.height),
        alt: altText(work),
        fetchpriority: 'high',
        decoding: 'async',
    });
    out = setInner(out, 'singleWorkTitle', esc(work.title));
    out = setInner(out, 'singleWorkSubline', esc(sublineText(work)));
    return out;
}

/** Work id from a request URL (/work/<id>, /work/<id>.html or /work?id=<id>). */
export function workIdFromUrl(url) {
    if (!url) return null;
    const [pathname, query = ''] = url.split('?');
    const m = /^\/work\/([^/]+?)(?:\.html)?\/?$/.exec(pathname);
    if (m) return decodeURIComponent(m[1]);
    if (/^\/work(?:\.html|\/)?$/.test(pathname)) return new URLSearchParams(query).get('id');
    return null;
}

// ---------------------------------------------------------------------------
// Sitemap
// ---------------------------------------------------------------------------

export function renderSitemap(lastmod = new Date().toISOString().slice(0, 10)) {
    const imageEntry = (w) =>
        `    <image:image>\n      <image:loc>${SITE_URL}${imageSet(w).full}</image:loc>\n    </image:image>`;
    const urls = [
        { loc: `${SITE_URL}/`, priority: '1.0', images: GALLERY_ROWS.flat().map(getWork) },
        { loc: `${SITE_URL}/about`, priority: '0.8', images: [] },
        { loc: `${SITE_URL}/contact`, priority: '0.6', images: [] },
        ...WORKS.map((w) => ({ loc: workUrl(w), priority: '0.7', images: [w] })),
    ];
    const body = urls
        .map((u) =>
            [
                '  <url>',
                `    <loc>${esc(u.loc)}</loc>`,
                `    <lastmod>${lastmod}</lastmod>`,
                `    <priority>${u.priority}</priority>`,
                ...u.images.map(imageEntry),
                '  </url>',
            ].join('\n'),
        )
        .join('\n');
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ' +
        'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n' +
        body +
        '\n</urlset>\n'
    );
}

export { WORKS };
