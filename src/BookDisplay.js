import React from 'react';
import Throbber from './Throbber';
import CardGrid from './CardGrid';
import BookCard from './BookCard';
import { fetch_popular } from './BookApi';

function BookDisplay(props) {
    const [loading, setLoading] = React.useState(true);
    const [books, setBooks] = React.useState([]);
    const [error, setError] = React.useState(false);
    const [next_page, setNextPage] = React.useState(1);
    const [next_available, setNextAvailable] = React.useState(true);

    const end_of_books = React.useRef();
    const observer = React.useRef();

    React.useEffect(() => {
        fetch_popular(next_page).then((result) => {
            setBooks(prev => [...prev, ...result.results]);
            setNextAvailable(result.next !== null);
            setLoading(false);
        }).catch(() => {
            setError(true);
        });
    }, [next_page]);


    if (observer.current) { observer.current.disconnect(); }
    observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting === true) {
            if (!loading && !error && next_available) {
                setNextPage((page) => page + 1);
                setLoading(true);
            }
        }
    });
    if (end_of_books.current != null) {
        observer.current.observe(end_of_books.current);
    }

    const display_error_msg = error ? "block" : "none";
    const display_throbber = loading && !error;

    return (
        <div className="container">
            <div className="alert alert-danger" role="alert" style={{ display: display_error_msg }}>
                The API is currently unreachable. Please reach out to the site administrator.
            </div>
            <CardGrid card={BookCard} data={books} key_fn={(x) => { return x.id; }} />
            <div ref={end_of_books} className="d-flex justify-content-center my-5">
                <Throbber visible={display_throbber} size={"6rem"} />
            </div>
        </div>

    );
}

export default BookDisplay;
