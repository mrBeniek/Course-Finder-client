import styles from './Label.module.scss';
import React from 'react';
import TagsStack from 'components/common/TagsStack';
import CourseRating from 'components/common/CourseRating';
import { Skeleton } from '@material-ui/lab';
import Typography from '@material-ui/core/Typography';

const Label = ({ loading, course }) => {
  return (
    <div className={styles.containerLabel}>
      {loading ? (
        <Skeleton variant="text" width="75%" height={85} />
      ) : (
        <React.Fragment>
          <div className={styles.containerName}>
            <CourseRating reviews={course.reviews} />
            <Typography variant="h4">
              {course.name}
            </Typography>
          </div>

          <div>
            {course.stack.map(val => {
              return <TagsStack label={val} />;
            })}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Label;
