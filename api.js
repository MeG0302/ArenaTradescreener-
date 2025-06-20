// src/api.js

export const getDexPairs = async () => {
  try {
    const res = await fetch('https://api.dexscreener.com/latest/dex/pairs');
    const data = await res.json();
    return data.pairs.slice(0, 6); // returns only first 6 pairs
  } catch (err) {
    console.error('❌ Error fetching Dexscreener pairs:', err);
    return [];
  }
};
