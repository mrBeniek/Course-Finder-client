import styles from './TagsStack.module.scss';
import React from 'react';
import Button from '@material-ui/core/Button';

const TagsStack = ({ label }) => {
  return (
    <Button
      className={styles.button}
      size="small"
      variant="contained"
      disableFocusRipple
    >
      {label}
    </Button>
  );
};

export default TagsStack;
