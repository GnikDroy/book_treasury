import React from 'react'
import { useParams } from 'react-router-dom';
import { fetch_book, parse_book, extract_epub } from './BookApi';
import Throbber from './Throbber';
import BookDetail from './BookDetail';
import BookEpubView from './BookEpubView';


function BookDetailsPage() {
    const { id } = useParams();
    const [book, setBook] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [epubLocation, setEpubLocation] = React.useState(() => JSON.parse(localStorage.getItem(id)));

    React.useEffect(() => {
        fetch_book(id).then((result) => {
            setBook(parse_book(result));
            setLoading(false);
        }).catch(() => {
            setError(true);
        });
    }, [id]);

    React.useEffect(
        () => { localStorage.setItem(id, JSON.stringify(epubLocation)); },
        [id, epubLocation]
    );

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
                    <BookDetail book={book} />
                    {
                        extract_epub(book) &&
                        <BookEpubView
                            showToc={true}
                            title={book.title}
                            url={extract_epub(book).uri}
                            epubInitOptions={{ openAs: 'epub' }}
                            location={epubLocation}
                            locationChanged={(loc) => {
                                setEpubLocation(loc);
                                localStorage.setItem(id, JSON.stringify(loc));
                            }}
                        />
                    }
                </>
            }
            {throbber}
        </div>
    );
}

export default BookDetailsPage;