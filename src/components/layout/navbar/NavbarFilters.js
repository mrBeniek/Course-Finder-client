import styles from './NavbarFilters.module.scss';
import React, { useState } from 'react';
import { CODING_LANGS } from 'constants.js';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import FormControl from '@material-ui/core/FormControl';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckboxLangs from 'components/addCourse/CheckboxLangs';
import { Button } from '@material-ui/core';

const NavbarFilters = ({
  courseStack,
  setCourseStack,
  ratingRange,
  setRatingRange,
  ageRange,
  setAgeRange,
}) => {
  const [resetStack, setResetStack] = useState(false);

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
    <FormControl
      className={styles.form}
      component={Accordion}
    >
      <AccordionSummary
        className={styles.accordionSummary}
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>FILTERS</Typography>
      </AccordionSummary>

      <AccordionDetails className={styles.accordionDetails}>
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
          {CODING_LANGS.map((val, index) => {
            return (
              <CheckboxLangs
                key={index}
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
      </AccordionDetails>
    </FormControl>
  );
};

export default NavbarFilters;
