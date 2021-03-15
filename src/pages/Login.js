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
    await axios.post('/api/auth/github');
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
