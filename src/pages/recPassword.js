import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from 'components/layout/Layout';
import RecPassword from 'components/recPassword/RecPassword';

const RecPasswordPage = () => {
  const { token } = useParams();
  return (
    <div>
      <Layout title="Password Change">
        <RecPassword token={token} />
      </Layout>
    </div>
  );
};

export default RecPasswordPage;
