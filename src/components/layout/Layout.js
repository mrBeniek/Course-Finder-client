import styles from './Layout.module.scss';
import React, { useState, useEffect } from 'react';
import SnackbarInfo from 'components/common/SnackbarInfo';
import Navbar from './Navbar';
// import Sidebar from './Sidebar';
import useAsync from 'hooks/useAsync';

const Layout = ({ children, title = false }) => {
  const { asyncRequest, status, msg } = useAsync();
  const [loginState, setLoginState] = useState(false);

  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  useEffect(() => {
    if (localStorage.token) setLoginState(true);
    else setLoginState(false);
  }, [loginState]);

  return (
    <div>
      <SnackbarInfo msg={msg} status={status} />
      <Navbar
        loginState={loginState}
        setLoginState={setLoginState}
      />
      <div className={styles.main}>
        <div className={styles.centerCont}>
          {React.cloneElement(children, {
            asyncRequest: asyncRequest,
            loginState,
          })}
        </div>
      </div>
    </div>
  );
};

export default Layout;
