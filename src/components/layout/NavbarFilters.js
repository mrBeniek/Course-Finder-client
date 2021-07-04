import styles from './NavbarFilters.module.scss';
import React from 'react';
import { CODING_LANGS } from 'constants.js';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckboxLangs from 'components/addCourse/CheckboxLangs';

const NavbarFilters = ({ courseStack, setCourseStack }) => {
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
        {CODING_LANGS.map(val => {
          return (
            <CheckboxLangs
              label={val}
              courseStack={courseStack}
              setCourseStack={setCourseStack}
            />
          );
        })}
      </AccordionDetails>
    </FormControl>
  );
};

export default NavbarFilters;
