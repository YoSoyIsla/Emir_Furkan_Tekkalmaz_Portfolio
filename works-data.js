// works-data.js - Portfolio Artworks Dataset
//
// Source of truth: Assets.pdf (artist portfolio). Titles, dimensions, media,
// years and collections below are transcribed from that document.
//
// Images: original masters live in /works/<source>. Run `npm run images` to
// regenerate the optimized responsive WebP set in /public/works and the
// dimension manifest in works-images.generated.js.

import { IMAGE_DIMENSIONS } from './works-images.generated.js';

export const SITE_URL = 'https://emirfurkantekkalmaz.com';

export const ARTIST = {
    name: 'Emir Furkan Tekkalmaz',
    jobTitle: 'Contemporary Painter',
    birthDate: '1997-07-15',
    birthPlace: 'Eskişehir, Turkey',
    homeLocation: 'Istanbul, Turkey',
    email: 'emirfurkantekkalmaz@gmail.com',
    alumniOf: 'Mimar Sinan Fine Arts University',
    sameAs: ['https://www.instagram.com/emir.tekkalmaz/'],
};

const MEDIUM = 'Pencil, Charcoal, Acrylic Paint on Canvas';
const PRIVATE = 'Private Collection';

const RHYTHM_SERIES_STATEMENT =
    'Through my Rhythm series of paintings, I aim to capture the harmonious dynamic of aesthetic and rhythmic ' +
    'interactions in the art of ballet, an artistic expression embodied through the body, accompanied by music, ' +
    'translated on the canvas.';

// Responsive image ladder (px widths). The full-resolution master is capped at FULL_MAX_WIDTH.
export const RESPONSIVE_WIDTHS = [480, 960, 1440, 1920];
export const FULL_MAX_WIDTH = 2800;

// Paintings whose physical surface area meets this threshold are "large" and are
// laid out at most 2 per row; everything smaller is laid out up to 3 per row.
export const LARGE_AREA_CM2 = 16600;

/*
 * Fields:
 *   id          URL slug (/work/<id>) and image basename (/works/<id>*.webp)
 *   source      Master file inside /works used to generate the web images
 *   dimensions  As written in the portfolio PDF
 *   subtitle    Optional programme / sub-title shown with the title
 *   collection  Optional collection, as written in the PDF
 *   alt         Visual description used for alt text and structured data
 */
