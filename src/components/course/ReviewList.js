import styles from './ReviewList.module.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';

const ReviewList = ({ id }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(
          `/api/download/reviews/${id}`
        );
        console.log(data.result);
        setReviews(data.result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchReviews();
  }, []);

  return (
    <Container>
      {reviews.map((val, index) => {
        return (
          <Container
            className={styles.container}
            maxWidth="md"
            key={index}
          >
            <div>
              <Typography>{val.author}</Typography>
              <Typography>{val.date}</Typography>
            </div>

            <br />
            <br />
            <Typography>{val.recommend}</Typography>
            <br />
            <br />
            <Typography paragraph>{val.review}</Typography>
          </Container>
        );
      })}
    </Container>
  );
};

export default ReviewList;
