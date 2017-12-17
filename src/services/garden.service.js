import axios from 'axios';

export default {
  queryGardens(query) {
    return axios.get('/api/gardens', { params: { query } });
  },

  postGarden(garden) {
    return axios.post('/api/garden', { garden });
  },

  deleteGarden(gardenId) {
    return axios.delete('/api/garden', { params: { gardenId } });
  },
};
