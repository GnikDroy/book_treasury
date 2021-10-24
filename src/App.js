import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from './components/Header';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import SearchResults from './pages/SearchResults';
import InvalidPage from './pages/404';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
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
    </Router>
  );

}

export default App;