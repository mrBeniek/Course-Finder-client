import React from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Layout from 'components/layout/Layout';
import Info from 'components/common/Info';

const Verify = () => {
  const history = useHistory();
  const { type } = useParams();

  const TITLE =
    type === 'success'
      ? 'Email verification successful!'
      : type === 'pending'
      ? 'Account created successfuly'
      : 'Email verification failed';

  const MSG =
    type === 'success'
      ? 'Your email address has been verified successfuly. You can login now'
      : type === 'pending'
      ? `Your account has been created successfuly.
               Course Finder requires email verification. Head to the email address you provided and click the link to activate your account`
      : "Something went wrong with email verification. Probably you're already verified or the code is invalid";

  const REDIRECT = () => {
    if (type === 'success' || type === 'error') {
      if (type === 'success') {
        return ['/login', 5000];
      } else return ['/', 5000];
    } else if (type !== 'pending') history.replace('/404');
  };

  return (
    <div>
      <Layout title={TITLE}>
        <Info
          status={type}
          msg={MSG}
          redirect={REDIRECT()}
        />
      </Layout>
    </div>
  );
};

export default Verify;
