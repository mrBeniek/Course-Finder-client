import './_app.scss';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Signup from 'pages/Signup';
import AddCourse from 'pages/AddCourse';
import Course from 'pages/Course';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/addcourse" component={AddCourse} />
      <Route path="/course/:id" component={Course} />
    </Switch>
  );
}

export default App;
