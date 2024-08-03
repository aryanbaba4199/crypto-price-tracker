import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Redux/store';
import { fetchData, changeSymbol } from '@/Redux/priceDataAction';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import 'chart.js/auto';
import { Container, Typography, Button, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, selectedSymbol } = useSelector((state: RootState) => state.priceData);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchData(selectedSymbol));

    const intervalId = setInterval(() => {
      dispatch(fetchData(selectedSymbol));
    }, 15000);

    return () => clearInterval(intervalId);
  }, [dispatch, selectedSymbol]);

  const handleCryptoChange = (crypto: string) => {
    dispatch(changeSymbol(crypto));
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      handleCryptoChange(searchQuery.trim().toLowerCase());
    }
  };

  const chartData = {
    labels: data.map((entry) => new Date(entry.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: selectedSymbol.toUpperCase(),
        data: data.map((entry) => entry.price),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <Container maxWidth="lg" className="min-h-screen p-8 bg-slate-950 text-red-500">
      <Typography variant="h3" component="h1" gutterBottom align="center" className="font-bold mb-8 text-white">
        Real-Time Crypto Prices
      </Typography>

      <div className="flex justify-center mb-8 gap-4">
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search for a stock..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            endAdornment: <SearchIcon className="text-red-500" />,
            style: { backgroundColor: '#1f2937', color: 'white' },
          }}
          className="rounded-lg"
        />
        <Button
          variant="contained"
          style={{ backgroundColor: '#ef4444', color: 'white' }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>

      <div className="flex justify-center mb-8 gap-4">
        {['bitcoin', 'ethereum', 'cardano', 'dogecoin', 'ripple'].map((crypto) => (
          <Button
            key={crypto}
            variant="contained"
            style={{
              backgroundColor: selectedSymbol === crypto ? '#ef4444' : '#3b82f6',
              color: 'white',
            }}
            onClick={() => handleCryptoChange(crypto)}
            className="hover:scale-105 transition-transform duration-200"
          >
            {crypto.charAt(0).toUpperCase() + crypto.slice(1)}
          </Button>
        ))}
      </div>

      <Line
        data={chartData}
        options={{ responsive: true, plugins: { legend: { display: true, labels: { color: 'white' } } } }}
        className="mb-8"
      />

      <TableContainer component={Paper} className="bg-slate-950 shadow-lg rounded-lg">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="text-red-500 bg-slate-900 font-bold">Symbol</TableCell>
              <TableCell className="text-red-500 bg-slate-900 font-bold">Price (USD)</TableCell>
              <TableCell className="text-red-500 bg-slate-900 font-bold">Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((entry) => (
              <TableRow key={entry.timestamp} className="hover:bg-slate-800 transition-colors duration-200">
                <TableCell className="text-white">{entry.symbol.toUpperCase()}</TableCell>
                <TableCell className="text-white">${entry.price.toFixed(2)}</TableCell>
                <TableCell className="text-white">{new Date(entry.timestamp).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default HomePage;
