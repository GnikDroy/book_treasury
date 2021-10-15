import React from 'react';
import { parse_book } from "./BookApi";
import { Link } from 'react-router-dom';

function BookCard(props) {
    const book = parse_book(props)
    const author = book.author === null ? "" : book.author.person;
    const cover = book.cover === null ? "not_available.png" : book.cover.uri;
    return (
        <div className="col my-3">
            <div className="card h-100 bg-success text-white"
                style={{ width: "18rem" }} >
                <img className="card-img-top img-fluid"
                    src={cover}
                    alt="Card cap" />
                <div className="card-body" >
                    <h5 className="card-title" > {book.title} </h5>
                    <p className="card-text" > {author} </p>
                    <Link to={"/book/" + book.id} className="btn btn-outline-light"> See Details</Link>
                </div>
            </div>
        </div>
    );

}


export default BookCard;