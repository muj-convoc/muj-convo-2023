import axios from 'axios';

// const BASE_URL = 'http://localhost:5000';
// const BASE_URL = "https://us-central1-muj-convocation.cloudfunctions.net/app";
// const BASE_URL = "http://localhost:5000/muj-convocation/us-central1/app";
const BASE_URL =
  'https://muj-convocation-2023.firebaseapp.com/';

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export default API;
