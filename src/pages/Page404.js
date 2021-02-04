import React from 'react';
import Layout from 'components/layout/Layout';
import Typography from '@material-ui/core/Typography';

const Page404 = () => {
  return (
    <div>
      <Layout title="Page Not Found">
        <div className="center-page white-font">
          <Typography variant="h6">
            Oops! Seems you got lost time traveler, because
            this page doesn't exist, yet...
          </Typography>
        </div>
      </Layout>
    </div>
  );
};

export default Page404;
