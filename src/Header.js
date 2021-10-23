import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import SearchBar from './SearchBar';

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
function ThemeSelector() {
    const [theme, setTheme] = React.useState(localStorage.getItem("theme") || "dark");
    const checkboxRef = React.useRef();

    React.useEffect(() => {
        change_theme(theme);
        if (checkboxRef.current) { checkboxRef.current.checked = theme === "dark"; }
    }, [theme,]);

    return (
        <>
            <i className="fas fa-sun d-inline-block align-middle px-2" style={{ fontSize: "1.2em", color: "#dfd33b" }}></i>
            <div className="form-check form-switch d-inline-block align-middle">
                <input ref={checkboxRef} className="form-check-input align-middle" type="checkbox" id="light_dark_checkbox" defaultChecked
                    onClick={
                        (event) => {
                            const new_theme = theme === "dark" ? "light" : "dark";
                            setTheme(new_theme);
                        }
                    } />
            </div>
            <i className="fas fa-moon d-inline align-middle" style={{ fontSize: "1.2em" }}></i>
        </>
    );
}

function Header() {
    const history = useHistory();


    return (
        <div className="container-fluid p-relative">
            <div style={{ position: "absolute", top: "20px", right: "30px" }}>
                <ThemeSelector />
            </div>

            <div className="fade-slide-top container my-5">
                <div className="row align-items-center">
                    <div className="col-md-8 p-2">
                        <Link to="/" className="text-decoration-none" style={{ color: "inherit" }}>
                            <h1 className="display-1">
                                <i className="fas fa-book-open"></i>&nbsp;Book Treasury
                            </h1>
                        </Link>
                    </div>
                    <div className="col-md-4 p-2">
                        <SearchBar placeholder="Book Title" btn_label="Search" action={input_elem => history.push("/search/" + input_elem.value)} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;

