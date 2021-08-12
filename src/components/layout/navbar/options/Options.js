import styles from './Options.module.scss';
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Divider from '@material-ui/core/Divider';
import Profile from './Profile';
import Hamburger from './Hamburger';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ButtonRedirect from 'components/common/ButtonRedirect';

const Options = ({ loginState, setLoginState }) => {
  const profileQuery = useMediaQuery('(min-width:1000px)');
  const dividerQuery = useMediaQuery('(min-width:800px)');
  const loginQuery = useMediaQuery('(min-width:500px)');

  const userLabel =
    localStorage.userInfo &&
    JSON.parse(localStorage.userInfo).username;

  return (
    <React.Fragment>
      {!loginState && loginQuery ? (
        <ButtonGroup
          className={styles.buttonGroup}
          variant="contained"
          color="primary"
          aria-label="outlined primary button group"
          disableElevation
        >
          <ButtonRedirect
            className={styles.buttonLogin}
            color="default"
            label="Log in"
            link="/login"
          />
          <ButtonRedirect
            className={styles.buttonSign}
            label="Sign Up"
            link="/signup"
          />
        </ButtonGroup>
      ) : (
        <div className={styles.rightCont}>
          {dividerQuery && (
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              light
            />
          )}

          {profileQuery && (
            <Profile
              setLoginState={setLoginState}
              userLabel={userLabel}
            />
          )}
          <Hamburger
            loginState={loginState}
            setLoginState={setLoginState}
            userLabel={userLabel}
            profileQuery={profileQuery}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default Options;
