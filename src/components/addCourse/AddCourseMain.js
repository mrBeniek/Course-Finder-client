import 'date-fns';
import styles from './AddCourseMain.module.scss';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import authAxios from 'utils/authAxios';
import InputField from 'components/common/InputField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AddCourseLangAccordion from './AddCourseLangAccordion';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const AddCourseMain = ({ asyncRequest, loginState }) => {
  const [courseName, setCourseName] = useState('');
  const [courseLink, setCourseLink] = useState('');
  const [courseSource, setCourseSource] = useState('');
  const [courseDate, setCourseDate] = useState(
    new Date(Date.now())
  );
  const [courseStack, setCourseStack] = useState([]);
  const [courseDesc, setCourseDesc] = useState('');

  const history = useHistory();

  useEffect(() => {
    if (!localStorage.token) history.push('/');
  });

  const handleChange = state => event => {
    state(event.target.value);
  };

  const handleDateChange = date => {
    setCourseDate(date);
  };

  const handleSubmit = async () => {
    const { ok, data } = await asyncRequest(
      authAxios.post('/api/add/course', {
        data: {
          name: courseName,
          link: courseLink,
          source: courseSource,
          date: courseDate,
          stack: courseStack,
          description: courseDesc,
        },
      })
    );
    if (ok) {
      const { courseId } = data;
      setTimeout(
        () => history.push(`/course/${courseId}`),
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
      <div>
        <FormControl
          className={styles.formSource}
          margin="normal"
          size="small"
          variant="filled"
          required
        >
          <InputLabel id="course-source-label">
            Source
          </InputLabel>
          <Select
            labelId="course-source-label"
            id="course-source-select"
            value={courseSource}
            variant="filled"
            onChange={handleChange(setCourseSource)}
          >
            <MenuItem value={'udemy'}>Udemy</MenuItem>
            <MenuItem value={'youtube'}>Youtube</MenuItem>
            <MenuItem value={'other'}>Other</MenuItem>
          </Select>
        </FormControl>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            className={styles.datePicker}
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="When was it posted?"
            value={courseDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
      <AddCourseLangAccordion
        courseStack={courseStack}
        setCourseStack={setCourseStack}
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
