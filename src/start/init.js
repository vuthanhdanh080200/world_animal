import axios from "axios";
import environments from "../environments/enviroments";

const instance = axios.create({
  baseURL: environments.baseUrl,
  timeout: 1000,
  headers: { "x-auth-token": "" },
});

export default instance;
