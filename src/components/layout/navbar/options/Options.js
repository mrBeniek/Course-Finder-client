import styles from './Options.module.scss';
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Divider from '@material-ui/core/Divider';
import Profile from './Profile';
import Hamburger from './Hamburger';

const Options = ({ loginState, setLoginState }) => {
  const profileQuery = useMediaQuery('(min-width:1000px)');

  const userLabel =
    localStorage.userInfo &&
    JSON.parse(localStorage.userInfo).username;

  return (
    <div className={styles.rightCont}>
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        light
      />
      {profileQuery && (
        <Profile
          setLoginState={setLoginState}
          userLabel={userLabel}
        />
      )}
      <Hamburger
        setLoginState={setLoginState}
        userLabel={userLabel}
        profileQuery={profileQuery}
      />
    </div>
  );
};

export default Options;
