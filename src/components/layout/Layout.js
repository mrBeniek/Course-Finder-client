import styles from './Layout.module.scss';
import React, { useEffect } from 'react';
import SnackbarInfo from 'components/common/SnackbarInfo';
import Navbar from './Navbar';
// import Sidebar from './Sidebar';
import useAsync from 'hooks/useAsync';

const Layout = ({ children, title = false }) => {
  const { asyncRequest, status, msg } = useAsync();

  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  return (
    <div>
      <SnackbarInfo msg={msg} status={status} />
      <Navbar />
      <div className={styles.main}>
        <div className={styles.centerCont}>
          {React.cloneElement(children, {
            asyncRequest: asyncRequest,
          })}
        </div>
      </div>
    </div>
  );
};

export default Layout;
