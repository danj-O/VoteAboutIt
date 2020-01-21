import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Navbar from './components/Navbar.component'
import PollsList from './components/PollsList.component'
import EditPoll from './components/EditPoll.component'
import CreatePoll from './components/CreatePoll.component'
import CreateUser from './components/CreateUser.component'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <br/>
        <Route path='/' exact component={PollsList} />
        <Route path='/edit/:id' component={EditPoll} />
        <Route path='/create' component={CreatePoll} />
        <Route path='/user' component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
