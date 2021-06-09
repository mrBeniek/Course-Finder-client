import styles from './Main.module.scss';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Pagination } from '@material-ui/lab';

const Main = ({ asyncRequest }) => {
  const [courses, setCourses] = useState([]);
  const [pageCount, setPageCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  let { page } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await asyncRequest(
          axios.get(`/api/download/courses/${page}`),
          false
        );
        console.log(data.result);
        setCourses(data.result);
        setPageCount(data.pageCount);
        if (page) setCurrentPage(page);
      } catch (err) {
        console.error(err);
        setTimeout(() => fetchCourses(), 5000);
      }
    };

    fetchCourses();
  }, [page]);

  const handlePage = (e, value) => {
    history.push(`/home/page/${value}`);
  };

  return (
    <div className={styles.main}>
      {courses.map((val, index) => {
        return (
          <Container
            className={styles.container}
            maxWidth="lg"
            key={index}
            onClick={() =>
              history.push(`/course/${val._id}`)
            }
          >
            <Typography variant="h4">{val.name}</Typography>
            <hr />
            <Typography paragraph>
              {val.description}
            </Typography>
          </Container>
        );
      })}
      <Pagination
        className={styles.pagination}
        onChange={handlePage}
        size="large"
        page={currentPage}
        count={pageCount}
      />
    </div>
  );
};

export default Main;
