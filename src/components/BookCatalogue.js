import React from 'react';
import PropTypes from 'prop-types';

import Throbber from './Throbber';
import CardGrid from './CardGrid';
import BookCard from './BookCard';
import AlertBox from './AlertBox';
import { fetch_books } from '../api/BookApi';

const defaultState = {
    loading: true,
    error: false,
    books: [],
    next_page: 1,
    next_available: true,
    query: {},
}

function reducer(state, action) {
    if (action.type === "LoadNextPage") {
        return {
            ...state,
            next_page: state.next_page + 1,
            loading: true,
        }
    } else if (action.type === "LoadingSuccessful") {
        return {
            ...state,
            books: [...state.books, ...action.books],
            next_available: action.next_available,
            loading: false,
            error: false,
        };
    } else if (action.type === "Error") {
        return {
            ...state,
            error: true,
        }
    } else if (action.type === "LoadInitial") {
        return {
            ...state,
            books: defaultState.books,
            next_page: defaultState.next_page,
            next_available: true,
            loading: true,
            query: action.query,
        };
    }
    return new Error("Invalid action type.");
}

/**
 * Component for displaying a catalogue of books.
 *
 * @component
 */
function BookCatalogue(props) {
    const [state, dispatch] = React.useReducer(reducer, defaultState);
    if (state.query !== props.query) {
        dispatch({ type: "LoadInitial", query: props.query });
    }


    const end_of_books = React.useRef();
    const observer = React.useRef();

    React.useEffect(() => {
        fetch_books({ ...props.query, page: state.next_page }).then(({ data }) => {
            if (data.results) {
                dispatch({ type: "LoadingSuccessful", books: data.results, next_available: data.next !== null });
            } else {
                dispatch({ type: "Error" });
            }
        }).catch(() => {
            dispatch({ type: "Error" });
        });
    }, [props.query, state.next_page]);


    if (observer.current) { observer.current.disconnect(); }
    observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting === true) {
            if (!state.loading && !state.error && state.next_available) {
                dispatch({ type: "LoadNextPage" });
            }
        }
    });
    if (end_of_books.current != null) {
        observer.current.observe(end_of_books.current);
    }

    const display_throbber = state.loading && !state.error;

    const error_msg = state.error &&
        <AlertBox>
            The API is inaccessible. Make sure you are connected to the internet.
        </AlertBox>;


    const throbber = (
        <aside ref={end_of_books} className="d-flex justify-content-center py-5 my-5" >
            {display_throbber && <Throbber />}
        </aside >
    );

    return (
        <main className="container">
            {error_msg}
            <CardGrid card={BookCard} data={state.books} key_fn={(x) => { return x.id; }} />
            {throbber}
        </main>
    );
}


BookCatalogue.propTypes = {
    /**
     * The query used to get the catalogue from the default api endpoint.
     */
    query: PropTypes.object.isRequired,
}

BookCatalogue.defaultProps = { }
export default BookCatalogue;