import axios from 'axios';

export default {
  queryGardens(params) {
    return axios.get('/api/gardens', { params });
  },

  postGarden(garden) {
    return axios.post('/api/garden', { garden });
  },

  deleteGarden(params) {
    return axios.delete('/api/garden', { params });
  },
};
