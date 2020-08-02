import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from './pages/Home';
import About from './pages/About';
import Login from './sessions/Login';
import Logout from './sessions/Logout';

import Plans from './plans/Index';
import NewPlan from './plans/New';
import EditPlan from './plans/Edit';
import Register from './users/Register'

function Routes ({user, setUser}) {
  return (
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/about" component={About}/>
      <Route exact path="/login" render={
        renderProps => <Login
          {...renderProps}
          setUser={setUser}
        />
      }/>
      <Route exact path="/logout" render={
        renderProps => <Logout
          {...renderProps}
          setUser={setUser}
        />
      }/>
      <Route exact path="/plans" render={
        renderProps => <Plans
          {...renderProps}
          user={user}
        />
      }/>
      <Route exact path="/plans/New" component={NewPlan}/>
      <Route exact path="/plans/Edit" component={EditPlan}/>
      <Route exact path="/Register" component={Register}/>
    </Switch>
  );
}

export default Routes;

