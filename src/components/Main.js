import styles from './Main.module.scss';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const Main = () => {
  const [courses, setCourses] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get(
          '/api/download/courses'
        );
        console.log(data.result);
        setCourses(data.result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className={styles.main}>
      {courses.map((val, index) => {
        return (
          <Container
            className={styles.container}
            maxWidth="lg"
            key={index}
            onClick={() =>
              history.push(`/course/${val.name}`)
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

      <Typography paragraph></Typography>
    </div>
  );
};

export default Main;