const RAW_WORKS = [
    {
        id: 'aria',
        title: 'Aria',
        year: '2026',
        dimensions: '72x116 cm',
        medium: MEDIUM,
        source: 'home_screen.jpg',
        alt: 'Ballerinas leaping across a fragmented theatrical stage of columns, arches and curtains',
    },
    {
        id: 'rhythm_ix',
        title: 'Rhythm IX',
        year: '2023',
        dimensions: '142x250 cm',
        medium: MEDIUM,
        collection: PRIVATE,
        source: 'rhythm_ix.png',
        series: 'Rhythm',
        alt: 'Six ballerinas in white tutus dancing in sequence against a pale, misty backdrop',
    },
    {
        id: 'rhythm_vii',
        title: 'Rhythm VII',
        year: '2023',
        dimensions: '140x180 cm',
        medium: MEDIUM,
        collection: PRIVATE,
        source: 'rhythm_vii.png',
        series: 'Rhythm',
        alt: 'A long line of ballerinas in black tutus captured as one continuous wave of movement on a reflective floor',
    },
    {
        id: 'pas_de_quatre',
        title: 'Pas De Quatre',
        year: '2024',
        dimensions: '200x190 cm',
        medium: MEDIUM,
        source: 'pas_de_quatre.png',
        alt: 'Four dancers in long black dresses moving together, one sweeping her skirt in a wide arc',
    },
    {
        id: 'pas_de_quatre_no2',
        title: 'Pas De Quatre No.2',
        year: '2024',
        dimensions: '200x190 cm',
        medium: MEDIUM,
        source: 'pas_de_quatre_no2.png',
        alt: 'Dancers on pointe lifting sheer white veils that ripple across a dark stage',
    },
    {
        id: 'the_rhythm_of_time',
        title: 'The Rhythm of Time',
        year: '2024',
        dimensions: '80x100 cm',
        medium: MEDIUM,
        collection: PRIVATE,
        source: 'the_rhythm_of_time.png',
        alt: 'A ballerina in a white tulle dress arching backwards, her motion echoed in layered translucent strokes',
    },
    {
        id: 'forty_figures_on_a_canvas',
        title: 'Forty Figures on a Canvas',
        year: '2023',
        dimensions: '81x100 cm',
        medium: MEDIUM,
        collection: PRIVATE,
        source: 'forty_figures_on_a_canvas.png',
        alt: 'A dancer in a black dress at the barre, her movement fanned out into dozens of overlapping figures',
    },
    {
        id: 'rhythm_xix',
        title: 'Rhythm XIX',
        year: '2024',
        dimensions: '60x80 cm',
        medium: MEDIUM,
        source: 'rhythm_xix.png',
        series: 'Rhythm',
        alt: 'Five ballerinas in black tutus performing successive phases of a single movement',
    },
    {
        id: 'rhythm_2022',
        title: 'Rhythm',
        year: '2022',
        dimensions: '200x270 cm',
        medium: MEDIUM,
        collection: 'Mustafa Taviloğlu Collection',
        source: 'rhythm_2022.png',
        series: 'Rhythm',
        alt: 'Ballerinas in black tutus mid-turn, their blurred movement reflected on a glossy studio floor',
    },
    {
        id: 'rhythm_x',
        title: 'Rhythm X',
        year: '2023',
        dimensions: '200x270 cm',
        medium: MEDIUM,
        collection: 'Gökhan Gündoğdu Museum Private Collection',
        source: 'rhythm_x.png',
        series: 'Rhythm',
        alt: 'Ballerinas in white tutus dancing in a line beneath a grand colonnaded hall',
    },
    {
        id: 'lonj',
        title: 'Lonj',
        year: '2023',
        dimensions: '200x270 cm',
        medium: MEDIUM,
        collection: PRIVATE,
        source: 'lonj.png',
        alt: 'Horses and riders circling an arena, blurred into a sweeping rhythm of movement',
    },
    {
        id: 'istanbul_state_symphony_orchestra',
        title: 'Istanbul State Symphony Orchestra',
        subtitle: 'Elgar Cello Concerto in E minor, Op. 85',
        year: '2023',
        dimensions: '200x270 cm',
        medium: MEDIUM,
        collection: PRIVATE,
        source: 'istanbul_state_symphony_orchestra.png',
        alt: 'A symphony orchestra performing on a concert hall stage beneath a towering pipe organ',
    },
    {
        id: 'manege',
        title: 'Manege',
        year: '2024',
        dimensions: '200x270 cm',
        medium: MEDIUM,
        collection: 'Odunpazarı Modern Museum (OMM) Collection',
        source: 'manege.png',
        alt: 'Ballerinas in black tutus repeated in successive phases of movement across a misty studio floor',
    },
    {
        id: 'giselle_no2',
        title: 'Giselle No.2',
        year: '2024',
        dimensions: '80x60 cm',
        medium: MEDIUM,
        source: 'giselle_no2.png',
        alt: 'A seated dancer shrouded in layers of white tulle, her movement multiplied in translucent strokes',
    },
    {
        id: 'rhythm_xi',
        title: 'Rhythm XI',
        year: '2023',
        dimensions: '100x80 cm',
        medium: MEDIUM,
        collection: PRIVATE,
        source: 'rhythm_xi.png',
        series: 'Rhythm',
        alt: 'A group of dancers in white tutus whirling, their arms and skirts dissolving into motion',
    },
    {
        id: 'ballet_class',
        title: 'Ballet Class',
        year: '2024',
        dimensions: '50x60 cm',
        medium: MEDIUM,
        source: 'ballet_class.png',
        alt: 'Dancers stretching at the barre and on the floor of a bright ballet studio with tall columns',
    },
    {
        id: 'flow',
        title: 'Flow',
        year: '2025',
        dimensions: '197x240 cm',
        medium: MEDIUM,
        source: 'flow.png',
        alt: 'A ballerina in a white dress at the centre of flowing, translucent white veils that trace her movement',
    },
    {
        id: 'giselle',
        title: 'Giselle',
        year: '2024',
        dimensions: '130x150 cm',
        medium: MEDIUM,
        source: 'giselle.png',
        alt: 'A young woman with lowered eyes seen through a long, translucent white veil',
    },
    {
        id: 'rhythm_iv',
        title: 'Rhythm IV',
        year: '2023',
        dimensions: '140x180 cm',
        medium: MEDIUM,
        collection: PRIVATE,
        source: 'rhythm_iv.png',
        series: 'Rhythm',
        alt: 'Four ballerinas in white tutus bending in successive phases of a single movement on a dark stage',
    },
    {
        id: 'rakkase',
        title: 'Rakkase',
        year: '2023',
        dimensions: '146x114 cm',
        medium: MEDIUM,
        collection: PRIVATE,
        source: 'rakkase.png',
        alt: 'A dancer in a white lace dress turning, her dark hair and flowing skirt dissolving into motion',
        statement:
            'In this piece, titled Rakkase, I visualized the temporal dance movements of Rakkase, who dances alone on ' +
            'the floor guided by the flow of the melody, through silhouette figures that melt and disappear in black and ' +
            'white contrast. I sought to capture the purity and clarity of Rakkase, drawing focus to her by emphasizing ' +
            'the bold and striking white dress, with its repeating lace details.',
    },
    {
        id: 'philharmonic_orchestra',
        title: 'Philharmonic Orchestra',
        subtitle: 'Mozart: Symphony No. 41 ‘Jupiter’',
        year: '2023',
        dimensions: '100x80 cm',
        medium: MEDIUM,
        source: 'philharmonic_orchestra.png',
        alt: 'An orchestra and conductor performing on stage before a tall, draped curtain',
    },
    {
        id: 'rhythm_v',
        title: 'Rhythm V',
        year: '2022',
        dimensions: '81x100 cm',
        medium: MEDIUM,
        collection: PRIVATE,
        source: 'rhythm_v.png',
        series: 'Rhythm',
        alt: 'Ghostly dancers in white skirts blurred into motion against a deep black background',
    },
    {
        id: 'rhythm_vi',
        title: 'Rhythm VI',
        year: '2022',
        dimensions: '50x60 cm',
        medium: MEDIUM,
        collection: PRIVATE,
        source: 'rhythm_vi.png',
        series: 'Rhythm',
        alt: 'Ballerinas in white rendered in loose, shimmering strokes against a dark ground',
    },
    {
        id: 'ophelia',
        title: 'Ophelia',
        year: '2024',
        dimensions: '114x146 cm',
        medium: MEDIUM,
        source: 'ophelia.png',
        alt: 'A woman in a white dress floating on dark water among lily pads',
    },
    {
        id: 'ophelia_no2',
        title: 'Ophelia No.2',
        year: '2024',
        dimensions: '146x114 cm',
        medium: MEDIUM,
        source: 'ophelia_no2.png',
        alt: 'A young woman in a white dress seated among water lilies in a dark pond beneath hanging willow branches',
    },
    {
        id: 'traces_of_elegance',
        title: 'Traces of Elegance',
        year: '2024',
        dimensions: '110x150 cm',
        medium: MEDIUM,
        source: 'traces_of_elegance.png',
        alt: 'Close-up of a young dancer’s face and eyes beneath a sparkling tiara',
    },
    {
        id: 'contemporary_dance_no1',
        title: 'Contemporary Dance No.1',
        year: '2024',
        dimensions: '110x130 cm',
        medium: MEDIUM,
        collection: PRIVATE,
        source: 'contemporary_dance_no1.png',
        alt: 'A contemporary dancer in a black slip dress with arms outstretched, casting a shadow on the wall',
    },
    {
        id: 'rhythm_xvii',
        title: 'Rhythm XVII',
        year: '2024',
        dimensions: '50x60 cm',
        medium: MEDIUM,
        collection: PRIVATE,
        source: 'rhythm_xvii.png',
        series: 'Rhythm',
        alt: 'Ballerinas in black leotards repeating a single port de bras in overlapping figures',
    },
    {
        // Listed in the PDF as "Rhythm XVII" (110x130 cm); "No.2" distinguishes it from the 50x60 cm work.
        id: 'rhythm_xvii_no2',
        title: 'Rhythm XVII No.2',
        year: '2024',
        dimensions: '110x130 cm',
        medium: MEDIUM,
        collection: PRIVATE,
        source: 'rhythm_xvii_no2.png',
        series: 'Rhythm',
        alt: 'Dancers in long dark skirts captured in a sequence of graceful poses on stage',
    },
    {
        id: 'reflection',
        title: 'Reflection',
        year: '2022',
        dimensions: '50x60 cm',
        medium: MEDIUM,
        collection: PRIVATE,
        source: 'reflection.png',
        alt: 'Dancers’ feet on pointe reflected in a scratched studio floor, a pair of pointe shoes lying in front',
    },
];

