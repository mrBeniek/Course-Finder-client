import styles from './Recommend.module.scss';
import React from 'react';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';

const Recommend = ({ recommend }) => {
  const BG_COLOR = {
    NEUTRAL: null,
    POSITIVE: '#52b202',
    NEGATIVE: '#aa2e25',
  };

  return (
    <Paper
      className={styles.recommend}
      style={{
        background: BG_COLOR[recommend],
        fontSize: '0.5em',
      }}
      elevation={3}
    >
      {recommend === 'POSITIVE' ? (
        <ThumbUpOutlinedIcon className={styles.icon} />
      ) : recommend === 'NEGATIVE' ? (
        <ThumbDownOutlinedIcon className={styles.icon} />
      ) : null}

      <Typography className={styles.typography}>
        {recommend}
      </Typography>
    </Paper>
  );
};

export default Recommend;
