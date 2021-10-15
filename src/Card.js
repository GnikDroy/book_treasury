import React from 'react';

function Card(props) {
    const book = parse_book(props.book)
    return (
        <div className="card bg-primary text-white" style={{width :"18rem"}}>
          <img className="card-img-top img-fluid" src={book.cover.uri} alt="Card cap"/>
          <div className="card-body">
            <h5 className="card-title"> {book.title} </h5>
            <p className="card-text">{book.author.person}</p>
            <p className="card-text">{book.downloads}</p>
            <p className="card-text">{book.type}</p>
            <a href={book.description}>See Details</a>
          </div>
        </div>
    );

}

function extract_author(book) {
    for (const agent of book.agents) {
        if (agent.type === "Author") {
            return agent;
        }
    }
    return null;
}

function extract_cover(book) {
    for (const resource of book.resources) {
        if (resource.type === "image/jpeg" && resource.uri.endsWith(".cover.medium.jpg")) {
            return resource;
        }
    }
    return null;
    
}
function parse_book(book) {
    return { ...book, cover: extract_cover(book), author: extract_author(book) };
}

export default Card;