/*
 * Home page gallery rows (order = page order). Large works sit at most 2 per row,
 * small works at most 3 per row; the row class is derived from the works' size.
 */
export const GALLERY_ROWS = [
    ['rhythm_ix', 'rhythm_vii'],
    ['pas_de_quatre', 'pas_de_quatre_no2'],
    ['the_rhythm_of_time', 'forty_figures_on_a_canvas', 'rhythm_xix'],
    ['rhythm_2022', 'rhythm_x'],
    ['lonj', 'istanbul_state_symphony_orchestra'],
    ['manege'],
    ['giselle_no2', 'rhythm_xi', 'ballet_class'],
    ['flow', 'giselle'],
    ['rhythm_iv', 'rakkase'],
    ['philharmonic_orchestra', 'rhythm_v', 'rhythm_vi'],
    ['ophelia', 'ophelia_no2'],
    ['traces_of_elegance', 'contemporary_dance_no1'],
    ['rhythm_xvii', 'rhythm_xvii_no2', 'reflection'],
];

function parseDimensions(dimensions) {
    const m = /([\d.]+)\s*x\s*([\d.]+)/i.exec(dimensions || '');
    return m ? [parseFloat(m[1]), parseFloat(m[2])] : null;
}

function enrich(raw) {
    const dims = IMAGE_DIMENSIONS[raw.id];
    const width = dims ? dims[0] : 1200;
    const height = dims ? dims[1] : 1000;
    const aspectRatio = Math.round((width / height) * 10000) / 10000;
    const cm = parseDimensions(raw.dimensions);
    const area = cm ? cm[0] * cm[1] : 0;
    // The PDF lists dimensions inconsistently (HxW / WxH); orient them using the image itself.
    const physical = cm
        ? (aspectRatio >= 1
            ? { widthCm: Math.max(...cm), heightCm: Math.min(...cm) }
            : { widthCm: Math.min(...cm), heightCm: Math.max(...cm) })
        : null;
    return {
        artist: ARTIST.name,
        ...raw,
        image: `/works/${raw.id}.webp`,
        imageWidth: width,
        imageHeight: height,
        aspectRatio,
        size: area >= LARGE_AREA_CM2 ? 'large' : 'small',
        physical,
        description: raw.statement || (raw.series === 'Rhythm' ? RHYTHM_SERIES_STATEMENT : ''),
    };
}

