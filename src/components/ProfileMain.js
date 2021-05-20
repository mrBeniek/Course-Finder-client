import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Skeleton } from '@material-ui/lab';

const ProfileMain = ({ asyncRequest, username }) => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const fetchProfile = async () => {
      const { ok, data } = await asyncRequest(
        axios.get(`/api/download/profile/${username}`),
        false
      );

      if (ok) {
        document.title = `${username} - Profile`;
        console.log(data.result);
        setProfile(data.result);
        setLoading(false);
      } else {
        history.replace('/404');
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      {loading ? (
        <Skeleton variant="text" width="75%" height={85} />
      ) : (
        <React.Fragment>
          <Avatar>{username[0].toUpperCase()}</Avatar>
          <Typography variant="h4">{username}</Typography>
          <Typography variant="h6">COURSES:</Typography>
          <Typography variant="h6">
            {profile.courses}
          </Typography>
          <Typography variant="h6">REVIEWS:</Typography>
          <Typography variant="h6">
            {profile.reviews}
          </Typography>
        </React.Fragment>
      )}
    </div>
  );
};

export default ProfileMain;
