import styles from './ProfileMain.module.scss';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Skeleton } from '@material-ui/lab';
import ButtonRedirect from './common/ButtonRedirect';

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

  const profileOwner =
    localStorage.userInfo &&
    JSON.parse(localStorage.userInfo).username;

  return (
    <Container className={styles.container} maxWidth="md">
      {loading ? (
        <Skeleton variant="text" width="75%" height={85} />
      ) : (
        <Container>
          <Container className={styles.topContainer}>
            <Container className={styles.username}>
              <Avatar className={styles.avatar}>
                {username[0].toUpperCase()}
              </Avatar>
              <Typography variant="h4">
                {username}
              </Typography>
            </Container>
            <Container className={styles.stats}>
              <Typography variant="h6">
                COURSES: {profile.courses}
              </Typography>

              <Typography variant="h6">
                REVIEWS: {profile.reviews}
              </Typography>
            </Container>
          </Container>
          {profileOwner === username && (
            <ButtonRedirect
              style={styles.buttonUsername}
              label="CHANGE USERNAME"
              link="/"
            />
          )}
        </Container>
      )}
    </Container>
  );
};

export default ProfileMain;
