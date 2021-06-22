import styles from './CourseLogo.module.scss';
import React from 'react';
import Youtube from 'assets/youtube logo.png';
import Udemy from 'assets/udemy-logo.svg';
import Other from 'assets/Other logo.png';

const CourseLogo = ({ logo }) => {
  const LOGO = () => {
    switch (logo) {
      case 'youtube':
        return Youtube;

      case 'udemy':
        return Udemy;

      case 'other':
        return Other;

      default:
        return;
    }
  };

  return (
    <div>
      <img
        className={styles.logo}
        src={LOGO()}
        alt="Course logo"
      />
    </div>
  );
};

export default CourseLogo;
