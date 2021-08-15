import devCheck from 'utils/devCheck';
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
import Link from '@material-ui/core/Link';

const Login = () => {
  const { credentialsSend, status, msg } = useCredentials();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  useEffect(() => {
    if (localStorage.token) history.replace('/home');
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
    credentialsSend(`${devCheck}/login`, payload);
  };

  const handleGitHub = async () => {
    try {
      const response = await axios.post(
        `${devCheck}/api/auth/github`
      );
      const { data } = response;

      if (response.status === 200) {
        localStorage.setItem('token', data.token);
        const state = data.state;
        console.log(state);
        console.log('handleGitHub done');
        window.location = `${devCheck}/api/auth/github/state/${state}`;
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
        <Typography
          className={styles.typographyLogin}
          variant="h4"
        >
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
          variant="contained"
          color="primary"
          size="large"
          onClick={handleLogin}
        >
          Submit
        </Button>
        <br />
        <Button
          className={styles.btnGithub}
          variant="contained"
          size="large"
          color="primary"
          onClick={handleGitHub}
        >
          Log in with Github
        </Button>
        <br />
        <Typography>
          <Link
            href=""
            onClick={() => history.push('/recovery/email')}
          >
            Forgot password?
          </Link>
        </Typography>
      </Container>
    </div>
  );
};

export default Login;
