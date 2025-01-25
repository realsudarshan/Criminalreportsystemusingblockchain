import axios from "axios";
const url = import.meta.env.VITE_API_URL;
const instance = axios.create({
  baseURL: url,
});

export default instance;
