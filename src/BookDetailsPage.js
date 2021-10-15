import React from 'react'
import { useParams } from 'react-router-dom';
import { fetch_book, parse_book } from './BookApi';
import Throbber from './Throbber';
import BookDetail from './BookDetail';
import BookHtmlView from './BookHtmlView';


function BookDetailsPage() {
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

    const error_msg = (
        <div className="alert alert-danger" role="alert" style={{ display: error ? "block" : "none" }}>
            The book was not found.
        </div>
    );

    const throbber = (
        <div className="d-flex justify-content-center py-5 my-5">
            <Throbber visible={loading && !error} size="6rem" />
        </div>
    );

    return (
        <div className="container">
            {error_msg}
            {Object.keys(book).length !== 0 &&
                <>
                    <BookDetail book={book}/>
                    <BookHtmlView book={book}/>
                </>
            }
            {throbber}
        </div>
    );
}

export default BookDetailsPage;