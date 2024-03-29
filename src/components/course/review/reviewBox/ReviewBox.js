import styles from './ReviewBox.module.scss';
import devCheck from 'utils/devCheck';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import authAxios from 'utils/authAxios';
import InputField from '../../../common/InputField';
import RecommendBox from './RecommendBox';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

const ReviewBox = ({ asyncRequest, courseId, id }) => {
  const [review, setReview] = useState('');
  const [recommend, setRecommend] = useState('');
  const [submitDisable, setSubmitDisable] = useState(false);

  const history = useHistory();

  const handleChange = state => event => {
    state(event.target.value);
  };

  const handleSubmit = async () => {
    if (!review || !recommend) return;
    setSubmitDisable(true);
    const res = await asyncRequest(
      authAxios.post(`${devCheck}/api/add/review`, {
        data: {
          id: courseId,
          recommend: recommend,
          review: review,
        },
      })
    );

    if (res.ok) {
      setTimeout(() => {
        setSubmitDisable(false);
        history.push('/empty');
        history.replace(`course/${id}`);
      }, 2000);
    }
  };

  return (
    <Container className={styles.main} maxWidth="md">
      <Typography variant="h5">
        Completed this course? Tell us about it:
      </Typography>
      <InputField
        className={styles.inputField}
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
          disabled={submitDisable}
        >
          Submit Review
        </Button>
      </div>
    </Container>
  );
};

export default ReviewBox;
