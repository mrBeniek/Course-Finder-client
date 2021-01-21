import styles from './Layout.module.scss';
import React from 'react';
import SnackbarInfo from 'components/common/SnackbarInfo';
import Navbar from './Navbar';
// import Sidebar from './Sidebar';
import useAsync from 'hooks/useAsync';

const Layout = ({ children }) => {
  const { asyncRequest, status, msg } = useAsync();

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
