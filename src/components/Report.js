import devCheck from 'utils/devCheck';
import styles from './Report.module.scss';
import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import InputField from 'components/common/InputField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import authAxios from 'utils/authAxios';

const Report = ({ asyncRequest }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [desc, setDesc] = useState('');
  const [descErr, setDescErr] = useState(false);

  const handleChange = (state, errorState) => event => {
    if (errorState) errorState(false);
    state(event.target.value);
  };

  const handleSubmit = async () => {
    if (!desc) {
      return setDescErr(true);
    }

    await asyncRequest(
      authAxios.post(`${devCheck}/api/add/report`, {
        data: {
          name,
          email,
          desc,
        },
      })
    );
  };

  return (
    <div className={styles.main}>
      <Container className={styles.container} maxWidth="sm">
        <Typography
          className={styles.typography}
          component="h1"
          variant="h4"
        >
          REPORT A BUG/SUGGESTION
        </Typography>
        <form
          className={styles.form}
          noValidate
          autoComplete="off"
        >
          <InputField
            id="name"
            label="Name"
            value={name}
            required={false}
            onChange={handleChange(setName)}
          />
          <InputField
            id="email"
            label="Email"
            value={email}
            required={false}
            onChange={handleChange(setEmail)}
          />
          <InputField
            error={descErr}
            helperText={
              descErr && 'Please provide a description'
            }
            id="repeat-password"
            label="Description"
            value={desc}
            multiline
            rows={8}
            onChange={handleChange(setDesc, setDescErr)}
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

export default Report;
