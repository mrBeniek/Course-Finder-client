import styles from './Description.module.scss';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Skeleton } from '@material-ui/lab';

const Description = ({ loading, course }) => {
  return (
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
  );
};

export default Description;
