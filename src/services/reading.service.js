import axios from 'axios';

export default {
  queryReadings(query) {
    return axios.get('/api/readings', { params: { query } });
  },

  postReading(reading) {
    return axios.post('/api/reading', { reading });
  },

  deleteReading(readingId) {
    return axios.delete('/api/reading', { params: { readingId } });
  },
};
