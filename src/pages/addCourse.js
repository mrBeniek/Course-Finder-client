import React from 'react';
import Layout from 'components/layout/Layout';
import AddCourse from 'components/addCourse/AddCourse';

const addCoursePage = () => {
  return (
    <Layout title="Add New Course">
      <AddCourse />
    </Layout>
  );
};

export default addCoursePage;
