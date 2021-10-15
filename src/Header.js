import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import SearchBar from './SearchBar';

function Header() {
    const history = useHistory();
    return (
        <div className="container my-5">
            <div className="row align-items-center">
                <div className="col-8">
                    <Link to="/" className="text-decoration-none text-light">
                        <h1 className="display-1">Book Treasury</h1>
                    </Link>
                </div>
                <div className="col-4 px-1">
                    <SearchBar placeholder="Book Title" btn_label="Search" action={input_elem => history.push("/search/" + input_elem.value)} />
                </div>
            </div>
        </div>
    );
}

export default Header;

