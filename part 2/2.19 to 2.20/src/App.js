import axios from "axios";
import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
// import Persons from "./components/Persons";
import personService from "./services/personService";
import Notification from "./components/Notification";
import Notification2 from "./components/Notification2";
import "./index.css";
const App = ({ numbers }) => {
  const [persons, setPersons] = useState(numbers);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessage2, setErrorMessage2] = useState(null);

  console.log(errorMessage);

  const deleteNumber = (id) => {
    const result = window.confirm(
      `delete ${persons.filter((person) => person.id === id)[0].name}?`
    );
    console.log(id);
    const url = `http://localhost:3001/numbers/${id}`;
    const number = persons.find((p) => p.id === id);
    if (result) {
      axios.delete(url, number);
    }
  };
  const addName = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    var i;
    let flag = false;
    for (i = 0; i < persons.length; i++)
      if (persons[i].name === newName) {
        flag = true;
      }
    if (flag) {
      console.log(newName);
      console.log("~~~~~~");
      console.log(persons);
      const person = persons.filter((p) => p.name === newName)[0];
      const result = window.confirm(
        `${person.name} is already added to phonebook, replace the old number with a new one?`
      );
      if (result) {
        console.log("hi from result");
        console.log(person);
        const newPerson = { ...person, number: newNumber };
        console.log(newPerson);
        personService
          .modify(4, newPerson)
          .then((response) => {
            setPersons(
              persons.map((p) => (p.id !== person.id ? p : response.data))
            );

            setErrorMessage(`Modified ${person.name}`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setErrorMessage2(
              `Information for ${person.name} has already been removed from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      } else {
        personService.create(newPerson).then((response) => {
          setPersons(persons.concat(response.data));
          setErrorMessage(`Added ${newPerson.name}`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          setNewName("");
          setNewNumber("");
        });
      }
    }
  };
  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter)
  );
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Notification2 message={errorMessage2} />
      filter shown with
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3> add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {/* <Persons personsToShow={personsToShow} toDelete={deleteNumber} /> */}
      <div>
        {personsToShow.map((person) => (
          <div>
            <p key={person.name}>
              {person.name} {person.number}
            </p>
            <button onClick={() => deleteNumber(person.id)}>delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
