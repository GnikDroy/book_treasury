import React from 'react';
import { BrowserRouter as HashRouter, Route, Switch } from 'react-router-dom'

import Header from './components/Header';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import SearchResults from './pages/SearchResults';
import InvalidPage from './pages/404';

function App() {
  return (
    <HashRouter>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/book_treasury">
          <Home />
        </Route>
        <Route path="/book/:id">
          <BookDetails />
        </Route>
        <Route path="/search/:q">
          <SearchResults />
        </Route>
        <Route path="*">
          <InvalidPage />
        </Route>

      </Switch>
    </HashRouter>
  );

}

export default App;