import React, { useEffect, useState } from 'react';
import { getCoins } from './api';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress 
} from '@mui/material';

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCoins()
      .then(data => {
        setCoins(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <TableContainer component={Paper} style={{ marginTop: 20 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Symbol</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Holders</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coins.map((c) => (
            <TableRow key={c.symbol}>
              <TableCell>{c.symbol}</TableCell>
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.holders.toLocaleString()}</TableCell>
              <TableCell>{c.migration ? 'Migrating' : 'Stable'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default App;
