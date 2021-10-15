import React from 'react';
import BookDisplay from "./BookDisplay";
import { useParams } from 'react-router-dom';

function SearchResults(props) {
    let { q } = useParams();
    return (
        <BookDisplay query={{ search: q }} append={false} />
    );
}

export default SearchResults;