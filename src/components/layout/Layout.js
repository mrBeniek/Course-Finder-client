import styles from './Layout.module.scss';
import React, { useState, useEffect } from 'react';
import SnackbarInfo from 'components/common/SnackbarInfo';
import Navbar from './navbar/Navbar';
import useAsync from 'hooks/useAsync';

const Layout = ({ children, title = false }) => {
  const { asyncRequest, snackbarOpen, status, msg } =
    useAsync();
  const [loginState, setLoginState] = useState(
    localStorage.token && true
  );

  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  useEffect(() => {
    const expires = localStorage.expires;
    if (Date.now() - expires > 0) {
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      localStorage.removeItem('expires');
      setLoginState(false);
    }
  }, []);

  return (
    <div>
      <SnackbarInfo
        open={snackbarOpen}
        msg={msg}
        status={status}
      />

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
