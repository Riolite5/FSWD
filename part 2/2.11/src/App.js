import { useState, useEffect } from "react";
import axios from "axios";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  const hook = () => {
    console.log("hook invoked");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fullfilled");
      setPersons(response.data);
    });
  };
  useEffect(hook, []);
  return (
    <div>
      {persons.map((person) => (
        <p key={person.id}>{person.name}</p>
      ))}
    </div>
  );
};
export default App;
