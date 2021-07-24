import styles from './NavbarSearchBar.module.scss';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import ButtonRedirect from 'components/common/ButtonRedirect';
import { Container } from '@material-ui/core';
import NavbarFilters from './NavbarFilters';
import { ageConvert } from 'utils/ageConvert';

const NavbarSearchBar = ({ ...props }) => {
  const [searchValue, setSearchValue] = useState('');
  const [courseStack, setCourseStack] = useState([]);
  const [ratingRange, setRatingRange] = useState([0, 100]);
  const [ageRange, setAgeRange] = useState([90, 1460]);

  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);

  const handleChange = state => event => {
    state(event.target.value);
  };

  const handleSearch = () => {
    if (!searchValue && !courseStack) return;

    let uri = `/search/page/1?s=y&`;
    if (searchValue) {
      uri = uri.concat('', `name=${searchValue}&`);
    }

    if (courseStack) {
      courseStack.forEach(val => {
        uri = uri.concat('', `stack=${val}&`);
      });
    }

    if (ratingRange[0] || ratingRange[1] !== 100) {
      const low = ratingRange[0] - 1;
      const high = ratingRange[1] + 1;

      uri = uri.concat(
        '',
        `rating_low=${low}&rating_high=${high}&`
      );
    }

    if (query.get('sort')) {
      const sort = query.get('sort');
      uri = uri.concat('', `sort=${sort}&`);
    }

    const age_low = ageConvert(ageRange[0]);
    const age_high = ageConvert(ageRange[1]);
    uri = uri.concat(
      '',
      `age_low=${age_low}&age_high=${age_high}&`
    );

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
        ratingRange={ratingRange}
        setRatingRange={setRatingRange}
        ageRange={ageRange}
        setAgeRange={setAgeRange}
      />
    </Container>
  );
};

export default NavbarSearchBar;
