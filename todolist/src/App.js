import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import Add from './pages/Add';
import Default from './pages/Default';

export const todoContext = React.createContext()

const App = () => {

  const [todoList, setTodoList] = useState([
    {
        title: 'Run errands',
        dueDate: '2020-07-11',
        priority: 80,
        completed: false
    },
    {
        title: 'Hahahahaha',
        dueDate: '2020-07-15',
        priority: 90,
        completed: false
    },
    {
        title: 'Be Happy',
        dueDate: '2020-07-11',
        priority: 100,
        completed: true
    },
    {
        title: 'Clean room',
        dueDate: '2020-07-11',
        priority: 50,
        completed: false
    }
  ]);

  return (
    <todoContext.Provider value={{todoList, setTodoList}}>
      <Router>
        <React.Fragment>

          <Switch>

            <Route path="/" exact component={ Home } />
            <Route path="/add"  component={ Add } />
            <Route component={ Default } />

          </Switch>

        </React.Fragment>

      </Router>
    </todoContext.Provider>
  );
}

export default App;
