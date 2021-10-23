import React from 'react';
import { ReactReader, ReactReaderStyle } from "react-reader";

function generate_plain_theme(foreground, background) {
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

const themeMap = {
    dark: {
        reactReader: generate_plain_theme("#e7e7e7", "#1d2022"),
        inner: { body: { color: '#e7e7e7', background: '#1d2022' }, a: { color: "#e7e7e7" }, "a:hover": { color: "#e7e7e7" } },
    },
    light: {
        reactReader: generate_plain_theme("#1d2022", "#e7e7e7"),
        inner: { body: { color: '#1d2022', background: '#e7e7e7' }, a: { color: "#1d2022" }, "a:hover": { color: "#1d2022" } },
    },
    sepia: {
        reactReader: generate_plain_theme("#1d2022", "#c5b281"),
        inner: { body: { color: '#1d2022', background: '#c5b281' }, a: { color: "#1d2022" }, "a:hover": { color: "#1d2022" } },
    },
};

export default function BookEpubView(props) {
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

    const fg = themeMap[theme].inner.body.color;
    const bg = themeMap[theme].inner.body.background;

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

    const themeControl = <div className="dropdown" style={{ color: fg }}>
        <button style={{ color: fg, border: "1px solid " + fg }} className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="fas fa-palette"></i>&nbsp;Theme
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><button className="dropdown-item" onClick={() => setTheme("light")}>Light</button></li>
            <li><button className="dropdown-item" onClick={() => setTheme("dark")}>Dark</button></li>
            <li><button className="dropdown-item" onClick={() => setTheme("sepia")}>Sepia</button></li>
        </ul>
    </div>;

    return (
        <div ref={viewRef} className="mt-5">
            <div style={{ height: "100vh" }} className="position-relative">
                <ReactReader {
                    ...{
                        ...props,
                        styles: themeMap[theme].reactReader,
                        getRendition: (rendition) => {
                            renditionRef.current = rendition;
                            rendition.themes.fontSize(`${size}%`);
                            rendition.themes.register(Object.fromEntries(
                                Object.entries(themeMap).map(([k, v]) => [k, v.inner])
                            ));
                            rendition.themes.select(theme);
                        }
                    }
                } />
                <div className="pb-2" style={{ background: bg, color: fg, textAlign: 'center', zIndex: 1 }}>
                    <div className="row">
                        <div className="col"> {fontControl} </div>
                        <div className="col"> {themeControl} </div>
                        <div className="col"> {fullScreenControl} </div>
                    </div>
                </div>
            </div>
        </div>
    );
}