// Work page navigation order: gallery order, with any works not in the gallery first.
const galleryOrder = GALLERY_ROWS.flat();
const byId = new Map(RAW_WORKS.map((w) => [w.id, w]));
const orderedIds = [
    ...RAW_WORKS.map((w) => w.id).filter((id) => !galleryOrder.includes(id)),
    ...galleryOrder,
];

export const WORKS = orderedIds.map((id) => enrich(byId.get(id)));

export function getWork(id) {
    return WORKS.find((w) => w.id === id);
}

/** Responsive image candidates for a work: { src, srcset, width, height, full }. */
export function imageSet(work) {
    const base = `/works/${work.id}`;
    const candidates = RESPONSIVE_WIDTHS.filter((w) => w < work.imageWidth).map((w) => ({
        url: `${base}-${w}.webp`,
        w,
    }));
    candidates.push({ url: `${base}.webp`, w: work.imageWidth });
    const fallback = candidates.find((c) => c.w >= 960) || candidates[candidates.length - 1];
    return {
        src: fallback.url,
        srcset: candidates.map((c) => `${c.url} ${c.w}w`).join(', '),
        width: work.imageWidth,
        height: work.imageHeight,
        full: `${base}.webp`,
        og: `${base}-og.jpg`,
    };
}

/** "Title" or "Title (Subtitle)" */
export function fullTitle(work) {
    return work.subtitle ? `${work.title} (${work.subtitle})` : work.title;
}

