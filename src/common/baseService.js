export default class BaseService {
  constructor(http, headers) {
    this.http = http;
    this.headers = headers || {};
  }

  setToken(token) {
    if (token) return (this.headers["x-auth-token"] = token);
    this.headers["x-auth-token"] = localStorage.getItem("x-auth-token");
  }

  get(url, params) {
    params = params || {};
    this.setToken();
    return this.http.get(url, { headers: this.headers, params });
  }

  post(url, data) {
    data = data || {};
    this.setToken();
    return this.http.post(url, data, {
      headers: this.headers,
    });
  }

  put(url, data, params) {
    params = params || {};
    data = data || {};
    this.setToken();
    return this.http.put(url, data, { headers: this.headers, params });
  }

  delete(url, params) {
    params = params || {};
    this.setToken();
    return this.http.delete(url, { headers: this.headers, params });
  }
}
