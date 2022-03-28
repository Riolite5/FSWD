import axios from "axios";
const baseUrl = "http://localhost:3001/numbers";

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const modify = (id, newPerson) => {
  return axios.put(`${baseUrl}/${id}`, newPerson);
};

export default { create: create, modify: modify };
