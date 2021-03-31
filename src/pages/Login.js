import styles from './Login.module.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import useCredentials from 'hooks/useCredentials';
import SnackbarInfo from 'components/common/SnackbarInfo';
import Container from '@material-ui/core/Container';
import InputField from 'components/common/InputField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Login = () => {
  const { credentialsSend, status, msg } = useCredentials();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  useEffect(() => {
    if (localStorage.token) history.replace('/');
  });

  useEffect(() => {
    document.title = 'Log In - Course Finder';
  }, []);

  const handleChange = state => event => {
    state(event.target.value);
  };

  const handleLogin = async () => {
    if (!email || !password) return;
    const payload = {
      email: email,
      password: password,
    };
    credentialsSend('/login', payload);
  };

  const handleGitHub = async () => {
    try {
      const response = await axios.post('/api/auth/github');
      const { data } = response;

      if (response.status === 200) {
        localStorage.setItem('token', data.token);
        const state = data.state;
        console.log(state);
        console.log('handleGitHub done');
        window.location = `http://localhost:5000/api/auth/github/state/${state}`;
      }
    } catch (err) {
      console.log('handleGitHub error');
      console.log(err);
    }
  };

  return (
    <div className={styles.main}>
      <SnackbarInfo msg={msg} status={status} />
      <Container className={styles.container} maxWidth="sm">
        <Typography component="h1" variant="h5">
          LOG IN
        </Typography>
        <form
          className={styles.form}
          noValidate
          autoComplete="off"
        >
          <InputField
            id="email"
            label="Email"
            type="email"
            autoFocus
            onChange={handleChange(setEmail)}
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            onChange={handleChange(setPassword)}
          />
        </form>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
        >
          Submit
        </Button>
        <br />
        {/*<a href="https://github.com/login/oauth/authorize?client_id=3f0c09eee23d08feeed5">*/}

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleGitHub}
        >
          Log in with Github
        </Button>
      </Container>
    </div>
  );
};

export default Login;
