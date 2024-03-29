import styles from './ReviewList.module.scss';
import devCheck from 'utils/devCheck';
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
  loginState,
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
      const count = !pageCount ? true : false;

      const author =
        loginState &&
        JSON.parse(localStorage.userInfo).username;

      const { ok, data } = await asyncRequest(
        axios.get(
          `${devCheck}/api/download/reviews/${id}/page/${currentPage}/count/${count}/author/${author}`
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
  }, [currentPage, id]);

  const handlePage = (e, value) => {
    setCurrentPage(value);
  };

  return (
    <Container className={styles.container}>
      {loading ? (
        <Typography
          className={styles.typographyReviews}
          align="center"
          variant="h6"
        >
          {loading}
        </Typography>
      ) : (
        <React.Fragment>
          <Typography
            className={styles.typographyReviews}
            variant="h4"
          >
            REVIEWS:
          </Typography>

          {reviews.map(val => {
            return (
              <Container
                className={styles.containerReview}
                maxWidth="md"
                key={val._id}
              >
                <div className={styles.nameCont}>
                  <div>
                    <Typography variant="h6">
                      <Link
                        className={styles.author}
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

                <hr />

                <Typography
                  className={styles.singleReview}
                  paragraph
                >
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
