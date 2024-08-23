import React from 'react';

const CourseSelector = ({ courses, selectedCourse, onCourseChange }) => {
  return (
    <div>
      <label htmlFor="course-select">Select a Course: </label>
      <select id="course-select" value={selectedCourse} onChange={onCourseChange}>
        <option value="">-- Select a Course --</option>
        {courses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CourseSelector;
