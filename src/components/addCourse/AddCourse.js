import 'date-fns';
import devCheck from 'utils/devCheck';
import styles from './AddCourse.module.scss';
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
import LangAccordion from './LangAccordion';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { FormHelperText } from '@material-ui/core';

const AddCourse = ({ asyncRequest, loginState }) => {
  const [courseName, setCourseName] = useState('');
  const [courseLink, setCourseLink] = useState('');
  const [courseAuthor, setCourseAuthor] = useState('');
  const [courseSource, setCourseSource] = useState('');
  const [courseDate, setCourseDate] = useState(
    new Date(Date.now())
  );
  const [courseStack, setCourseStack] = useState([]);
  const [courseDesc, setCourseDesc] = useState('');
  const [nameErr, setNameErr] = useState(false);
  const [authorErr, setAuthorErr] = useState(false);
  const [linkErr, setLinkErr] = useState(false);
  const [sourceErr, setSourceErr] = useState(false);
  const [descErr, setDescErr] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (!localStorage.token) history.push('/');
  });

  const errorCheck = () => {
    let status = false;
    if (!courseName) {
      setNameErr(true);
      status = true;
    }
    if (!courseAuthor) {
      setAuthorErr(true);
      status = true;
    }
    if (
      !courseLink ||
      !/(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(
        courseLink
      )
    ) {
      setLinkErr(true);
      status = true;
    }
    if (!courseSource) {
      setSourceErr(true);
      status = true;
    }
    if (!courseDesc) {
      setDescErr(true);
      status = true;
    }
    return status;
  };

  const handleChange = (state, errorState) => event => {
    errorState(false);

    state(event.target.value);
  };

  const handleDateChange = date => {
    setCourseDate(date);
  };

  const handleSubmit = async () => {
    if (errorCheck()) return;

    const { ok, data } = await asyncRequest(
      authAxios.post(`${devCheck}/api/add/course`, {
        data: {
          name: courseName,
          courseAuthor: courseAuthor,
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
    <Container className={styles.container} maxWidth="lg">
      <Typography className={styles.header} variant="h2">
        ADD NEW COURSE
      </Typography>
      <hr />
      <InputField
        error={nameErr}
        helperText={
          nameErr && 'Please enter a valid course name'
        }
        label="Name"
        value={courseName}
        onChange={handleChange(setCourseName, setNameErr)}
      />
      <InputField
        error={authorErr}
        helperText={
          authorErr &&
          'Please enter the author of this course'
        }
        label="Author"
        value={courseAuthor}
        onChange={handleChange(
          setCourseAuthor,
          setAuthorErr
        )}
      />
      <InputField
        error={linkErr}
        helperText={
          linkErr &&
          'Please enter a valid link to this course'
        }
        label="Link"
        value={courseLink}
        onChange={handleChange(setCourseLink, setLinkErr)}
      />

      <div>
        <FormControl
          className={styles.formSource}
          error={sourceErr}
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
            onChange={handleChange(
              setCourseSource,
              setSourceErr
            )}
          >
            <MenuItem value={'udemy'}>Udemy</MenuItem>
            <MenuItem value={'youtube'}>Youtube</MenuItem>
            <MenuItem value={'other'}>Other</MenuItem>
          </Select>
          {sourceErr && (
            <FormHelperText>
              Please select the source
            </FormHelperText>
          )}
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
      <LangAccordion
        courseStack={courseStack}
        setCourseStack={setCourseStack}
      />
      <InputField
        error={descErr}
        helperText={
          descErr &&
          "Please don't leave the description field empty"
        }
        label="Description"
        value={courseDesc}
        multiline
        rows={8}
        onChange={handleChange(setCourseDesc, setDescErr)}
      />
      <div className={styles.submitCont}>
        <Button
          className={styles.submit}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </Container>
  );
};

export default AddCourse;
