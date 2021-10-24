import React from 'react';

import Page from '../components/Page';
import BookCatalogue from '../components/BookCatalogue';

/**
 * Component to display contents of the homepage.
 *
 * @component
 */
function Home() {
  return (
    <Page title='Home'>
      <BookCatalogue query={{}} />;
    </Page>
  );
}

export default Home;