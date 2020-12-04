import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-jotter-8af9d.cloudfunctions.net/api",
});

export default instance;