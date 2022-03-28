import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";

axios.get("http://localhost:3001/numbers").then((response) => {
  const numbers = response.data;
  ReactDOM.render(<App numbers={numbers} />, document.getElementById("root"));
});
