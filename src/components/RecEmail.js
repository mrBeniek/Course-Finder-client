import styles from './RecEmail.module.scss';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import InputField from 'components/common/InputField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const RecEmail = ({ asyncRequest }) => {
  const [email, setEmail] = useState('');
  const history = useHistory();

  const handleChange = state => event => {
    state(event.target.value);
  };

  const handleSubmit = async () => {
    const { ok, data } = await asyncRequest(
      axios.post('/api/recovery/email', { data: email })
    );

    if (ok) {
      localStorage.setItem('recToken', data.token);
      console.log(data.token);
      console.log('handleSubmit done');
      history.push('/recovery/info');
    }
  };

  return (
    <div>
      <Container className={styles.container} maxWidth="sm">
        <Typography component="h1" variant="h5">
          Please enter the email you used to create the
          account
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
        </form>
        <Button
          type="submit"
          size="large"
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

export default RecEmail;
