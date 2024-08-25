import React from 'react';
import './CourseSelector.css';



const CourseSelector = ({ courses, selectedCourse, onCourseChange }) => {
  return (
    <select
      value={selectedCourse}
      onChange={onCourseChange} //e.target.value -> course.id
      disabled={courses.every(course => course.disabled)}
    >
      <option value="" disabled>Select a course</option>
      {courses.map(course => (
        <option
          key={course.id}
          value={course.id}
          disabled={course.disabled}
        >
          {course.title}
        </option>
      ))}
    </select>
  );
};

export default CourseSelector;

