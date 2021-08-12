import styles from './Hamburger.module.scss';
import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import MenuIcon from '@material-ui/icons/Menu';

const Hamburger = ({
  loginState,
  setLoginState,
  userLabel,
  profileQuery,
}) => {
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
    setLoginState(false);
  };

  return (
    <React.Fragment>
      <MenuIcon
        className={styles.hamburger}
        aria-controls={
          openMenu ? 'menu-list-grow' : undefined
        }
        ref={anchorRef}
        onClick={handleToggle}
      />
      <Popper
        className={styles.popper}
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
            <Paper elevation={5}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={openMenu}
                  id="menu-list-grow"
                >
                  {loginState ? (
                    <div>
                      {!profileQuery && (
                        <MenuItem
                          onClick={() =>
                            history.push(
                              `/profile/${userLabel}`
                            )
                          }
                        >
                          MY PROFILE
                        </MenuItem>
                      )}
                      <MenuItem
                        onClick={() =>
                          history.push('/addcourse')
                        }
                      >
                        ADD COURSE
                      </MenuItem>
                      <MenuItem>REPORT BUG</MenuItem>
                      {!profileQuery && (
                        <MenuItem onClick={handleLogout}>
                          LOGOUT
                        </MenuItem>
                      )}
                    </div>
                  ) : (
                    <React.Fragment>
                      <MenuItem
                        onClick={() =>
                          history.push('/signup')
                        }
                      >
                        SIGN UP
                      </MenuItem>
                      <MenuItem onClick={'/login'}>
                        LOG IN
                      </MenuItem>
                    </React.Fragment>
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
};

export default Hamburger;
