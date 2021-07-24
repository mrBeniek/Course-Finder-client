import styles from './ChangePassword.module.scss';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import InputField from 'components/common/InputField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import authAxios from 'utils/authAxios';

const ChangePassword = ({ asyncRequest }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (!localStorage.token) history.replace('/home');
  });

  const handleChange = state => event => {
    state(event.target.value);
  };

  const handleSubmit = async () => {
    if (password !== passwordRepeat || !password) {
      return setPasswordError(true);
    }

    const profileOwner =
      localStorage.userInfo &&
      JSON.parse(localStorage.userInfo).username;

    const { ok, data } = await asyncRequest(
      authAxios.post('/api/change/password', {
        data: {
          oldPassword: oldPassword,
          password: password,
        },
      })
    );

    if (ok) {
      setTimeout(() => {
        history.push(`/profile/${profileOwner}`);
      }, 5000);
    }

    if (!ok && data.status === 403) {
      setTimeout(() => {
        history.push('/login');
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
      }, 5000);
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
            id="oldpassword"
            label="Old Password"
            type="password"
            value={oldPassword}
            onChange={handleChange(setOldPassword)}
          />
          <InputField
            id="password"
            label="New Password"
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
            label="Repeat New Password"
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

export default ChangePassword;
