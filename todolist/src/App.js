import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import Add from './pages/Add';
import Default from './pages/Default';

const App = () => {

  return (
      <Router>
        <React.Fragment>

          <Switch>

            <Route path="/" exact component={ Home } />
            <Route path="/add"  component={ Add } />
            <Route component={ Default } />

          </Switch>

        </React.Fragment>

      </Router>
  );
}

export default App;
