import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
const responseBody = res => res.data;

const requester = {
  get: (url, params, config = {}) =>
    axios.get(url, { params, ...config, }).then(responseBody),
  post: (url, data, config = {}) =>
    axios.post(url, data, config).then(responseBody),
  patch: (url, data) => axios.patch(url, data).then(responseBody),
  put: (url, data) => axios.put(url, data).then(responseBody),
  delete: (url, data) => axios.delete(url, { data }).then(responseBody),
};

export default requester;
