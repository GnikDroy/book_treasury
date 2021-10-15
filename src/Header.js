import React from 'react';
import {Link} from 'react-router-dom';

function Header() {
    return (
        <div className="container my-5">
            <div className="row align-items-center">
                <div className="col-8">
                    <Link to="/" className="text-decoration-none text-light">
                        <Title />
                    </Link>
                </div>
                <div className="col-4 px-1">
                    <SearchBar />
                </div>
            </div>
        </div>
    );
}

function Title() {
    return <h1 className="display-1">Book Treasury</h1>;
}

function SearchBar() {
    return (
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Book Title" aria-label="Book Title" aria-describedby="basic-addon2"/>
          <div className="input-group-append">
            <button className="btn-lg btn-success" type="button">Search</button>
          </div>
        </div>
    );

}

export default Header;

