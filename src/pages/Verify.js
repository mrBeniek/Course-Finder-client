import styles from './Verify.module.scss';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Layout from 'components/layout/Layout';
import Typography from '@material-ui/core/Typography';

const Verify = () => {
  const history = useHistory();
  const { type } = useParams();

  useEffect(() => {
    if (type === 'success' || type === 'error') {
      setTimeout(() => {
        type === 'success'
          ? history.push('/login')
          : history.push('/');
      }, 5000);
    } else if (type !== 'pending') {
      history.push('/404');
    }
  });

  const TITLE =
    type === 'success'
      ? 'Email verification successful!'
      : type === 'pending'
      ? 'Account created successfuly'
      : 'Email verification failed';

  return (
    <div>
      <Layout title={TITLE}>
        <div className={styles.text}>
          <Typography variant="h6">
            {type === 'success'
              ? 'Your email address has been verified successfuly. You can login now'
              : type === 'pending'
              ? `Your account has been created successfuly.
               Course Finder requires email verification. Head to the email address you provided and click the link to activate your account`
              : "Something went wrong with email verification. Probably you're already verified or the code is invalid"}
          </Typography>
        </div>
      </Layout>
    </div>
  );
};

export default Verify;
