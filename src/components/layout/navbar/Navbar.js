import styles from './Navbar.module.scss';
import logo from 'assets/Course finder logo black.png';
import React from 'react';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import NavbarSearchBar from './NavbarSearchBar';
import Options from './options/Options';

const Navbar = ({ loginState, setLoginState }) => {
  const history = useHistory();
  const searchBarQuery = useMediaQuery('(min-width:900px)');

  return (
    <Container className={styles.container} maxWidth="xl">
      <div className={styles.leftCont}>
        <img
          onClick={() => history.push('/home')}
          className={styles.logo}
          src={logo}
          alt="Course Finder Logo"
        />

        {searchBarQuery ? (
          <NavbarSearchBar className={styles.search} />
        ) : (
          <Options
            loginState={loginState}
            setLoginState={setLoginState}
          />
        )}
      </div>
      {searchBarQuery ? (
        <Options
          loginState={loginState}
          setLoginState={setLoginState}
        />
      ) : (
        <NavbarSearchBar className={styles.search} />
      )}
    </Container>
  );
};

export default Navbar;
