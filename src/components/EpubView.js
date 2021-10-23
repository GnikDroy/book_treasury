import React from 'react';
import { ReactReader } from "react-reader";
import EpubThemes from './EpubThemes';
import { GetEpubTheme } from './EpubThemes';

export default function EpubView(props) {
    const [size, setSize] = React.useState(() => Number(localStorage.getItem("reader_font_size")) || 100);
    const [theme, setTheme] = React.useState(() => localStorage.getItem("reader_theme") || "dark")
    const renditionRef = React.useRef();
    const viewRef = React.useRef();

    React.useEffect(() => {
        if (renditionRef.current) {
            renditionRef.current.themes.fontSize(`${size}%`);
            localStorage.setItem("reader_font_size", size);
        }
    }, [size]);

    React.useEffect(() => {
        if (renditionRef.current) {
            renditionRef.current.themes.select(theme);
            localStorage.setItem("reader_theme", theme);
        }
    }, [theme]);

    const fg = GetEpubTheme(theme).inner.body.color;
    const bg = GetEpubTheme(theme).inner.body.background;

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
        <div className="pb-2" style={{ background: bg, color: fg, textAlign: 'center', zIndex: 1 }}>
            <div className="row">
                <div className="col"> {fontControl} </div>
                <div className="col"> {themeControl} </div>
                <div className="col"> {fullScreenControl} </div>
            </div>
        </div>;

    return (
        <div ref={viewRef} className="mt-5">
            <div style={{ height: "100vh" }} className="position-relative">
                <ReactReader {
                    ...{
                        ...props,
                        styles: GetEpubTheme(theme).reactReader,
                        getRendition: (rendition) => {
                            renditionRef.current = rendition;
                            rendition.themes.fontSize(`${size}%`);
                            rendition.themes.register(Object.fromEntries(
                                Object.entries(EpubThemes).map(([k, v]) => [k, v.inner])
                            ));
                            rendition.themes.select(theme);
                        }
                    }
                } />

                {controls}
            </div>
        </div>
    );
}