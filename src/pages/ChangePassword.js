import React from 'react';
import Layout from 'components/layout/Layout';
import ChangePassword from 'components/ChangePassword';

const ChangePasswordPage = () => {
  return (
    <div>
      <Layout title="Password Change">
        <ChangePassword />
      </Layout>
    </div>
  );
};

export default ChangePasswordPage;
