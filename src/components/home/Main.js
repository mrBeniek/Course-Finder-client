import styles from './Main.module.scss';
import devCheck from 'utils/devCheck';
import React, { useState, useEffect } from 'react';
import {
  useHistory,
  useParams,
  useLocation,
} from 'react-router-dom';
import axios from 'axios';
import { Pagination } from '@material-ui/lab';
import Sort from './Sort';
import CoursesList from './CoursesList';
import OpeningModal from 'components/common/OpeningModal';

const Main = ({ asyncRequest }) => {
  const [courses, setCourses] = useState([1, 2, 3, 4, 5]);
  const [pageCount, setPageCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  let { page } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const queryString = query.toString();
  const history = useHistory();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await asyncRequest(
          axios.get(
            `${devCheck}/api/download/courses/${page}?${queryString}`,
            {
              proxy: {
                protocol: 'https',
                host: 'server.tomaszkarpeta.pl',
                port: 443,
              },
            }
          ),
          false
        );
        setCourses(data.result);
        setPageCount(data.pageCount);
        setLoading(false);
        if (page) setCurrentPage(page);
      } catch (err) {
        console.error(err);
        setTimeout(() => fetchCourses(), 5000);
      }
    };
    fetchCourses();
  }, [page, queryString]);

  const handlePage = (e, value) => {
    console.log(queryString);
    if (query.get('s')) {
      history.push(`/search/page/${value}?${queryString}`);
    } else history.push(`/home/page/${value}`);
  };

  return (
    <div className={styles.main}>
      <Sort query={query} />
      <OpeningModal />
      <CoursesList courses={courses} loading={loading} />
      {pageCount > 1 && (
        <Pagination
          className={styles.pagination}
          onChange={handlePage}
          size="large"
          page={currentPage}
          count={pageCount}
        />
      )}
    </div>
  );
};

export default Main;
