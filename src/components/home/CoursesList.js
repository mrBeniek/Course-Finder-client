import styles from './CoursesList.module.scss';
import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import CourseLogo from '../common/CourseLogo';
import TagsStack from '../common/TagsStack';
import CourseRating from '../common/CourseRating';
import Grow from '@material-ui/core/Grow';
import { dateConverter } from 'utils/dateConvert';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const CoursesList = ({ courses, loading }) => {
  const history = useHistory();

  const DELAY = [
    0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500,
  ];

  return (
    <div>
      {courses.map((val, index) => {
        return (
          <Grow
            key={val._id}
            in={!loading}
            timeout={DELAY[index]}
          >
            <Container
              className={styles.container}
              maxWidth="lg"
              onClick={() => {
                if (!loading)
                  history.push(`/course/${val._id}`);
              }}
            >
              {!loading && (
                <Fragment>
                  <div className={styles.containerInfo}>
                    <div>
                      <div className={styles.containerName}>
                        <CourseRating
                          reviews={val.reviews}
                        />
                        <Typography variant="h4">
                          {val.name}
                        </Typography>
                      </div>

                      <div className={styles.tags}>
                        {val.stack.map((val, index) => {
                          return (
                            <TagsStack
                              label={val}
                              key={val}
                            />
                          );
                        })}
                      </div>
                    </div>

                    <CourseLogo logo={val.source} />
                  </div>

                  <hr />
                  <div className={styles.bottomCont}>
                    <Typography
                      paragraph
                      className={styles.description}
                    >
                      {val.description.length > 70
                        ? val.description.slice(0, 70) +
                          '...'
                        : val.description}
                    </Typography>
                    <div>
                      <Typography variant="subtitle2">
                        age:
                      </Typography>
                      <Typography variant="subtitle2">
                        {dateConverter(val.date)}
                      </Typography>
                    </div>
                  </div>
                </Fragment>
              )}
            </Container>
          </Grow>
        );
      })}
    </div>
  );
};

export default CoursesList;
