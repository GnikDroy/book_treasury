import React from 'react';
import { ReactReader } from "react-reader";
import epubThemes from './EpubThemes';
import { getEpubTheme } from './EpubThemes';
import { getThemePreference } from '../utils';

export default function EpubView(props) {
    const [size, setSize] = React.useState(() => Number(localStorage.getItem("reader_font_size")) || 100);
    const [theme, setTheme] = React.useState(() => localStorage.getItem("reader_theme") || getThemePreference());
    const renditionRef = React.useRef();
    const viewRef = React.useRef();

    React.useEffect(() => {
        localStorage.setItem("reader_font_size", size);
        if (renditionRef.current) {
            renditionRef.current.themes.fontSize(`${size}%`);
        }
    }, [size]);

    React.useEffect(() => {
        localStorage.setItem("reader_theme", theme);
        if (renditionRef.current) {
            renditionRef.current.themes.select(theme);
        }
    }, [theme]);

    const fg = getEpubTheme(theme).inner.body.color;
    const bg = getEpubTheme(theme).inner.body.background;

    const fontButtonStyle = { color: fg, backgroundColor: "none", border: "1px solid " + fg };

    const fontControl =
        <>
            <button className="btn btn-sm" style={fontButtonStyle} onClick={() => setSize(Math.max(80, size - 5))}>
                <i className="fas fa-search-plus"></i>
            </button>
            <span className="px-1">{size}%</span>
            <button className="btn btn-sm" style={fontButtonStyle} onClick={() => setSize(Math.min(150, size + 5))}>
                <i className="fas fa-search-minus"></i>
            </button>
        </>;

    const fullScreenControl = <div>
        <button style={{ color: fg, border: "1px solid " + fg }} className="btn" type="button" onClick={() => {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                viewRef.current.requestFullscreen();
            }
        }}><i className="fas fa-expand"></i>&nbsp;Expand</button>
    </div>;

    const ThemeDropDownItem = ({ theme, displayName }) =>
        <li><button className="dropdown-item" onClick={() => setTheme(theme)}> {displayName} </button></li>;

    const themeControl = <div className="dropdown" style={{ color: fg }}>
        <button style={{ color: fg, border: "1px solid " + fg }} className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="fas fa-palette"></i>&nbsp;Theme
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <ThemeDropDownItem theme="light" displayName="Light" />
            <ThemeDropDownItem theme="dark" displayName="Dark" />
            <ThemeDropDownItem theme="sepia" displayName="Sepia" />
        </ul>
    </div>;

    const controls =
        <aside className="py-2" style={{ background: bg, color: fg, textAlign: 'center', zIndex: 1 }}>
            <div className="row">
                <div className="col"> {fontControl} </div>
                <div className="col"> {themeControl} </div>
                <div className="col"> {fullScreenControl} </div>
            </div>
        </aside>;

    return (
        <div ref={viewRef} className="mt-5">
            <main style={{ height: "100vh" }} className="position-relative d-flex flex-column">
                <ReactReader {
                    ...{
                        ...props,
                        styles: getEpubTheme(theme).reactReader,
                        getRendition: (rendition) => {
                            renditionRef.current = rendition;
                            rendition.themes.fontSize(`${size}%`);
                            rendition.themes.register(Object.fromEntries(
                                Object.entries(epubThemes).map(([k, v]) => [k, v.inner])
                            ));
                            rendition.themes.select(theme);
                        }
                    }
                } />

                {controls}
            </main>
        </div>
    );
}