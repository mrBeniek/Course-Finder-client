import styles from './Main.module.scss';
import React, {
  useState,
  useEffect,
  Fragment,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Pagination } from '@material-ui/lab';
import SkeletonCourses from './common/SkeletonCourses';
import CourseLogo from './common/CourseLogo';
import TagsStack from './common/TagsStack';
import CourseRating from './common/CourseRating';

const Main = ({ asyncRequest }) => {
  const [courses, setCourses] = useState([1, 2, 3, 4, 5]);
  const [pageCount, setPageCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
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
                      <CourseRating reviews={val.reviews} />
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
        );
      })}
      {!loading && (
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
