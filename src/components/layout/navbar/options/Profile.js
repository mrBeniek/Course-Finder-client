import styles from './Profile.module.scss';
import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const Profile = ({ setLoginState, userLabel }) => {
  const [openMenu, setOpenMenu] = useState(false);

  const anchorRef = useRef(null);

  const history = useHistory();

  const handleToggle = () => {
    setOpenMenu(!openMenu);
  };

  const handleClose = event => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target)
    ) {
      return;
    }

    setOpenMenu(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('expires');
    setLoginState(false);
  };
  return (
    <React.Fragment>
      <div
        className={styles.profileCont}
        aria-controls={
          openMenu ? 'menu-list-grow' : undefined
        }
        ref={anchorRef}
        onClick={handleToggle}
      >
        <Avatar>
          {userLabel && userLabel[0].toUpperCase()}
        </Avatar>
        <Typography
          className={styles.profileLabel}
          variant="body1"
        >
          {userLabel}
        </Typography>
      </div>
      <Popper
        open={openMenu}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom'
                  ? 'center top'
                  : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={openMenu}
                  id="menu-list-grow"
                >
                  <MenuItem
                    onClick={() =>
                      history.push(`/profile/${userLabel}`)
                    }
                  >
                    MY PROFILE
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    LOGOUT
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
};

export default Profile;
