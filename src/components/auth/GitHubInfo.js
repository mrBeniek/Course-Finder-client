import React, { useEffect } from 'react';
import Layout from 'components/layout/Layout';
import Info from 'components/common/Info';
import { useHistory, useParams } from 'react-router-dom';

const GitHubInfo = () => {
  const { error } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (error !== 'email' && error !== 'username') {
      history.replace('/404');
    }
  });

  const TITLE = `GitHub login warning - ${error}`;
  const MSG =
    error === 'email'
      ? `It seems you already have registered a regular account with the email you used for GitHub.
  In order to login with GitHub please log in with your regular account first and then connect your account to GitHub in your profile.`
      : `You are logged in but it seems someone already uses the same username as you, so we had to generate a random one for you. 
      Don't worry, you can easily change it in your profile, or by clicking the button below`;

  return (
    <Layout title={TITLE}>
      <Info status="warning" msg={MSG} />
    </Layout>
  );
};

export default GitHubInfo;
