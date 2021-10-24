import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import SearchBar from './SearchBar';
import SiteThemeSelector from './SiteThemeSelector';

function Header() {
    const history = useHistory();
    return (
        <div className="fade-slide-top container py-5 position-relative">
            <div style={{ position: "absolute", top: "10px", right: "5px" }}>
                <SiteThemeSelector />
            </div>
            <div className="row align-items-center">
                <div className="col-md-8">
                    <Link to="/" className="text-decoration-none" style={{ color: "inherit" }}>
                        <h1 className="display-1">
                            <i className="fas fa-book-reader text-success"></i>
                            &nbsp;Book Treasury
                        </h1>
                    </Link>
                </div>
                <div className="col-md-4">
                    <SearchBar placeholder="Book Title" btn_label="Search" action={input_elem => history.push("/search/" + input_elem.value)} />
                </div>
            </div>
        </div>
    );
}

export default Header;

