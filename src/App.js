import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Paper, List, ListItem, ListItemText } from '@mui/material';

function App() {
  const [baseline, setBaseline] = useState('');
  const [currencies, setCurrencies] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const request = {
      baseline,
      currencies: currencies.split(','),
      fromDate,
      toDate,
    };
    try {
      const response = await axios.post('http://localhost:5264/CurrencyDelta', request);
      setResults(response.data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Currency Delta Calculator
      </Typography>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
          <TextField
            label="Baseline Currency"
            value={baseline}
            onChange={(e) => setBaseline(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Currencies (comma-separated)"
            value={currencies}
            onChange={(e) => setCurrencies(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="From Date"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <TextField
            label="To Date"
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <Box sx={{ textAlign: 'center', marginTop: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Get Delta
            </Button>
          </Box>
        </Box>
      </Paper>
      <Typography variant="h4" gutterBottom sx={{ marginTop: 4 }}>
        Results
      </Typography>
      {results.length > 0 ? (
        <List>
          {results.map((result, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${result.currency}: ${result.delta}`} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No results found.</Typography>
      )}
    </Container>
  );
}

export default App;
