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

  const userLabel =
    localStorage.userInfo &&
    JSON.parse(localStorage.userInfo).username;

  return (
    <React.Fragment>
      {loginState ? (
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
            setLoginState={setLoginState}
            userLabel={userLabel}
            profileQuery={profileQuery}
          />
        </div>
      ) : (
        <ButtonGroup
          color="primary"
          aria-label="outlined primary button group"
        >
          <ButtonRedirect label="Sign Up" link="/signup" />
          <ButtonRedirect label="Login" link="/login" />
        </ButtonGroup>
      )}
    </React.Fragment>
  );
};

export default Options;
