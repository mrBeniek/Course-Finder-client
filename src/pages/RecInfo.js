import styles from './RecInfo.module.scss';
import React from 'react';
import Layout from 'components/layout/Layout';
import Typography from '@material-ui/core/Typography';

const RecInfo = () => {
  return (
    <div>
      <Layout title="Password recovery - Check your email">
        <div className={styles.text}>
          <Typography variant="h6">
            Password reset link has been sent to the email
            you provided
          </Typography>
        </div>
      </Layout>
    </div>
  );
};

export default RecInfo;
