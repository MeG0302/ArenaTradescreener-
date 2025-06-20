// App.jsx
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { getDexPairs } from './api';

export default function App() {
  const [pairs, setPairs] = useState([]);

  useEffect(() => {
    getDexPairs().then(setPairs);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">🚀 Dexscreener Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pairs.map((pair, index) => (
          <Card key={index} className="bg-gray-800 border border-gray-700 rounded-2xl shadow-xl">
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">{pair.baseToken.symbol}/{pair.quoteToken.symbol}</h2>
              <p className="text-sm mb-1">DEX: {pair.dexId}</p>
              <p className="text-sm mb-1">Price: ${Number(pair.priceUsd).toFixed(6)}</p>
              <p className="text-sm mb-3">Volume (24h): ${Number(pair.volume.h24).toLocaleString()}</p>
              <LineChart width={250} height={100} data={pair.priceChange.h24Chart || []}>
                <Line type="monotone" dataKey="price" stroke="#4ade80" dot={false} />
                <XAxis dataKey="timestamp" hide />
                <YAxis domain={['auto', 'auto']} hide />
                <Tooltip />
              </LineChart>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 
