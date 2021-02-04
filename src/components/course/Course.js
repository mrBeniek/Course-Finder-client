import styles from './Course.module.scss';
import ReviewBox from 'components/course/reviewBox/ReviewBox';
import ReviewList from './reviewList/ReviewList';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Skeleton } from '@material-ui/lab';

const Course = ({ asyncRequest }) => {
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      const data = await asyncRequest(
        axios.get(`/api/download/courses/${id}`),
        false
      );
      if (data !== 'err') {
        console.log(data.result);
        setCourse(data.result);
        setLoading(false);
      }
    };

    fetchCourse();
  }, []);

  return (
    <Container className={styles.container} maxWidth="md">
      {loading ? (
        <Skeleton variant="text" width="75%" height={85} />
      ) : (
        <Typography variant="h4">{course.name}</Typography>
      )}

      <br />
      <hr />
      <br />
      {loading ? (
        <Skeleton
          variant="rect"
          width="100%"
          height={500}
        />
      ) : (
        <React.Fragment>
          <a
            href={course.link}
            target="_blank"
            rel="noreferrer"
          >
            {course.link}
          </a>
          <Typography className={styles.desc} paragraph>
            {course.description}
          </Typography>
        </React.Fragment>
      )}

      <br />
      <hr />

      <ReviewBox
        courseId={id}
        asyncRequest={asyncRequest}
      />
      <br />
      <hr />
      <br />
      <ReviewList id={id} asyncRequest={asyncRequest} />
    </Container>
  );
};

export default Course;
