import styles from './Layout.module.scss';
import React from 'react';
import Navbar from './Navbar';
// import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className={styles.main}>
        <div className={styles.centerCont}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
