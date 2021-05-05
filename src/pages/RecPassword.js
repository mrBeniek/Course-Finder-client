import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from 'components/layout/Layout';
import RecPasswordMain from 'components/RecPasswordMain';

const RecPassword = () => {
  const { token } = useParams();
  return (
    <div>
      <Layout title="Password Change">
        <RecPasswordMain token={token} />
      </Layout>
    </div>
  );
};

export default RecPassword;
