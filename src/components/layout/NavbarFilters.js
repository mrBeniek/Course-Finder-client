import styles from './NavbarFilters.module.scss';
import React from 'react';
import { CODING_LANGS } from 'constants.js';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import FormControl from '@material-ui/core/FormControl';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckboxLangs from 'components/addCourse/CheckboxLangs';

const NavbarFilters = ({
  courseStack,
  setCourseStack,
  ratingRange,
  setRatingRange,
}) => {
  const handleRatingChange = (event, newValue) => {
    setRatingRange(newValue);
  };
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
        <Typography variant="h6">TECH STACK</Typography>
        <div className={styles.techStack}>
          {CODING_LANGS.map((val, index) => {
            return (
              <CheckboxLangs
                key={index}
                label={val}
                courseStack={courseStack}
                setCourseStack={setCourseStack}
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
          aria-labelledby="range-slider"
        />
      </AccordionDetails>
    </FormControl>
  );
};

export default NavbarFilters;
