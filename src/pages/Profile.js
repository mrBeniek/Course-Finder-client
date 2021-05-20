import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from 'components/layout/Layout';
import ProfileMain from 'components/ProfileMain';

const Profile = () => {
  const { username } = useParams();
  return (
    <div>
      <Layout title="Profile">
        <ProfileMain username={username} />
      </Layout>
    </div>
  );
};

export default Profile;
