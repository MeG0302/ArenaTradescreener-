// src/api.js
import axios from 'axios';

const API_BASE = 'https://api.arena.trade/rpc';

export const getCoins = () =>
  axios
    .get(`${API_BASE}/group_trades_plus_recent?in_limit=15&in_offset=0`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error fetching coin data:", err);
      throw err;
    });

