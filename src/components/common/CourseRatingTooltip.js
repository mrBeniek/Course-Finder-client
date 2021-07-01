import styles from './CourseRatingTooltip.module.scss';
import React from 'react';
import { Typography } from '@material-ui/core';

const CourseRatingTooltip = ({ reviews }) => {
  const ALL_REVIEWS =
    reviews.positive + reviews.negative + reviews.neutral;
  return (
    <div>
      <Typography>REVIEWS: {ALL_REVIEWS}</Typography>
      <hr />
      <div className={styles.reviewsCont}>
        <Typography className={styles.positive}>
          {reviews.positive}
        </Typography>
        <Typography>{reviews.neutral}</Typography>
        <Typography className={styles.negative}>
          {reviews.negative}
        </Typography>
      </div>
    </div>
  );
};

export default CourseRatingTooltip;
