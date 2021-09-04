import devCheck from 'utils/devCheck';
import styles from './Profile.module.scss';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Skeleton } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import ButtonRedirect from '../common/ButtonRedirect';
import InputField from '../common/InputField';
import authAxios from 'utils/authAxios';

const Profile = ({ asyncRequest, username }) => {
  const [profile, setProfile] = useState({});
  const [changeUsername, setChangeUsername] =
    useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [usernameErr, setUsernameErr] = useState(false);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const fetchProfile = async () => {
      const { ok, data } = await asyncRequest(
        axios.get(
          `${devCheck}/api/download/profile/${username}`
        ),
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

  const handleChange = (state, errorState) => event => {
    errorState(false);

    state(event.target.value);
  };

  const handleSubmitUsername = async () => {
    if (!newUsername || newUsername.length > 20) {
      return setUsernameErr(true);
    }
    console.log('NEW USERNAME IS', newUsername);
    const { ok, data } = await asyncRequest(
      authAxios.post(`${devCheck}/api/change/username`, {
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
      setChangeUsername(false);
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
        <React.Fragment>
          <Container className={styles.topContainer}>
            <Container className={styles.username}>
              <Avatar className={styles.avatar}>
                {username[0].toUpperCase()}
              </Avatar>
              <Typography variant="h4" align="center">
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
            <Container className={styles.bottomCont}>
              <div className={styles.buttonsCont}>
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
              </div>
              {changeUsername && (
                <div className={styles.inputCont}>
                  <InputField
                    className={styles.inputField}
                    error={usernameErr}
                    helperText={
                      usernameErr &&
                      'Please enter a valid username (<21 characters)'
                    }
                    id="new username"
                    label="New username"
                    type="username"
                    autoFocus
                    onChange={handleChange(
                      setNewUsername,
                      setUsernameErr
                    )}
                  />
                  <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmitUsername}
                  >
                    Submit New Username
                  </Button>
                </div>
              )}
            </Container>
          )}
        </React.Fragment>
      )}
    </Container>
  );
};

export default Profile;
