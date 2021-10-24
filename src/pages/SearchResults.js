import React from 'react';
import BookCatalogue from "../components/BookCatalogue";
import { useParams } from 'react-router-dom';

/**
 * Component to display contents of the search results page.
 *
 * @component
 */
function SearchResults(props) {
    let { q } = useParams();
    return <BookCatalogue query={{ search: q }} />;
}

export default SearchResults;