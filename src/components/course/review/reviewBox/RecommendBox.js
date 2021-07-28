import styles from './RecommendBox.module.scss';
import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';

const RecommendBox = ({ recommend, setRecommend }) => {
  return (
    <Container className={styles.main}>
      <Typography variant="h6">
        Do you recommend this course?
      </Typography>
      <Button
        className={
          recommend !== 'POSITIVE'
            ? styles.btn
            : styles.btnSelect
        }
        onClick={() => setRecommend('POSITIVE')}
        color="primary"
        startIcon={<ThumbUpOutlinedIcon />}
        variant={
          recommend !== 'POSITIVE'
            ? 'outlined'
            : 'contained'
        }
      >
        Yes
      </Button>
      <Button
        className={
          recommend !== 'NEUTRAL'
            ? styles.btn
            : styles.btnSelect
        }
        onClick={() => setRecommend('NEUTRAL')}
        variant={
          recommend !== 'NEUTRAL' ? 'outlined' : 'contained'
        }
      >
        Neutral
      </Button>
      <Button
        className={
          recommend !== 'NEGATIVE'
            ? styles.btn
            : styles.btnSelect
        }
        onClick={() => setRecommend('NEGATIVE')}
        variant={
          recommend !== 'NEGATIVE'
            ? 'outlined'
            : 'contained'
        }
        color="secondary"
        endIcon={<ThumbDownOutlinedIcon />}
      >
        No
      </Button>
    </Container>
  );
};

export default RecommendBox;
