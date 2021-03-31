import './_app.scss';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Auth from 'pages/Auth';
import Signup from 'pages/Signup';
import AddCourse from 'pages/AddCourse';
import Course from 'pages/Course';
import Page404 from 'pages/Page404';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/auth" component={Auth} />
      <Route path="/signup" component={Signup} />
      <Route path="/addcourse" component={AddCourse} />
      <Route path="/course/:id" component={Course} />
      <Route path="/404" component={Page404} />
      <Route path="*" component={Page404} />
    </Switch>
  );
}

export default App;
