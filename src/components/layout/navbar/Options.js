import styles from './Options.module.scss';
import React from 'react';
import ButtonRedirect from 'components/common/ButtonRedirect';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

const Options = ({ setLoginState }) => {
  const userLabel =
    localStorage.userInfo &&
    JSON.parse(localStorage.userInfo).username;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    setLoginState(false);
  };

  return (
    <div className={styles.rightCont}>
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        light
      />

      <div className={styles.profileCont}>
        <Avatar>{userLabel[0].toUpperCase()}</Avatar>
        <Typography
          className={styles.profileLabel}
          variant="body1"
        >
          {userLabel}
        </Typography>
      </div>

      <ButtonRedirect
        label="My Profile"
        link={`/profile/${userLabel}`}
      />
      <ButtonRedirect
        label="Add Course"
        link="/addcourse"
      />
      <Button color="primary" onClick={handleLogout}>
        LOG OUT
      </Button>
    </div>
  );
};

export default Options;
