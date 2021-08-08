import styles from './Options.module.scss';
import React from 'react';

import Divider from '@material-ui/core/Divider';
import Profile from './Profile';

const Options = ({ loginState, setLoginState }) => {
  return (
    <div className={styles.rightCont}>
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        light
      />
      <Profile setLoginState={setLoginState} />
    </div>
  );
};

export default Options;
