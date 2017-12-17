import axios from 'axios';

export default {
  register(username, password) {
    return axios.post('/register', { username, password });
  },

  authenticate(username, password) {
    return axios.post('/authenticate', { username, password });
  },
};
