import { useState } from "react";

const Header = (props) => <h1>{props.text}</h1>;

const Button = (props) => <button onClick={props.handler}>{props.text}</button>;

const StatisticLine = ({ text, num }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{num}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad, all }) => {
  if (all === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" num={good} />

          <StatisticLine text="neutral" num={neutral} />

          <StatisticLine text="bad" num={bad} />

          <StatisticLine text="all" num={all} />

          <StatisticLine text="average" num={(good - bad) / all} />

          <StatisticLine text="positive" num={(good / all) * 100} />
        </tbody>
      </table>
    </div>
  );
};
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + neutral + bad;
  return (
    <div>
      <Header text="give feedback" />
      <Button handler={() => setGood(good + 1)} text="good" />
      <Button handler={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handler={() => setBad(bad + 1)} text="bad" />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  );
};

export default App;
