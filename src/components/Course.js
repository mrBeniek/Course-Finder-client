import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Course = () => {
  const [course, setCourse] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(
          `/api/download/courses/${id}`
        );
        console.log(data.result);
        setCourse(data.result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourse();
  }, [id]);

  return (
    <div>
      <h3>ID: {id}</h3>
      <div>{course.name}</div>
      <div>LINK: {course.link}</div>
      <div>DESCRIPTION: {course.description}</div>
    </div>
  );
};

export default Course;
