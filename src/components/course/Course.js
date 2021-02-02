import styles from './Course.module.scss';
import ReviewBox from 'components/course/reviewBox/ReviewBox';
import ReviewList from './reviewList/ReviewList';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const Course = ({ ...props }) => {
  const [course, setCourse] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(
          `/api/download/courses/${id}`
        );
        console.log(data.result);
        setCourse(data.result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourse();
  }, [id]);

  return (
    <Container className={styles.container} maxWidth="md">
      <Typography variant="h4">{course.name}</Typography>
      <br />
      <hr />
      <br />
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
      <br />
      <hr />

      <ReviewBox courseId={id} {...props} />
      <br />
      <hr />
      <br />
      <ReviewList id={id} />
    </Container>
  );
};

export default Course;
