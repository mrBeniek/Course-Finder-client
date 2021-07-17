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
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const Main = ({ asyncRequest }) => {
  const [courses, setCourses] = useState([1, 2, 3, 4, 5]);
  const [pageCount, setPageCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState('datea');
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
        // console.log(data.result);
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

  const handleSortChange = state => event => {
    state(event.target.value);
    query.set('sort', event.target.value);
    query.toString();
    if (query.get('s')) {
      history.push(`/search/page/1?${query}`);
    } else history.push(`/search/page/1?s=y&${query}`);
  };

  const dateConverter = value => {
    const today = Date.now();
    const creationDate = Date.parse(value);
    const days = Math.floor(
      (today - creationDate) / 8.64e7
    );
    let result = '';

    switch (true) {
      case days === 0:
        result = 'NEW';
        break;
      case days > 0 && days < 61:
        result = days + 'd';
        break;
      case days >= 61 && days < 365:
        result = Math.floor(days / 30) + 'm';
        break;
      case days >= 365 && days < 730:
        result = '1y+';
        break;
      case days >= 730 && days < 1095:
        result = '2y+';
        break;
      case days >= 1095:
        result = '3y+';
        break;
      default:
        break;
    }

    return result;
  };

  const DELAY = [
    0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500,
  ];

  return (
    <div className={styles.main}>
      <div className={styles.sortCont}>
        <FormControl
          className={styles.formSort}
          margin="normal"
          size="small"
          variant="filled"
        >
          <InputLabel id="course-source-label">
            SORT BY
          </InputLabel>
          <Select
            labelId="course-source-label"
            id="course-source-select"
            value={sort}
            variant="filled"
            onChange={handleSortChange(setSort)}
          >
            <MenuItem value={'datea'}>
              Date created: ascending
            </MenuItem>
            <MenuItem value={'dated'}>
              Date created: descending
            </MenuItem>
            <MenuItem value={'ratinga'}>
              Rating: ascending
            </MenuItem>
            <MenuItem value={'ratingd'}>
              Rating: descending
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      {courses.map((val, index) => {
        return (
          <Grow
            in={!loading}
            timeout={DELAY[index]}
            key={index}
          >
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
                        {val.stack.map((val, index) => {
                          return (
                            <TagsStack
                              label={val}
                              key={index}
                            />
                          );
                        })}
                      </div>
                    </div>

                    <CourseLogo logo={val.source} />
                  </div>

                  <hr />
                  <div className={styles.bottomCont}>
                    <Typography paragraph>
                      {val.description}
                    </Typography>
                    <div>
                      <Typography variant="subtitle2">
                        age:
                      </Typography>
                      <Typography variant="subtitle2">
                        {dateConverter(val.date)}
                      </Typography>
                    </div>
                  </div>
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