/** Caption under the thumbnail on the home page (same format as before). */
export function cardInfo(work) {
    return `${work.dimensions}, ${work.subtitle || work.collection || work.medium}, ${work.year}.`;
}

/** Second line under the artwork on the work page, mirroring the PDF caption. */
export function sublineText(work) {
    const parts = [];
    if (work.subtitle) parts.push(work.subtitle);
    if (work.dimensions) parts.push(work.dimensions);
    if (work.medium) parts.push(work.medium);
    if (work.year) parts.push(work.year);
    let text = parts.join(', ');
    if (work.collection) text += ` (${work.collection})`;
    return text;
}

/** Descriptive alt text: title, year, artist and a short visual description. */
export function altText(work) {
    return `${work.title} (${work.year}) by ${ARTIST.name}: ${work.alt}`;
}

/** Meta description (kept short for search snippets). */
export function metaDescription(work) {
    const coll = work.collection ? ` ${work.collection}.` : '';
    return `${fullTitle(work)}, ${work.year}. ${work.dimensions}, ${work.medium.toLowerCase()} by ${ARTIST.name}.${coll} ${work.alt}.`;
}

export function workUrl(work) {
    return `${SITE_URL}/work/${work.id}`;
}

/** schema.org VisualArtwork for a work. */
export function artworkJsonLd(work) {
    const img = imageSet(work);
    const data = {
        '@type': 'VisualArtwork',
        '@id': `${workUrl(work)}#artwork`,
        name: fullTitle(work),
        url: workUrl(work),
        image: {
            '@type': 'ImageObject',
            contentUrl: `${SITE_URL}${img.full}`,
            width: img.width,
            height: img.height,
            caption: altText(work),
        },
        thumbnailUrl: `${SITE_URL}${img.og}`,
        description: [
            `${work.alt}.`,
            work.collection ? `${work.collection}.` : '',
            work.description,
        ].filter(Boolean).join(' '),
        creator: { '@type': 'Person', '@id': `${SITE_URL}/#artist`, name: ARTIST.name },
        dateCreated: work.year,
        artform: 'Painting',
        artMedium: ['Pencil', 'Charcoal', 'Acrylic paint'],
        artworkSurface: 'Canvas',
        inLanguage: 'en',
    };
    if (work.physical) {
        data.width = { '@type': 'Distance', name: `${work.physical.widthCm} cm` };
        data.height = { '@type': 'Distance', name: `${work.physical.heightCm} cm` };
    }
    if (work.series) data.isPartOf = { '@type': 'CreativeWorkSeries', name: `${work.series} series` };
    return data;
}

export function artistJsonLd() {
    return {
        '@type': 'Person',
        '@id': `${SITE_URL}/#artist`,
        name: ARTIST.name,
        url: `${SITE_URL}/`,
        jobTitle: ARTIST.jobTitle,
        birthDate: ARTIST.birthDate,
        birthPlace: ARTIST.birthPlace,
        homeLocation: { '@type': 'Place', name: ARTIST.homeLocation },
        email: `mailto:${ARTIST.email}`,
        alumniOf: { '@type': 'CollegeOrUniversity', name: ARTIST.alumniOf },
        image: `${SITE_URL}/assets/about_image.webp`,
        sameAs: ARTIST.sameAs,
    };
}

if (typeof window !== 'undefined') {
    window.WORKS_DATA = WORKS;
}
