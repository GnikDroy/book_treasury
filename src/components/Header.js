import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import SearchBar from './SearchBar';
import SiteThemeSelector from './SiteThemeSelector';

function Header() {
    const history = useHistory();
    return (
        <div className="container-fluid p-relative">
            <div style={{ position: "absolute", top: "20px", right: "30px" }}>
                <SiteThemeSelector />
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

