import config from './config';

// Configs api requests and fetches data
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
      const encodedCredentials = btoa(`${credentials.email}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

// makes API request to authenicated user data.
  async getUser(email, password, id) {
    const response = await this.api(`/users`, 'GET', null, true, {email, password, id});

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
  
// Sends POST API request to create user
  async createUser(user) {
    console.log(user, "post create user")
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

// Sends POST API request to create course
  async createCourse (email, password, course,) {
  
    const response = await this.api('/courses', 'POST', course, true, {email, password});
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

// Sends PUT API request to uodate course 
  async updateCourse (email, password, course, path, ) {
    const response = await this.api(path, 'PUT', course, true, {email, password,});
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

// Sends DELETE API request to delete course
  async deleteCourse ( email, password, path) {
    const response = await this.api(path, 'DELETE', null, true, {email, password});
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

