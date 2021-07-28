import styles from './Review.module.scss';
import React from 'react';
import ReviewBox from 'components/course/review/reviewBox/ReviewBox';
import { Skeleton } from '@material-ui/lab';
import Typography from '@material-ui/core/Typography';

const Review = ({
  ownReview,
  loginState,
  asyncRequest,
  id,
}) => {
  return (
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
  );
};

export default Review;
