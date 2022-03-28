import { useState, useEffect } from "react";
import axios from "axios";
import Persons from "./components/Persons";

const WeatherInfo = ({ weather }) => {
  console.log(weather);
  return (
    <div>
      <p>
        temperature {Math.round(parseFloat(weather.main.temp) - 273.15)} Celcius
      </p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
        alt="weather"
      />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  );
};
const App = () => {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState("");
  const [capital, setCapital] = useState("");
  const handleCountryChange = (event) => {
    console.log(event.target.value);
    setCountry(event.target.value);
  };
  console.log(weather);
  const hook = () => {
    console.log("effect");
    if (country !== "") {
      axios
        .get(`https://restcountries.com/v2/name/${country}`)
        .then((response) => {
          console.log(response);
          setCountries(response.data);
        });
    }
  };

  const hook2 = () => {
    if (countries.length === 1) {
      let capital = countries.map((country) => country.capital)[0];
      console.log(capital);
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_API_KEY}
        `
        )
        .then((response) => {
          console.log(response.data);
          setWeather(response.data);
        });
    }
  };

  const countriesToShow =
    countries.length <= 10
      ? countries
      : [{ name: "Too many matches, specify another filter" }];

  useEffect(hook, [country]);

  useEffect(hook2, [countries]);
  console.log(country);
  return (
    <div>
      <div>
        find countries
        <input value={country} onChange={handleCountryChange} />
      </div>

      <div>
        {countriesToShow.length === 1 &&
        countriesToShow[0].name !== "Too many matches, specify another filter"
          ? countriesToShow.map((country) => (
              <div>
                <h1>{country.name}</h1>
                <p>capital {country.capital}</p>
                <p>area {country.area}</p>
                <p>
                  <b>languages</b>
                  <br />
                  {country.languages.map((language) => (
                    <li>{language.name}</li>
                  ))}
                </p>
                <img src={country.flags.png} alt="flag" />
                <div>
                  <h2>Weather in {country.capital}</h2>
                  {weather !== "" ? <WeatherInfo weather={weather} /> : <p></p>}
                </div>
              </div>
            ))
          : countriesToShow.map((country) => (
              <p>
                {country.name}{" "}
                <button
                  onClick={() => {
                    setCountry(country.name);
                  }}
                >
                  show
                </button>
              </p>
            ))}
      </div>
    </div>
  );
};
export default App;
