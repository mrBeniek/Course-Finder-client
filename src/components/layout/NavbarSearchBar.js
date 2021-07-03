import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

const NavbarSearchBar = ({ ...props }) => {
  const [searchValue, setSearchValue] = useState('');

  const history = useHistory();

  const handleChange = state => event => {
    state(event.target.value);
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      history.push(`/search/page/1?name=${searchValue}`);
    }
  };

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
        value={searchValue}
        onChange={handleChange(setSearchValue)}
        onKeyPress={handleKeyPress}
        placeholder="Search..."
        margin="normal"
        autoFocus
        {...props}
      />
    </React.Fragment>
  );
};

export default NavbarSearchBar;
