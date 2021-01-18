import styles from './AddCourseMain.module.scss';
import React, { useState } from 'react';
import InputField from 'components/common/InputField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const AddCourseMain = () => {
  const [courseName, setCourseName] = useState('');
  const [courseLink, setCourseLink] = useState('');
  const [courseDesc, setCourseDesc] = useState('');

  const handleChange = state => event => {
    state(event.target.value);
  };

  const handleSubmit = () => {};

  return (
    <Container maxWidth="lg" className="white-font">
      <Typography className={styles.header} variant="h2">
        ADD NEW COURSE
      </Typography>
      <hr />
      <InputField
        label="Name"
        value={courseName}
        onChange={handleChange(setCourseName)}
      />
      <InputField
        label="Link"
        value={courseLink}
        onChange={handleChange(setCourseLink)}
      />
      <InputField
        label="Description"
        value={courseDesc}
        multiline
        rows={8}
        onChange={handleChange(setCourseDesc)}
      />

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
  );
};

export default AddCourseMain;
