import styles from './CheckboxLangs.module.scss';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

const CheckboxLangs = ({
  label,
  courseStack,
  setCourseStack,
}) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    let newStack = [...courseStack];
    if (!active) {
      newStack.push(label);
      setCourseStack();
    } else {
      const index = courseStack.indexOf(label);
      newStack.splice(index, 1);
    }

    setCourseStack(newStack);
    setActive(!active);
  };
  return (
    <Button
      className={styles.button}
      color="primary"
      variant={!active ? 'outlined' : 'contained'}
      onClick={handleClick}
    >
      {label}
    </Button>
  );
};

export default CheckboxLangs;
