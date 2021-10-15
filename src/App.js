import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from './Header';
import Home from './Home';
import BookDetail from './BookDetail';
import SearchResults from './SearchResults';

function App() {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/book/:id">
          <BookDetail/>
        </Route>
        <Route path="/search/:q">
          <SearchResults/>
        </Route>
        <Route path="*">
          <h1> Invalid page!</h1>
        </Route>

      </Switch>
    </Router>
  );

}

export default App;