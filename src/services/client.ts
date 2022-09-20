import axios from 'axios';

const { BASE_URL } = process.env;

const api = axios.create();

api.defaults.baseURL = BASE_URL;

// api.defaults.headers = {
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
//   'Access-Control-Allow-Headers':
//     'X-Requested-With, Content-Type, Authorization',
// };

api.defaults.timeout = 2000;

export { api };
