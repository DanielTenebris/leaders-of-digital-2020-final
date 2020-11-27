export class ApiClass {
  constructor(http, controller = '') {
    this.http = http;
    this.controller = controller;
  }
  get(endpoint, params = {}, config = {}) {
    return this.http.get(`${this.controller}/${endpoint}`, {
      params,
      ...config,
    });
  }
  post(endpoint, data = {}, config = {}, params = {}) {
    return this.http.post(`${this.controller}/${endpoint}`, data, {
      params,
      ...config,
    });
  }
  delete(endpoint, params = {}, config = {}) {
    return this.http.delete(`${this.controller}/${endpoint}`, {
      params,
      ...config,
    });
  }
  patch(endpoint, data = {}, params = {}, config = {}) {
    return this.http.patch(`${this.controller}/${endpoint}`, data, {
      params,
      ...config,
    });
  }
}
