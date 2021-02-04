import React from 'react';
import Layout from 'components/layout/Layout';
import Course from 'components/course/Course';

const CoursePage = () => {
  return (
    <div>
      <Layout title="Loading course...">
        <Course />
      </Layout>
    </div>
  );
};

export default CoursePage;
