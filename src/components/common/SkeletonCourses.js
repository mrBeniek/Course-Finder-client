import React from 'react';
import { Skeleton } from '@material-ui/lab';
import { Fragment } from 'react';

const SkeletonCourses = () => {
  return (
    <Fragment>
      <Skeleton variant="rect" width="75%" height={55} />
      <hr />
      <Skeleton variant="rect" width="100%" height={125} />
    </Fragment>
  );
};

export default SkeletonCourses;
