import React from 'react';
import Layout from 'components/layout/Layout';
import Info from 'components/common/Info';

const RecInfo = () => {
  return (
    <div>
      <Layout title="Password recovery - Check your email">
        <Info
          status="success"
          msg="Password reset link has been sent to the email
       you provided"
        />
      </Layout>
    </div>
  );
};

export default RecInfo;
