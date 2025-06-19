// src/api.js
import axios from 'axios';

const ANALYTICS_URL =
  'https://api.web3modal.org/getAnalyticsConfig?projectId=7d5674dc79fe520e154172c5c58ed539&st=appkit&sv=html-core-1.7.3';

export const getAnalyticsConfig = () =>
  axios
    .get(ANALYTICS_URL)
    .then((res) => {
      console.log('📡 Arena Analytics Config:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.error('🚨 Error fetching analytics config from Arena:', err);
      throw err;
    });
