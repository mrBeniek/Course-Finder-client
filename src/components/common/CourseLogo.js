import styles from './CourseLogo.module.scss';
import React from 'react';
import Youtube from 'assets/youtube logo.png';
import Udemy from 'assets/udemy-logo.svg';

const CourseLogo = ({ logo }) => {
  const LOGO = () => {
    switch (logo) {
      case 'youtube':
        return Youtube;

      case 'udemy':
        return Udemy;

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
