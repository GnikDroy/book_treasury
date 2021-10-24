import React from 'react';

import { parse_book } from "../api/BookApi";
import { Link } from 'react-router-dom';

/**
 * Component for displaying a single book as a card.
 *
 * @component
 */
function BookCard(props) {
    const book = parse_book(props)
    const author = book.author === null ? "" : book.author.person;
    const cover = book.cover === null ? process.env.PUBLIC_URL + "/not_available.png" : book.cover.uri;
    return (
        <article className="fade-slide-bottom col my-3 d-flex justify-content-center">
            <div className="card h-100 bg-success text-white"
                style={{ width: "18rem" }} >
                <img className="card-img-top img-fluid"
                    src={cover}
                    alt="Cover" />
                <div className="card-body" >
                    <span className="card-title h5" > {book.title} </span>
                    <p className="card-text" > {author} </p>
                    <Link to={"/book/" + book.id} className="btn btn-outline-light"> See Details</Link>
                </div>
            </div>
        </article>
    );

}

export default BookCard;