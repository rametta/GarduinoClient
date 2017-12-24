import axios from 'axios';

export default {
  queryReadings(params) {
    return axios.get('/api/readings', { params });
  },

  postReading(reading) {
    return axios.post('/api/reading', { reading });
  },

  deleteReading(params) {
    return axios.delete('/api/reading', { params });
  },
};
