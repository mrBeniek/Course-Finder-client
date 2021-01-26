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
          recommend !== 'yes'
            ? styles.btn
            : styles.btnSelect
        }
        onClick={() => setRecommend('yes')}
        color="primary"
        startIcon={<ThumbUpOutlinedIcon />}
        variant={
          recommend !== 'yes' ? 'outlined' : 'contained'
        }
      >
        Yes
      </Button>
      <Button
        className={
          recommend !== 'neutral'
            ? styles.btn
            : styles.btnSelect
        }
        onClick={() => setRecommend('neutral')}
        variant={
          recommend !== 'neutral' ? 'outlined' : 'contained'
        }
      >
        Neutral
      </Button>
      <Button
        className={
          recommend !== 'no' ? styles.btn : styles.btnSelect
        }
        onClick={() => setRecommend('no')}
        variant={
          recommend !== 'no' ? 'outlined' : 'contained'
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
