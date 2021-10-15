import React from 'react'
import { useParams } from 'react-router-dom';
import { fetch_book, parse_book, extract_html } from './BookApi';
import Throbber from './Throbber';


function Resource(props) {
    const filename = props.uri.split("/").pop();
    return (
        <div className="row">
            <div className="col text-start fw-bold">
                <p display="inline-block">{filename}</p>
            </div>
            <div className="col">
                <a className="btn btn-outline-success" href={props.uri}> {props.type} </a>

            </div>
        </div>
    );
}

function ResourceList(props) {
    return (
        <div className="text-end">
            <h3 className="mb-2">Download Links</h3>
            {props.resources.map(x => <React.Fragment key={x.id}>{Resource(x)}</React.Fragment>)}
        </div>
    );
}

function BookDetail() {
    const { id } = useParams();
    const [book, setBook] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        fetch_book(id).then((result) => {
            setBook(parse_book(result));
            setLoading(false);
        }).catch(() => {
            setError(true);
        });
    }, [id]);

    const author = book.author == null ? "" : book.author.person;
    const cover = book.cover == null ? "not_available.png" : book.cover.uri;
    const html_resource = extract_html(book);
    const html_style = {
        width: "100%",
        height: "100vh",
        "background-color": "white",
    }

    return (
        <div className="container">
            <div className="alert alert-danger" role="alert" style={{ display: error ? "block" : "none" }}>
                The book was not found.
            </div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        {book.cover == null ? "" : <img className="img-fluid" src={cover} alt="Cover" />}
                        <h1 >{book.title}</h1>
                        <h4 >{author}</h4>
                        {
                            Object.keys(book).length === 0 ? "" :
                                <p>
                                    Type: {book.type == null ? "" : book.type}<br />
                                    Downloads: {book.downloads}<br />
                                    Languages: {book.languages == null ? "" : book.languages.join(", ")} <br />
                                    Bookshelves: {book.bookshelves == null ? "" : book.bookshelves.join(", ")}
                                </p>
                        }
                        {
                            book.license == null ? "" : <a href={book.license} className="btn btn-outline-success">License</a>
                        }
                    </div>
                    <div className="col">
                        {book.resources == null ? "" : <ResourceList resources={book.resources} />}
                    </div>
                </div>
            </div>
            <div className="mt-5">
                {
                    html_resource == null ? "" :
                        <iframe src={html_resource.uri} title={book.title} style={html_style}>
                        </iframe>
                }
            </div>
            <div className="d-flex justify-content-center my-5">
                <Throbber visible={loading && !error} size="6rem" />
            </div>
        </div>
    );
}

export default BookDetail;