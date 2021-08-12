import './_app.scss';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import home from 'pages/home';
import login from 'pages/login';
import authGitHubInfo from 'pages/authGitHubInfo';
import auth from 'pages/auth';
import changePassword from 'pages/changePassword';
import signup from 'pages/signup';
import addCourse from 'pages/addCourse';
import course from 'pages/course';
import verify from 'pages/verify';
import recEmail from 'pages/recEmail';
import recInfo from 'pages/recInfo';
import recPassword from 'pages/recPassword';
import report from 'pages/report';
import page404 from 'pages/page404';
import profile from 'pages/profile';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route exact path="/home" component={home} />
      <Route path="/home/page/:page" component={home} />
      <Route path="/search/page/:page" component={home} />
      <Route path="/addcourse" component={addCourse} />
      <Route exact path="/auth" component={auth} />
      <Route
        path="/auth/github/info/:error"
        component={authGitHubInfo}
      />
      <Route
        path="/change/password"
        component={changePassword}
      />
      <Route path="/course/:id" component={course} />
      <Route path="/login" component={login} />
      <Route
        path="/profile/:username"
        component={profile}
      />
      <Route path="/recovery/email" component={recEmail} />
      <Route path="/recovery/info" component={recInfo} />
      <Route
        path="/recovery/password/:token"
        component={recPassword}
      />
      <Route path="/report" component={report} />
      <Route path="/signup" component={signup} />
      <Route
        path="/verify/email/:type"
        component={verify}
      />
      <Route path="/404" component={page404} />
      <Route path="*" component={page404} />
    </Switch>
  );
}

export default App;
