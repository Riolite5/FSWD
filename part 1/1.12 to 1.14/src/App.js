import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handler}>{props.text}</button>;
};

const Header = (props) => {
  return <h2>{props.text}</h2>;
};
const App = () => {
  const anecdotes = [
    "if it hurts, do it more often",
    "adding manpower to a late software project makes it later!",
    "the first 90 percent of the code accounts for the first 10 percent of the development time..the remaining 10 percent of the code accounts for the other 90 percent of the development time",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];
  const getrandomint = () => {
    const randint = Math.floor(Math.random() * 7);
    console.log(randint);
    return randint;
  };
  const [points, setPoints] = useState(new Array(7).fill(0));
  const [x, setX] = useState(getrandomint());

  const vote = (points, x) => {
    console.log(points);
    const copy = [...points];

    console.log(copy);
    copy[x] += 1;
    console.log(copy);
    setPoints(copy);
  };
  const max = Math.max(...points);

  const index = points.indexOf(max);

  console.log(index);
  return (
    <div>
      <Header text="Anecdote of the day" />
      {anecdotes[x]} <br />
      has {points[x]}
      <br />
      <Button handler={() => vote(points, x)} text="vote" />
      <Button handler={() => setX(getrandomint())} text="next anecdote" />
      <Header text="Anecdote with the most votes" />
      {anecdotes[index]}
    </div>
  );
};

export default App;
