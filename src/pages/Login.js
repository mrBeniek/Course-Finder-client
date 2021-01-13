import styles from './Login.module.scss';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import credentialsSend from 'utils/credentialsSend';
import Container from '@material-ui/core/Container';
import InputField from 'components/common/InputField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  useEffect(() => {
    if (localStorage.token) history.replace('/');
  });

  const handleChange = state => event => {
    state(event.target.value);
  };

  const handleLogin = async () => {
    if (!email || !password) return;
    const payload = {
      email: email,
      password: password,
    };
    const result = await credentialsSend('/login', payload);
    if (result) history.replace('/');
  };

  return (
    <div className={styles.main}>
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
      </Container>
    </div>
  );
};

export default Login;
