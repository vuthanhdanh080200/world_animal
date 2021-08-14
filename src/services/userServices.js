import BaseService from "../common/baseService";
import { environments } from "../environments/enviroments";
import axios from "axios";

const http = axios.create({
  baseURL: environments.baseUrl + "users/",
  timeout: 5000,
});

class UserServices extends BaseService {
  constructor() {
    super(http);
  }

  async signUp(user) {
    const results = await this.post("", user);
    console.log("Results", results);
    const token = results.headers["x-auth-token"];
    localStorage.setItem("x-auth-token", token);
    this.setToken(token);
    return results.data;
  }

  async signIn(account) {
    const results = await this.post("login", account);
    const token = results.headers["x-auth-token"];
    localStorage.setItem("x-auth-token", token);
    this.setToken(token);
    return results.data;
  }

  async me() {
    const results = await this.get("me");
    return results.data;
  }

  async update(userId, user) {
    const results = await this.put(`${userId}`, user);
    return results.data;
  }

  async remove(userId) {
    const results = await this.delete(`${userId}`);
    return results.data;
  }
}

export default UserServices;
