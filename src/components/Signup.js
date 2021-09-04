import devCheck from 'utils/devCheck';
import styles from './Signup.module.scss';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import useAsync from 'hooks/useAsync';
import SnackbarInfo from 'components/common/SnackbarInfo';
import Container from '@material-ui/core/Container';
import InputField from 'components/common/InputField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Signup = () => {
  const { asyncRequest, snackbarOpen, status, msg } =
    useAsync();
  const [username, setUsername] = useState('');
  const [usernameErr, setUsernameErr] = useState(false);
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordLengthErr, setPasswordLengthErr] =
    useState(false);
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (localStorage.token) history.replace('/home');
  });

  useEffect(() => {
    document.title = 'Sign Up - Course Finder';
  }, []);

  const errorCheck = () => {
    let status = false;
    if (!username || username.length > 21) {
      setUsernameErr(true);
      status = true;
    }
    if (
      !email ||
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        email
      )
    ) {
      setEmailErr(true);
      status = true;
    }
    if (password.length < 8) {
      setPasswordLengthErr(true);
      status = true;
    }
    if (password !== passwordRepeat || !password) {
      setPasswordError(true);
      status = true;
    }
    return status;
  };

  const handleChange = (state, errorState) => event => {
    errorState(false);

    state(event.target.value);
  };

  const handleSign = async () => {
    if (errorCheck()) return;

    const payload = {
      username: username,
      email: email,
      password: password,
    };

    const { ok } = await asyncRequest(
      axios.post(`${devCheck}/register`, { data: payload })
    );

    if (ok) {
      setTimeout(() => {
        history.replace('/verify/email/pending');
      }, 700);
    }
  };

  return (
    <div className={styles.main}>
      <SnackbarInfo
        open={snackbarOpen}
        msg={msg}
        status={status}
      />
      <Container className={styles.container} maxWidth="sm">
        <Typography
          className={styles.typographySignup}
          variant="h4"
        >
          SIGN UP
        </Typography>
        <form
          className={styles.form}
          noValidate
          autoComplete="off"
        >
          <InputField
            error={usernameErr}
            helperText={
              usernameErr &&
              'Please enter a valid username (<21 characters)'
            }
            id="username"
            label="Username"
            value={username}
            autoFocus
            onChange={handleChange(
              setUsername,
              setUsernameErr
            )}
          />

          <InputField
            error={emailErr}
            helperText={
              emailErr && 'Please enter a valid email'
            }
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={handleChange(setEmail, setEmailErr)}
          />

          <InputField
            error={passwordLengthErr}
            helperText={
              passwordLengthErr &&
              'Password too short (8 characters minimum)'
            }
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={handleChange(
              setPassword,
              setPasswordLengthErr
            )}
          />
          <InputField
            error={passwordError}
            helperText={
              passwordError && "Password doesn't match"
            }
            id="repeat-password"
            label="Repeat Password"
            type="password"
            value={passwordRepeat}
            onChange={handleChange(
              setPasswordRepeat,
              setPasswordError
            )}
          />
        </form>
        <Button
          type="submit"
          size="large"
          variant="contained"
          color="primary"
          onClick={handleSign}
        >
          Submit
        </Button>
      </Container>
    </div>
  );
};

export default Signup;
