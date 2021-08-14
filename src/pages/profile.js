import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from 'components/layout/Layout';
import Profile from 'components/Profile';

const ProfilePage = () => {
  const { username } = useParams();
  return (
    <div>
      <Layout title="Profile">
        <Profile username={username} />
      </Layout>
    </div>
  );
};

export default ProfilePage;
