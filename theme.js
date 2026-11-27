// theme.js - Shared light/dark theme switching for every page.
//
// Why this exists: the stylesheet animates theme colours per element (and through
// @property-registered variables). On mobile — and on browsers without @property —
// those per-element transitions run at different speeds, so parts of the page
// (header, drawer, text, icons, backgrounds) visibly changed at different times.
//
// The switch is now atomic: all CSS transitions are frozen while the theme flips,
// so every element changes in the same frame. Where the View Transitions API is
// available the whole page cross-fades as a single snapshot (same 300ms easing as
// before), which keeps the soft fade while guaranteeing everything stays in sync.

const root = document.documentElement;
const STORAGE_KEY = 'theme';
const THEME_COLORS = { light: '#FAF9F6', dark: '#000000' };
const darkQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
const reducedMotion = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

function readStoredTheme() {
    try {
        const t = localStorage.getItem(STORAGE_KEY);
        return t === 'dark' || t === 'light' ? t : null;
    } catch (e) {
        return null;
    }
}

function storeTheme(theme) {
    try {
        localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) { /* private mode / storage disabled */ }
}

export function getPreferredTheme() {
    return readStoredTheme() || (darkQuery && darkQuery.matches ? 'dark' : 'light');
}

export function getCurrentTheme() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function syncBrowserChrome(theme) {
    // Mobile browser UI (status bar / address bar) follows the page in the same frame.
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute('content', THEME_COLORS[theme]));
}

function commitTheme(theme) {
    if (theme === 'dark') {
        root.setAttribute('data-theme', 'dark');
    } else {
        root.removeAttribute('data-theme');
    }
    syncBrowserChrome(theme);
    // Flush styles while transitions are frozen so nothing animates afterwards.
    void root.offsetWidth;
}

let requestedTheme = getCurrentTheme();
let releaseFrame = 0;

function freezeTransitions() {
    cancelAnimationFrame(releaseFrame);
    root.classList.add('theme-switching');
}

function releaseTransitions() {
    cancelAnimationFrame(releaseFrame);
    // Two frames: the new colours are painted with transitions off before they come back.
    releaseFrame = requestAnimationFrame(() => {
        releaseFrame = requestAnimationFrame(() => root.classList.remove('theme-switching'));
    });
}

export function applyTheme(theme, { animate = false } = {}) {
    requestedTheme = theme;
    if (theme === getCurrentTheme()) {
        syncBrowserChrome(theme);
        return;
    }

    freezeTransitions();

    const canCrossFade =
        animate &&
        typeof document.startViewTransition === 'function' &&
        !(reducedMotion && reducedMotion.matches) &&
        document.visibilityState === 'visible';

    if (canCrossFade) {
        try {
            const transition = document.startViewTransition(() => commitTheme(theme));
            transition.finished.then(releaseTransitions, releaseTransitions);
            return;
        } catch (e) {
            /* fall back to an instant, synchronized switch */
        }
    }

    commitTheme(theme);
    releaseTransitions();
}

export function toggleTheme() {
    const next = requestedTheme === 'dark' ? 'light' : 'dark';
    storeTheme(next);
    applyTheme(next, { animate: true });
    if (document.activeElement && document.activeElement.blur) {
        document.activeElement.blur();
    }
}

// Inline onclick="toggleTheme()" handlers in the markup use the global.
window.toggleTheme = toggleTheme;

applyTheme(getPreferredTheme());

if (darkQuery) {
    const onSystemChange = (e) => {
        if (!readStoredTheme()) applyTheme(e.matches ? 'dark' : 'light', { animate: true });
    };
    if (darkQuery.addEventListener) darkQuery.addEventListener('change', onSystemChange);
    else if (darkQuery.addListener) darkQuery.addListener(onSystemChange);
}

// Keep tabs in sync, and re-check after a back/forward cache restore.
window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) applyTheme(getPreferredTheme());
});
window.addEventListener('pageshow', (e) => {
    if (e.persisted) applyTheme(getPreferredTheme());
});
