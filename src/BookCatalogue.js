import React from 'react';
import Throbber from './Throbber';
import CardGrid from './CardGrid';
import BookCard from './BookCard';
import { fetch_books } from './BookApi';

function BookCatalogue(props) {
    const [loading, setLoading] = React.useState(true);
    const [books, setBooks] = React.useState([]);
    const [error, setError] = React.useState(false);
    const [next_page, setNextPage] = React.useState(1);
    const [next_available, setNextAvailable] = React.useState(true);

    const end_of_books = React.useRef();
    const observer = React.useRef();

    React.useEffect(() => {
        fetch_books({ ...props.query, page: next_page }).then((result) => {
            if (props.append) {
                setBooks(prev => [...prev, ...result.results]);
            } else {
                setBooks(prev => result.results);
            }
            setNextAvailable(result.next !== null);
            setLoading(false);
        }).catch(() => {
            setError(true);
        });
    }, [props.query, next_page, props.append]);


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

    const error_msg = (
        <div className="alert alert-danger" role="alert" style={{ display: display_error_msg }} >
            The API is currently unreachable.Please reach out to the site administrator.
        </div>
    );

    const throbber = (
        <div ref={end_of_books} className="d-flex justify-content-center py-5 my-5" >
            <Throbber visible={display_throbber} size={"6rem"} />
        </div >
    );

    return (
        <div className="container">
            {error_msg}
            <CardGrid card={BookCard} data={books} key_fn={(x) => { return x.id; }} />
            {throbber}
        </div>
    );
}

export default BookCatalogue;