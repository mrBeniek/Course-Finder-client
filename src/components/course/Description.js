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
          <div className={styles.info}>
            <Typography variant="body1">
              Date created:{' '}
              <b>{course.date.split('T')[0]}</b>
            </Typography>
            <Typography variant="body1">
              Author: <b>{course.courseAuthor}</b>
            </Typography>
            <Typography variant="body1">
              Link:{' '}
              <a
                href={course.link}
                target="_blank"
                rel="noreferrer"
              >
                <b>{course.link}</b>
              </a>
            </Typography>
          </div>
          <hr />
          <Typography className={styles.desc} paragraph>
            {course.description}
          </Typography>
        </React.Fragment>
      )}
    </div>
  );
};

export default Description;
