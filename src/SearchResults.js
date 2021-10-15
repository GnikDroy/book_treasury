import React from 'react';
import BookCatalogue from "./BookCatalogue";
import { useParams } from 'react-router-dom';

function SearchResults(props) {
    let { q } = useParams();
    return <BookCatalogue query={{ search: q }} append={false} />;
}

export default SearchResults;