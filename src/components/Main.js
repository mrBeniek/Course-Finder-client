import styles from './Main.module.scss';
import React, {
  useState,
  useEffect,
  Fragment,
} from 'react';
import {
  useHistory,
  useParams,
  useLocation,
} from 'react-router-dom';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Pagination } from '@material-ui/lab';
import SkeletonCourses from './common/SkeletonCourses';
import CourseLogo from './common/CourseLogo';
import TagsStack from './common/TagsStack';
import CourseRating from './common/CourseRating';
import Grow from '@material-ui/core/Grow';

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
        // let response;
        // if (query.get('s')) {
        //   const name = query.get('name');
        //   response = await asyncRequest(
        //     axios.get(
        //       `/api/download/search/${page}?name=${name}`
        //     ),
        //     false
        //   );
        // } else {
        //   response = await asyncRequest(
        //     axios.get(`/api/download/courses/${page}`),
        //     false
        //   );
        // }
        // const { data } = response;
        const { data } = await asyncRequest(
          axios.get(
            `/api/download/courses/${page}?${queryString}`
          ),
          false
        );
        console.log(data.result);
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
    if (query.get('s')) {
      history.push(`/search/page/${value}?${queryString}`);
    } else history.push(`/home/page/${value}`);
  };

  const DELAY = [
    0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500,
  ];

  return (
    <div className={styles.main}>
      {courses.map((val, index) => {
        return (
          <Grow in={!loading} timeout={DELAY[index]}>
            <Container
              className={styles.container}
              maxWidth="lg"
              key={index}
              onClick={() => {
                if (!loading)
                  history.push(`/course/${val._id}`);
              }}
            >
              {loading ? (
                <SkeletonCourses />
              ) : (
                <Fragment>
                  <div className={styles.containerInfo}>
                    <div>
                      <div className={styles.containerName}>
                        <CourseRating
                          reviews={val.reviews}
                        />
                        <Typography variant="h4">
                          {val.name}
                        </Typography>
                      </div>

                      <div className={styles.tags}>
                        {val.stack.map(val => {
                          return <TagsStack label={val} />;
                        })}
                      </div>
                    </div>

                    <CourseLogo logo={val.source} />
                  </div>

                  <hr />
                  <Typography paragraph>
                    {val.description}
                  </Typography>
                </Fragment>
              )}
            </Container>
          </Grow>
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
    </div>
  );
};

export default Main;
