import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

const NavbarSearchBar = ({ ...props }) => {
  return (
    <React.Fragment>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        placeholder="Search..."
        margin="normal"
        autoFocus
        {...props}
      />
    </React.Fragment>
  );
};

export default NavbarSearchBar;
