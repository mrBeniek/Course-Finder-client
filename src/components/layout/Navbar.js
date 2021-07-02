import styles from './Navbar.module.scss';
import logo from 'assets/Course finder logo black.png';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Avatar from '@material-ui/core/Avatar';
import ButtonRedirect from 'components/common/ButtonRedirect';
import NavbarSearchBar from './NavbarSearchBar';
import Divider from '@material-ui/core/Divider';

const Navbar = ({ loginState, setLoginState }) => {
  const history = useHistory();

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
        <img
          onClick={() => history.push('/home')}
          className={styles.logo}
          src={logo}
          alt="asdf"
        />
        <NavbarSearchBar className={styles.search} />
      </div>

      {loginState ? (
        <div className={styles.rightCont}>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            light
          />

          <ButtonRedirect
            label="Add Course"
            link="/addcourse"
          />
          <div
            onClick={() =>
              history.push(`/profile/${userLabel}`)
            }
            className={styles.profileCont}
          >
            <Avatar>{userLabel[0].toUpperCase()}</Avatar>
            <Typography
              className={styles.profileLabel}
              component="p1"
              variant="body1"
            >
              {userLabel}
            </Typography>
          </div>

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
