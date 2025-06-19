// src/App.js
import React, { useEffect, useState } from 'react';
import { getCoins } from './api';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, CircularProgress, Typography
} from '@mui/material';

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("🔄 Calling Arena API...");

    getCoins()
      .then((data) => {
        console.log("✅ Received data from Arena API:", data);

        if (!Array.isArray(data)) {
          setError("Unexpected API response format.");
          setLoading(false);
          return;
        }

        setCoins(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ API call failed:", err);
        setError("Failed to fetch coin data.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Typography align="center" sx={{ mt: 4 }}>
        <CircularProgress />
        <div>Loading Arena Data...</div>
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" sx={{ mt: 4 }}>
        {error}
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Meme Coin Dashboard
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Symbol</TableCell>
            <TableCell>Token Name</TableCell>
            <TableCell>Swap Count</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coins.map((c, idx) => (
            <TableRow key={idx}>
              <TableCell>{c.symbol || "N/A"}</TableCell>
              <TableCell>{c.token_name || "Unknown"}</TableCell>
              <TableCell>{c.swap_count ?? "N/A"}</TableCell>
              <TableCell>
                {(c.token_name && c.token_name.includes("WETH")) ? "Migrating" : "Stable"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default App;
