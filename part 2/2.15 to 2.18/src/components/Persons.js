const Persons = ({ personsToShow, toDelete }) => {
  return (
    <div>
      {personsToShow.map((person) => (
        <div>
          <p key={person.name}>
            {person.name} {person.number}
          </p>
          <button onClick={() => toDelete(person.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
