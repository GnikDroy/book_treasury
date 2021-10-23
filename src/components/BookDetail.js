import React from 'react'

export function Resource(props) {
    const filename = props.uri.split("/").pop();
    return (
        <div className="row">
            <div className="col text-start fw-bold"> {filename} </div>
            <div className="col">
                <a className="btn btn-outline-success" href={props.uri}> {props.type} </a>
            </div>
        </div>
    );
}

export function ResourceList(props) {
    return (
        <div className="text-end">
            <h3 className="mb-2">Resource Links</h3>
            {props.resources.map(x => <React.Fragment key={x.id}>{Resource(x)}</React.Fragment>)}
        </div>
    );
}

function BookDetail(props) {
    const author = props.book.author == null ? "" : props.book.author.person;
    const cover = props.book.cover == null ? process.env.PUBLIC_URL + "/not_available.png" : props.book.cover.uri;

     return (
        <div className="container">
            <div className="row">
                <div className="col-md fade-slide-left">
                    <img className="img-fluid" src={cover} alt="Cover" />
                    <h1 >{props.book.title}</h1>
                    <h4 >{author}</h4>
                    <p>
                        Type: {props.book.type}<br />
                        Downloads: {props.book.downloads}<br />
                        Languages: {props.book.languages.join(", ")} <br />
                        Bookshelves: {props.book.bookshelves.join(", ")}
                    </p>
                    <a href={props.book.license} className="btn btn-outline-success">License</a>
                </div>
                <div className="col-md fade-slide-right">
                    {props.book.resources != null && <ResourceList resources={props.book.resources} />}
                </div>
            </div>
        </div>
    );

}

export default BookDetail;