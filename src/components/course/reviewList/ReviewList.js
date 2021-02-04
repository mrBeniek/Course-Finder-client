import styles from './ReviewList.module.scss';
import Recommend from './Recommend';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';

const ReviewList = ({ id, asyncRequest }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(
    'Loading reviews...'
  );

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await asyncRequest(
        axios.get(`/api/download/reviews/${id}`),
        false
      );
      if (data !== 'err') {
        console.log(data.result);
        setReviews(data.result);
        if (data.result.length > 1) {
          setLoading(false);
        } else {
          setLoading('No reviews yet!');
        }
      }
    };

    fetchReviews();
  }, [id]);

  return (
    <Container>
      {loading ? (
        <Typography align="center" variant="h6">
          {loading}
        </Typography>
      ) : (
        <React.Fragment>
          <Typography variant="h4">REVIEWS:</Typography>
          <br />
          <br />
          {reviews.map((val, index) => {
            return (
              <Container
                className={styles.container}
                maxWidth="md"
                key={index}
              >
                <div className={styles.nameCont}>
                  <div>
                    <Typography variant="h6">
                      {val.author}
                    </Typography>
                    <Typography>{val.date}</Typography>
                  </div>
                  <Recommend recommend={val.recommend} />
                </div>

                <br />
                <hr />
                <br />

                <Typography paragraph>
                  {val.review}
                </Typography>
              </Container>
            );
          })}
        </React.Fragment>
      )}
    </Container>
  );
};

export default ReviewList;
