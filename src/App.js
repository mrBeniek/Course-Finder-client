import './_app.scss';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from 'pages/Home';
import Login from 'pages/Login';
import AuthGitHubInfo from 'pages/AuthGitHubInfo';
import Auth from 'pages/Auth';
import ChangePassword from 'pages/ChangePassword';
import Signup from 'pages/Signup';
import AddCourse from 'pages/AddCourse';
import Course from 'pages/Course';
import Verify from 'pages/Verify';
import RecEmail from 'pages/RecEmail';
import RecInfo from 'pages/RecInfo';
import RecPassword from 'pages/RecPassword';
import Page404 from 'pages/Page404';
import Profile from 'pages/Profile';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route exact path="/home" component={Home} />
      <Route path="/addcourse" component={AddCourse} />
      <Route exact path="/auth" component={Auth} />
      <Route
        path="/auth/github/info/:error"
        component={AuthGitHubInfo}
      />
      <Route
        path="/change/password"
        component={ChangePassword}
      />
      <Route path="/course/:id" component={Course} />
      <Route path="/login" component={Login} />
      <Route
        path="/profile/:username"
        component={Profile}
      />
      <Route path="/recovery/email" component={RecEmail} />
      <Route path="/recovery/info" component={RecInfo} />
      <Route
        path="/recovery/password/:token"
        component={RecPassword}
      />
      <Route path="/signup" component={Signup} />
      <Route
        path="/verify/email/:type"
        component={Verify}
      />
      <Route path="/404" component={Page404} />
      <Route path="*" component={Page404} />
    </Switch>
  );
}

export default App;
