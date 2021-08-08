import styles from './Options.module.scss';
import React from 'react';
import Divider from '@material-ui/core/Divider';
import Profile from './Profile';
import Hamburger from './Hamburger';

const Options = ({ loginState, setLoginState }) => {
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
      <Profile
        setLoginState={setLoginState}
        userLabel={userLabel}
      />
      <Hamburger
        setLoginState={setLoginState}
        userLabel={userLabel}
      />
    </div>
  );
};

export default Options;
