import styles from './ReviewBox.module.scss';
import React, { useState } from 'react';
import InputField from '../common/InputField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

const CommentBox = () => {
  const [comment, setComment] = useState('');

  const handleChange = state => event => {
    state(event.target.value);
  };

  const handleSubmit = () => {};

  return (
    <Container className={styles.container} maxWidth="md">
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
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Submit Review
      </Button>
    </Container>
  );
};

export default CommentBox;
