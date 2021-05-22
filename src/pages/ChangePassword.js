import React from 'react';
import Layout from 'components/layout/Layout';
import ChangePasswordMain from 'components/ChangePasswordMain';

const ChangePassword = () => {
  return (
    <div>
      <Layout title="Password Change">
        <ChangePasswordMain />
      </Layout>
    </div>
  );
};

export default ChangePassword;
