import axios from 'axios';

const { REACT_APP_TWITCH_BASE_URL, REACT_APP_TWITCH_CLIENT_ID } = process.env;

export const api = axios.create({
  baseURL: REACT_APP_TWITCH_BASE_URL,
  headers: {
    'Client-ID': REACT_APP_TWITCH_CLIENT_ID ?? '',
    'Content-Type': 'application/json',
  },
  timeout: 2000,
});
