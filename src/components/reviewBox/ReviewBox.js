import styles from './ReviewBox.module.scss';
import React, { useState } from 'react';
import InputField from '../common/InputField';
import RecommendBox from './RecommendBox';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

const CommentBox = () => {
  const [comment, setComment] = useState('');
  const [recommend, setRecommend] = useState('');

  const handleChange = state => event => {
    state(event.target.value);
  };

  const handleSubmit = () => {};

  return (
    <Container className={styles.main} maxWidth="md">
      <Typography variant="h5">
        Completed this course? Tell us about it:
      </Typography>
      <InputField
        label="Your review..."
        value={comment}
        multiline
        rows={8}
        required={false}
        onChange={handleChange(setComment)}
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

export default CommentBox;
