import React from 'react';
import Layout from 'components/layout/Layout';
import Main from 'components/home/Main';

const HomePage = () => {
  return (
    <div>
      <Layout title="Welcome to Course Finder!">
        <Main />
      </Layout>
    </div>
  );
};

export default HomePage;
