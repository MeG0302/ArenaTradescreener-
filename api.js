// src/api.js
import axios from 'axios';

const API_BASE = 'https://api.arena.trade/'; // <-- confirm actual base URL

export const getCoins = () =>
  axios.get(`${API_BASE}/coins`)
    .then(res => res.data)
    .catch(err => { throw err; });

export const getCoinDetails = (symbol) =>
  axios.get(`${API_BASE}/coins/${symbol}`)
    .then(res => res.data)
    .catch(err => { throw err; });
