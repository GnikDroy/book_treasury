
import { ReactReaderStyle } from "react-reader";
import { getThemePreference } from '../utils';

/**
 * Generates a simple theme based on fg and bg colors.
 * @param {string} foreground - The foreground color (any CSS type color will work).
 * @param {string} background - The background color (any CSS type color will work).
 * @returns {object} - The generated theme.
 */
function generatePlainEpubTheme(foreground, background) {
    return {
        ...ReactReaderStyle,
        container: { overflow: 'hidden', flexGrow: 1, position: 'relative' },
        readerArea: { ...ReactReaderStyle.readerArea, backgroundColor: background, },
        titleArea: { ...ReactReaderStyle.titleArea, color: foreground, },
        tocArea: { ...ReactReaderStyle.tocArea, background: background, color: foreground, },
        tocAreaButton: {
            ...ReactReaderStyle.tocAreaButton,
            color: foreground,
            borderBottom: "1px solid " + foreground,
        },
        tocButtonExpanded: { ...ReactReaderStyle.tocButtonExpanded, background: background, },
        arrow: { ...ReactReaderStyle.arrow, background: background, color: foreground, },
        loadingView: { ...ReactReaderStyle.loadingView, color: foreground, }
    };
}

/**
 * Gets a theme from the epub. Considers user preference and returns a valid theme, if theme is not valid.
 * @param {string} theme - The theme type.
 * @returns {object} - The theme of the given type if available, a valid theme otherwise.
 */
export function getEpubTheme(theme) {
    const preferred = getThemePreference();
    return epubThemeMap[theme] || epubThemeMap[preferred];
}

/**
 * A map of the various themes available.

 * @type {object}
 */
const epubThemeMap = {
    dark: {
        reactReader: generatePlainEpubTheme("#e7e7e7", "#1d2022"),
        inner: { body: { color: '#e7e7e7', background: '#1d2022' }, a: { color: "#e7e7e7" }, "a:hover": { color: "#e7e7e7" } },
    },
    light: {
        reactReader: generatePlainEpubTheme("#1d2022", "#e7e7e7"),
        inner: { body: { color: '#1d2022', background: '#e7e7e7' }, a: { color: "#1d2022" }, "a:hover": { color: "#1d2022" } },
    },
    sepia: {
        reactReader: generatePlainEpubTheme("#1d2022", "#c5b281"),
        inner: { body: { color: '#1d2022', background: '#c5b281' }, a: { color: "#1d2022" }, "a:hover": { color: "#1d2022" } },
    },
};

export default epubThemeMap;