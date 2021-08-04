import styles from './Signup.module.scss';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useCredentials from 'hooks/useCredentials';
import SnackbarInfo from 'components/common/SnackbarInfo';
import Container from '@material-ui/core/Container';
import InputField from 'components/common/InputField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Signup = () => {
  const { credentialsSend, status, msg } = useCredentials();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (localStorage.token) history.replace('/home');
  });

  useEffect(() => {
    document.title = 'Sign Up - Course Finder';
  }, []);

  useEffect(() => {
    if (passwordError) {
      setTimeout(() => {
        setPasswordError(false);
      }, 4000);
    }
  }, [passwordError]);

  const handleChange = state => event => {
    state(event.target.value);
  };

  const handleSign = async () => {
    if (password !== passwordRepeat || !password) {
      return setPasswordError(true);
    }

    const payload = {
      username: username,
      email: email,
      password: password,
    };

    credentialsSend('/register', payload);
  };

  return (
    <div className={styles.main}>
      <SnackbarInfo msg={msg} status={status} />
      <Container className={styles.container} maxWidth="sm">
        <Typography component="h1" variant="h5">
          SIGN UP
        </Typography>
        <form
          className={styles.form}
          noValidate
          autoComplete="off"
        >
          <InputField
            id="username"
            label="Username"
            value={username}
            autoFocus
            onChange={handleChange(setUsername)}
          />
          <InputField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={handleChange(setEmail)}
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={handleChange(setPassword)}
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
            onChange={handleChange(setPasswordRepeat)}
          />
        </form>
        <Button
          type="submit"
          fullWidth
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
