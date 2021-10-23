
import { ReactReaderStyle } from "react-reader";

function generatePlainEpubTheme(foreground, background) {
    return {
        ...ReactReaderStyle,
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

export function getEpubTheme(theme) {
    return epubThemeMap[theme] || epubThemeMap["dark"];
}

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