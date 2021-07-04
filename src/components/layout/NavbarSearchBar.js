import styles from './NavbarSearchBar.module.scss';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import ButtonRedirect from 'components/common/ButtonRedirect';
import { Container } from '@material-ui/core';
import NavbarFilters from './NavbarFilters';

const NavbarSearchBar = ({ ...props }) => {
  const [searchValue, setSearchValue] = useState('');
  const [courseStack, setCourseStack] = useState([]);

  const history = useHistory();

  const handleChange = state => event => {
    state(event.target.value);
  };

  const handleSearch = () => {
    if (!searchValue) return;

    let uri = `/search/page/1?`;
    if (searchValue) {
      uri = uri.concat('', `name=${searchValue}&`);
    }

    history.push(uri);
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Container className={styles.container}>
      <Container className={styles.containerSearch}>
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
        <ButtonRedirect
          className={styles.button}
          label="Search"
          onClick={handleSearch}
          variant="contained"
          color="primary"
        />
      </Container>
      <NavbarFilters
        courseStack={courseStack}
        setCourseStack={setCourseStack}
      />
    </Container>
  );
};

export default NavbarSearchBar;
