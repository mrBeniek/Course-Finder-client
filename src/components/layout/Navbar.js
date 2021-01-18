import styles from './Navbar.module.scss';
import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ButtonRedirect from 'components/common/ButtonRedirect';

const Navbar = () => {
  const [loginState, setLoginState] = useState(false);

  useEffect(() => {
    if (localStorage.token) setLoginState(true);
    else setLoginState(false);
  }, [loginState]);

  const handleAdd = () => {};

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    setLoginState(false);
  };

  const userLabel =
    localStorage.userInfo &&
    JSON.parse(localStorage.userInfo).username;

  return (
    <Container className={styles.container} maxWidth="xl">
      <div className={styles.leftCont}>
        <Typography variant="h3">COURSE FINDER</Typography>
        <Button onClick={handleAdd}>ADD COURSE</Button>
      </div>

      {loginState ? (
        <div>
          <div>Logged in as: {userLabel}</div>
          <Button color="primary" onClick={handleLogout}>
            LOG OUT
          </Button>
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
    </Container>
  );
};

export default Navbar;
