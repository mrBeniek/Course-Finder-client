import styles from './Course.module.scss';
import ReviewBox from 'components/course/reviewBox/ReviewBox';
import ReviewList from './reviewList/ReviewList';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Skeleton } from '@material-ui/lab';

const Course = ({ asyncRequest }) => {
  const [course, setCourse] = useState({});
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      const { ok, data } = await asyncRequest(
        axios.get(`/api/download/course/${id}`),
        false
      );

      if (ok) {
        document.title = data.result.name;
        console.log(data.result);
        setCourse(data.result);
        setLoading(false);
      }
    };
    if (id.length === 24) {
      fetchCourse();
    } else {
      history.replace('/404');
    }
  }, []);

  return (
    <Container className={styles.container} maxWidth="md">
      {loading ? (
        <Skeleton variant="text" width="75%" height={85} />
      ) : (
        <React.Fragment>
          <Typography variant="h4">
            {course.name}
          </Typography>
          <Typography variant="subtitle2">
            Date added: {course.date}
          </Typography>
        </React.Fragment>
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
            <b>{course.link}</b>
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
        reviews={reviews}
        setReviews={setReviews}
      />
      <br />
      <hr />
      <br />
      <ReviewList
        id={id}
        asyncRequest={asyncRequest}
        reviews={reviews}
        setReviews={setReviews}
      />
    </Container>
  );
};

export default Course;
