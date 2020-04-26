import config from './config';

//Configs api requests and fetches data
export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  /**
  * makes API request to obtain authenicated user data.
  * @param {string} emailAddress - Provided input from user
  * @param {string} password - Provided input from user
  * @returns {string} User Data
  */
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, {emailAddress, password});
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  /**
  * Sends POST API request to create user
  * @param {object} user - User Data to be submitted
  */
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  /**
  * Sends POST API request to create course
  * @param {object} course - Course Data to be submitted
  * @param {string } emailAddress - Provided input from user
  * @param {string} course - Provided input from user
  */
  async createCourse (emailAddress, password, course) {
    console.log(emailAddress, password, "hey")
    const response = await this.api('/courses', 'POST', course, true, {emailAddress, password});
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  /**
  * Sends PUT API request to uodate course
  * @param {object} course - Course Data to be submitted
  * @param {string} emailAddress - Provided input from user
  * @param {string} password - Provided input from user
  * @param {string} path - path of course that needs updated
  */
  async updateCourse (emailAddress, password, course, path) {
    const response = await this.api(path, 'PUT', course, true, {emailAddress, password});
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  /**
  * Sends DELETE API request to delete course
  * @param {object} password - Provided input from user
  * @param {string} emailAddress - Provided input from user
  * @param {string} path - path of course that needs deleted
  */
  async deleteCourse (emailAddress, password, path) {
    const response = await this.api(path, 'DELETE', null, true, {emailAddress, password});
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
}
