import styles from './Navbar.module.scss';
import logo from 'assets/Course finder logo black.png';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';

import ButtonGroup from '@material-ui/core/ButtonGroup';

import ButtonRedirect from 'components/common/ButtonRedirect';
import NavbarSearchBar from './NavbarSearchBar';
import Options from './Options';

const Navbar = ({ loginState, setLoginState }) => {
  const history = useHistory();

  return (
    <Container className={styles.container} maxWidth="xl">
      <div className={styles.leftCont}>
        <img
          onClick={() => history.push('/home')}
          className={styles.logo}
          src={logo}
          alt="asdf"
        />
        <NavbarSearchBar className={styles.search} />
      </div>

      {loginState ? (
        <Options setLoginState={setLoginState} />
      ) : (
        <ButtonGroup
          color="primary"
          aria-label="outlined primary button group"
        >
          <ButtonRedirect label="Sign Up" link="/signup" />
          <ButtonRedirect label="Login" link="/login" />
        </ButtonGroup>
      )}
    </Container>
  );
};

export default Navbar;
