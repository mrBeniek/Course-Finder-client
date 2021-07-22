import styles from './ReviewList.module.scss';
import Recommend from './Recommend';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { Pagination } from '@material-ui/lab';

const ReviewList = ({
  id,
  asyncRequest,
  reviews,
  setReviews,
  setOwnReview,
}) => {
  const [loading, setLoading] = useState(
    'Loading reviews...'
  );
  const [pageCount, setPageCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const history = useHistory();

  useEffect(() => {
    const fetchReviews = async () => {
      let count = false;
      if (!pageCount) {
        count = true;
      }

      const author = JSON.parse(
        localStorage.userInfo
      ).username;

      const { ok, data } = await asyncRequest(
        axios.get(
          `/api/download/reviews/${id}/page/${currentPage}/count/${count}/author/${author}`
        ),
        false
      );
      if (ok) {
        console.log(data.result);
        setReviews(data.result);
        setOwnReview(data.ownReview);
        if (data.pageCount) setPageCount(data.pageCount);
        if (data.result.length > 0) {
          setLoading(false);
        } else {
          setLoading('No reviews yet!');
        }
      }
    };
    if (id.length === 24) fetchReviews();
  }, [currentPage]);

  const handlePage = (e, value) => {
    setCurrentPage(value);
  };

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
                      <Link
                        href=""
                        onClick={() =>
                          history.push(
                            `/profile/${val.author}`
                          )
                        }
                      >
                        {val.author}
                      </Link>
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
          {pageCount > 1 && (
            <Pagination
              className={styles.pagination}
              onChange={handlePage}
              size="large"
              page={currentPage}
              count={pageCount}
            />
          )}
        </React.Fragment>
      )}
    </Container>
  );
};

export default ReviewList;
