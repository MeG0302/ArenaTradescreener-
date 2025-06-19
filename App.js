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
    getCoins()
      .then((data) => {
        setCoins(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch coin data.");
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress style={{ margin: '20px auto', display: 'block' }} />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <TableContainer component={Paper} style={{ marginTop: 20 }}>
      <Typography variant="h5" align="center" gutterBottom>Meme Coin Dashboard</Typography>
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
              <TableCell>{c.symbol}</TableCell>
              <TableCell>{c.token_name}</TableCell>
              <TableCell>{c.swap_count}</TableCell>
              <TableCell>{c.token_name.includes("WETH") ? "Migrating" : "Stable"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default App;
