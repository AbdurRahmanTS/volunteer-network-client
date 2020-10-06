import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './component/Home/Home';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import NotPound from './component/NotPound/NotPound';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';
import Events from './component/Events/Events';
import VolunteerRegisterList from './component/VolunteerRegisterList/VolunteerRegisterList';
import AddEvent from './component/AddEvent/AddEvent';


export const UserContext = createContext();

function App() {
  const [loggedinUser, setLoggedinUser] = useState({})
  return (
    <UserContext.Provider value={[loggedinUser, setLoggedinUser]}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/addevent">
            <AddEvent />
          </Route>
          <PrivateRoute path="/volunteerregisterlist">
            <VolunteerRegisterList />
          </PrivateRoute>
          <PrivateRoute path="/events">
            <Events />
          </PrivateRoute>
          <PrivateRoute path="/register/:volunteerName">
            <Register />
          </PrivateRoute>
          <Route path="*">
            <NotPound />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
