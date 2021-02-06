import styles from './ReviewBox.module.scss';
import React, { useState } from 'react';
import authAxios from 'utils/authAxios';
import InputField from '../../common/InputField';
import RecommendBox from './RecommendBox';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

const ReviewBox = ({ asyncRequest, courseId }) => {
  const [review, setReview] = useState('');
  const [recommend, setRecommend] = useState('');

  const handleChange = state => event => {
    state(event.target.value);
  };

  const handleSubmit = async () => {
    if (!review || !recommend) return;
    await asyncRequest(
      authAxios.post('/api/add/review', {
        data: {
          id: courseId,
          recommend: recommend,
          review: review,
        },
      })
    );
  };

  return (
    <Container className={styles.main} maxWidth="md">
      <Typography variant="h5">
        Completed this course? Tell us about it:
      </Typography>
      <InputField
        label="Your review..."
        value={review}
        multiline
        rows={8}
        required={false}
        onChange={handleChange(setReview)}
      />
      <div className={styles.submitCont}>
        <RecommendBox
          recommend={recommend}
          setRecommend={setRecommend}
        />
        <Button
          className={styles.submitBtn}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit Review
        </Button>
      </div>
    </Container>
  );
};

export default ReviewBox;
