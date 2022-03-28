const Course = ({ course }) => {
  return (
    <div>
      <h2>{course.name}</h2>
      {course.parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
      <p>
        <b>
          total of{" "}
          {course.parts.reduce(
            (partialSum, part) => partialSum + part.exercises,
            0
          )}{" "}
          exercises
        </b>
      </p>
    </div>
  );
};

export default Course;
