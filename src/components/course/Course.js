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
import Label from './Label';

const Course = ({ asyncRequest, loginState }) => {
  const [course, setCourse] = useState({});
  const [reviews, setReviews] = useState([]);
  const [ownReview, setOwnReview] = useState('loading');
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
      <Label loading={loading} course={course} />

      <hr />

      <div className={styles.containerDesc}>
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
      </div>

      <hr />

      <div className={styles.containerReview}>
        {ownReview === 'loading' ? (
          <Skeleton
            variant="rect"
            width="100%"
            height={150}
          />
        ) : !loginState ? (
          <React.Fragment>
            <Typography variant="h4" align="center">
              Please log in to review this course
            </Typography>
          </React.Fragment>
        ) : ownReview.length ? (
          <React.Fragment>
            <Typography variant="h4" align="center">
              You've already reviewed this course.
              <br />
              Thanks!
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <ReviewBox
              courseId={id}
              asyncRequest={asyncRequest}
              id={id}
            />
          </React.Fragment>
        )}
      </div>

      <hr />

      <ReviewList
        id={id}
        asyncRequest={asyncRequest}
        loginState={loginState}
        reviews={reviews}
        setReviews={setReviews}
        setOwnReview={setOwnReview}
      />
    </Container>
  );
};

export default Course;
