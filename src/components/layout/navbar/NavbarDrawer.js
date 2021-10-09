import styles from './NavbarDrawer.module.scss';
import React, { useState } from 'react';
import SwipeableDrawer from '@material-ui/core/Drawer';
import { Button } from '@material-ui/core';
import { CODING_LANGS } from 'constants.js';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import CheckboxLangs from 'components/addCourse/CheckboxLangs';

const NavbarDrawer = ({
  courseStack,
  setCourseStack,
  ratingRange,
  setRatingRange,
  ageRange,
  setAgeRange,
}) => {
  const [open, setOpen] = useState(false);
  const [resetStack, setResetStack] = useState(false);

  const toggleDrawer = open => event => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpen(open);
  };

  const handleRatingChange = (event, newValue) => {
    setRatingRange(newValue);
  };

  const handleAgeChange = (event, newValue) => {
    setAgeRange(newValue);
  };

  const handleReset = () => {
    setCourseStack([]);
    setResetStack(true);
    setRatingRange([0, 100]);
    setAgeRange([90, 1460]);
  };

  const AGE_MARKS = [
    { value: 1460 },
    { value: 1095, label: '1m' },
    { value: 730, label: '3m' },
    { value: 364, label: '6m' },
    { value: 180, label: '1y' },
    { value: 90, label: '2y' },
    { value: 0, label: '3y+' },
  ];

  return (
    <div>
      <Button
        className={styles.openButton}
        onClick={toggleDrawer(true)}
      >
        FILTERS
      </Button>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <div
          className={styles.drawer}
          onKeyDown={toggleDrawer(false)}
        >
          <div className={styles.resetCont}>
            <Typography variant="h6">TECH STACK</Typography>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={handleReset}
            >
              RESET FILTERS
            </Button>
          </div>

          <div className={styles.techStack}>
            {CODING_LANGS.map(val => {
              return (
                <CheckboxLangs
                  key={val}
                  label={val}
                  courseStack={courseStack}
                  setCourseStack={setCourseStack}
                  resetStack={resetStack}
                  setResetStack={setResetStack}
                />
              );
            })}
          </div>
          <br />

          <Typography variant="h6">RATING RANGE</Typography>
          <Slider
            value={ratingRange}
            onChange={handleRatingChange}
            valueLabelDisplay="auto"
            aria-labelledby="rating-slider"
          />
          <br />
          <Typography variant="h6">AGE RANGE</Typography>
          <Slider
            value={ageRange}
            onChange={handleAgeChange}
            valueLabelDisplay="auto"
            aria-labelledby="age-slider"
            step={null}
            max={1460}
            marks={AGE_MARKS}
          />
        </div>
      </SwipeableDrawer>
    </div>
  );
};

export default NavbarDrawer;
