import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import SearchBar from './SearchBar';
import SiteThemeSelector from './SiteThemeSelector';

/**
 * The website's title.

 * @type {object}
 */
export const title = "Book Treasury";

/**
 * Component to display the about help modal.
 *
 * @component
 */
function HelpModal(props) {
    let gutenberg = <a href="gutenberg.org" className="link-warning">Project Gutenberg®</a>;
    let modalContent =
        <div className="container">
            <h2> Read for free, forever </h2>
            <p>
                {title} is a site where you can read and download books for free. The site uses the catalogue available from {gutenberg}.
                The catalogue metadata is occasionally updated from the site. 
                We do not use {gutenberg} for the catalogue metadata information.
                That being said, the resources (epub view and cover images) are fetched from the site.
                Please respect the request limits placed there.
            </p>

            <h2> No Ads </h2>
            <p>
                The site will remain Advertisement free forever.
            </p>

            <h2> We don't track you </h2>
            <p>
                No user registration. No cookies. We respect your data and will never track you.
                We store the page number, theme and font settings locally on your device for your convenience.
                You can transfer your data to a different device by transferring the local storage 
                key-value pairs for this site.
            </p>
        
            <h2> Open Source </h2>
            <p>
                The entire website is open source. You can freely view, deploy, modify, etc the source (as per the license).
            </p>
        
        </div>;

    return (
        <>
            <button type="button" aria-label="About" className="btn" data-bs-toggle="modal" data-bs-target="#helpModal">
                <i className="fas fa-question text-success"></i>
            </button>

            <article className="modal fade" id="helpModal" tabIndex="-1" aria-labelledby="helpModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content bg-success text-light">
                        <header className="modal-header container">
                            <h1 className="modal-title display-3" id="helpModalLabel">About</h1>
                            <button type="button" className="btn-close bg-light" data-bs-dismiss="modal" aria-label="Close"></button>
                        </header>
                        <main className="modal-body">
                            {modalContent}
                        </main>
                        <footer className="modal-footer container">
                            {title} - {new Date().getFullYear()}
                        </footer>
                    </div>
                </div>
            </article>
        </>
    );
}

/**
 * The top header of the site.
 *
 * @component
 */
function Header(props) {
    const history = useHistory();
    return (
        <header className="fade-slide-top container py-5 position-relative">
            <aside style={{ position: "absolute", top: "5px", right: "5px" }}>
                <SiteThemeSelector />
                <div className="px-2 d-inline-block">
                    <HelpModal />
                </div>
            </aside>
            <div className="row align-items-center">
                <div className="col-md-8">
                    <Link to="/" className="text-decoration-none" style={{ color: "inherit" }}>
                        <h1 className="display-1">
                            <i className="fas fa-book-reader text-success"></i>
                            &nbsp;{title}
                        </h1>
                    </Link>
                </div>
                <div className="col-md-4">
                    <SearchBar placeholder="Book Title" btn_label="Search" action={input_elem => history.push("/search/" + input_elem.value)} />
                </div>
            </div>
        </header>
    );
}

export default Header;

