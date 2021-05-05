import styles from './RecPasswordMain.module.scss';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import InputField from 'components/common/InputField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const RecPasswordMain = ({ asyncRequest, token }) => {
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (!localStorage.recToken) history.replace('/');
  });

  const handleChange = state => event => {
    state(event.target.value);
  };

  const handleSubmit = async () => {
    if (password !== passwordRepeat || !password) {
      return setPasswordError(true);
    }

    const payload = {
      token: token,
      password: password,
    };

    const config = {
      headers: { authorization: localStorage.recToken },
    };

    const { ok } = await asyncRequest(
      axios.post(
        '/api/recovery/token',
        {
          data: payload,
        },
        config
      )
    );

    if (ok) {
      setTimeout(() => history.push(`/login`), 5000);
      console.log('Password Changed Successfuly');
    }
  };

  return (
    <div className={styles.main}>
      <Container className={styles.container} maxWidth="sm">
        <Typography component="h1" variant="h5">
          CHANGE PASSWORD
        </Typography>
        <form
          className={styles.form}
          noValidate
          autoComplete="off"
        >
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
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Container>
    </div>
  );
};

export default RecPasswordMain;
