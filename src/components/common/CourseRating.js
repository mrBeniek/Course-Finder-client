import styles from './CourseRating.module.scss';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const CourseRating = ({ reviews }) => {
  const RATING = Math.floor(
    ((reviews.positive * 2 + reviews.neutral) * 100) /
      ((reviews.positive +
        reviews.negative +
        reviews.neutral) *
        2)
  );

  const COLOR = () => {
    switch (true) {
      case RATING > 90:
        return '#99f702';
      case RATING < 90 && RATING > 70:
        return '#42f560';
      case RATING < 70 && RATING > 55:
        return '#bbf0c4';
      case RATING < 45 && RATING > 30:
        return '#f59a9f';
      case RATING < 30:
        return '#aa2e25';
      default:
        return null;
    }
  };

  return (
    <Paper
      className={styles.container}
      style={{
        background: COLOR(),
      }}
    >
      <Typography
        className={styles.typography}
        variant="subtitle2"
      >
        {!RATING ? 'NEW' : RATING + '%'}
      </Typography>
    </Paper>
  );
};

export default CourseRating;
