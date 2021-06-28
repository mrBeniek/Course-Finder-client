import React from 'react';
import Layout from 'components/layout/Layout';
import AddCourseMain from 'components/addCourse/AddCourseMain';

const Home = () => {
  return (
    <div>
      <Layout title="Add New Course">
        <AddCourseMain />
      </Layout>
    </div>
  );
};

export default Home;
