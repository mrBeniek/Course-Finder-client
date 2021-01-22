import styles from './AddCourseMain.module.scss';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import authAxios from 'utils/authAxios';
import InputField from 'components/common/InputField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const AddCourseMain = ({ asyncRequest }) => {
  const [courseName, setCourseName] = useState('');
  const [courseLink, setCourseLink] = useState('');
  const [courseDesc, setCourseDesc] = useState('');

  const history = useHistory();

  const handleChange = state => event => {
    state(event.target.value);
  };

  const handleSubmit = async () => {
    const result = await asyncRequest(
      authAxios.post('/api/add/course', {
        data: {
          name: courseName,
          link: courseLink,
          description: courseDesc,
        },
      })
    );
    if (result !== 'err') {
      setTimeout(
        () => history.push(`/course/${courseName}`),
        1000
      );
    }
  };

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
