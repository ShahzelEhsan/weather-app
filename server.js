const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Weather API endpoint
app.get('/api/weather/:city', async (req, res) => {
  try {
    const { city } = req.params;
    
    // Using OpenWeatherMap API (you'll need to replace with your API key)
    // For demo purposes, returning mock data
    const mockWeatherData = {
      city: city.charAt(0).toUpperCase() + city.slice(1),
      temperature: Math.floor(Math.random() * 30) + 10,
      condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy', 'Stormy'][Math.floor(Math.random() * 5)],
      humidity: Math.floor(Math.random() * 40) + 40,
      windSpeed: Math.floor(Math.random() * 20) + 5,
      feelsLike: Math.floor(Math.random() * 30) + 10,
      forecast: Array.from({ length: 5 }, (_, i) => ({
        day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][i],
        high: Math.floor(Math.random() * 15) + 20,
        low: Math.floor(Math.random() * 10) + 10,
        condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)]
      }))
    };

    res.json(mockWeatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Current location weather (accepts lat/lon)
app.get('/api/weather/coords/:lat/:lon', async (req, res) => {
  try {
    const { lat, lon } = req.params;
    
    // Mock data based on coordinates
    const mockWeatherData = {
      city: 'Current Location',
      temperature: Math.floor(Math.random() * 30) + 10,
      condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
      humidity: Math.floor(Math.random() * 40) + 40,
      windSpeed: Math.floor(Math.random() * 20) + 5,
      feelsLike: Math.floor(Math.random() * 30) + 10,
      coordinates: { lat, lon },
      forecast: Array.from({ length: 5 }, (_, i) => ({
        day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][i],
        high: Math.floor(Math.random() * 15) + 20,
        low: Math.floor(Math.random() * 10) + 10,
        condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)]
      }))
    };

    res.json(mockWeatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Weather API server running on port ${PORT}`);
});
