import styles from './Course.module.scss';
import ReviewList from './reviewList/ReviewList';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Label from './Label';
import Description from './Description';
import Review from './review/Review';

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
  }, [id]);

  return (
    <Container className={styles.container} maxWidth="md">
      <Label loading={loading} course={course} />
      <hr />
      <Description loading={loading} course={course} />
      <hr />
      <Review
        ownReview={ownReview}
        loginState={loginState}
        asyncRequest={asyncRequest}
        id={id}
      />
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
