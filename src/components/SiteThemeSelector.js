import React from 'react';
import { getThemePreference } from '../utils';

/**
 * Change the current theme
 * @param {string} theme_type - The theme type to change theme to.
 */
function change_theme(theme_type) {
    localStorage.setItem("theme", theme_type);
    if (theme_type === "dark") {
        document.body.classList.remove("text-dark");
        document.body.classList.remove("bg-light");
        document.body.classList.add("text-light");
        document.body.classList.add("bg-dark");
    } else {
        document.body.classList.remove("text-light");
        document.body.classList.remove("bg-dark");
        document.body.classList.add("text-dark");
        document.body.classList.add("bg-light");
    }
}


/**
 * A theme selector toggle.
 *
 * @component
 */
function SiteThemeSelector() {
    const [theme, setTheme] = React.useState(localStorage.getItem("theme") || getThemePreference());
    const checkboxRef = React.useRef();

    React.useEffect(() => {
        change_theme(theme);
        if (checkboxRef.current) { checkboxRef.current.checked = theme === "dark"; }
    }, [theme,]);

    return (
        <>
            <i className="fas fa-sun d-inline-block align-middle px-2" style={{ fontSize: "1.2em", color: "#dfd33b" }}></i>
            <div className="form-check form-switch form-control-lg d-inline-block align-middle px-0">
                <input ref={checkboxRef} className="form-check-input align-middle mx-auto" type="checkbox" id="light_dark_checkbox" defaultChecked
                    onClick={
                        (event) => {
                            const new_theme = theme === "dark" ? "light" : "dark";
                            setTheme(new_theme);
                        }
                    } />
                <label htmlFor="light_dark_checkbox"> <span className="visually-hidden"> Switch Light and Dark modes. </span> </label>
            </div>
            <i className="fas fa-moon d-inline align-middle px-2" style={{ fontSize: "1.2em" }}></i>
        </>
    );
}

export default SiteThemeSelector;
