import React from 'react';
import {parse_book} from "./BookApi";

function BookCard(props) {
    const book = parse_book(props)
    return (
        <div className="col my-3">
            <div className="card h-100 bg-success text-white"
                style={{ width: "18rem" }} >
                <img className="card-img-top img-fluid"
                    src={book.cover.uri}
                    alt="Card cap" />
                <div className="card-body" >
                    <h5 className="card-title" > {book.title} </h5>
                    <p className="card-text" > {book.author.person} </p>
                    <p className="card-text" > {book.downloads} </p>
                    <p className="card-text" > {book.type} </p>
                    <a href={book.description} className="btn btn-outline-light" > See Details </a>
                </div>
            </div>
        </div>
    );

}


export default BookCard;