import styles from './Sort.module.scss';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const Sort = ({ query }) => {
  const [sort, setSort] = useState('datea');

  const history = useHistory();

  const handleSortChange = state => event => {
    state(event.target.value);
    query.set('sort', event.target.value);
    query.toString();
    if (query.get('s')) {
      history.push(`/search/page/1?${query}`);
    } else history.push(`/search/page/1?s=y&${query}`);
  };

  return (
    <div className={styles.sortCont}>
      <FormControl
        className={styles.formSort}
        margin="normal"
        size="small"
        variant="filled"
      >
        <InputLabel id="course-source-label">
          SORT BY
        </InputLabel>
        <Select
          labelId="course-source-label"
          id="course-source-select"
          value={sort}
          variant="filled"
          onChange={handleSortChange(setSort)}
        >
          <MenuItem value={'datea'}>
            Date created: ascending
          </MenuItem>
          <MenuItem value={'dated'}>
            Date created: descending
          </MenuItem>
          <MenuItem value={'ratinga'}>
            Rating: ascending
          </MenuItem>
          <MenuItem value={'ratingd'}>
            Rating: descending
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Sort;
