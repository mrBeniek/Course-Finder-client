import styles from './Profile.module.scss';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Skeleton } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import ButtonRedirect from './common/ButtonRedirect';
import InputField from './common/InputField';
import authAxios from 'utils/authAxios';

const Profile = ({ asyncRequest, username }) => {
  const [profile, setProfile] = useState({});
  const [changeUsername, setChangeUsername] =
    useState(false);
  const [newUsername, setNewUsername] = useState('');
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

  const handleChange = state => event => {
    state(event.target.value);
  };

  const handleSubmitUsername = async () => {
    console.log('NEW USERNAME IS', newUsername);
    const { ok, data } = await asyncRequest(
      authAxios.post('/api/change/username', {
        data: {
          username: newUsername,
        },
      })
    );

    if (ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem(
        'userInfo',
        JSON.stringify(data.userInfo)
      );
      document.title = `${newUsername} - Profile`;
      history.replace(`/profile/${newUsername}`);
    }
  };

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
            <Container>
              <Button
                onClick={() =>
                  setChangeUsername(!changeUsername)
                }
                className={styles.buttonUsername}
              >
                CHANGE USERNAME
              </Button>

              <ButtonRedirect
                className={styles.buttonUsername}
                label="CHANGE PASSWORD"
                link="/change/password"
              />
              {changeUsername && (
                <React.Fragment>
                  <InputField
                    id="new username"
                    label="Enter new username"
                    type="username"
                    autoFocus
                    onChange={handleChange(setNewUsername)}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSubmitUsername}
                  >
                    Submit New Username
                  </Button>
                </React.Fragment>
              )}
            </Container>
          )}
        </Container>
      )}
    </Container>
  );
};

export default Profile;
