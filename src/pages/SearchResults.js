import React from 'react';
import BookCatalogue from "../components/BookCatalogue";
import { useParams } from 'react-router-dom';

import Page from '../components/Page';

/**
 * Component to display contents of the search results page.
 *
 * @component
 */
function SearchResults(props) {
    let { q } = useParams();
    return (
        <Page title={`Search Results for ${q}`}>
            <BookCatalogue query={{ search: q }} />
        </Page>
    );
}

export default SearchResults;