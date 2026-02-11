# WeatherFlow - Full Stack Weather Application

A beautiful, modern weather application with a Node.js/Express backend and React frontend.

## Features

- 🌤️ Real-time weather data
- 🔍 Search weather by city name
- 📊 5-day weather forecast
- 💨 Detailed weather metrics (humidity, wind speed, feels-like temperature)
- 🎨 Beautiful, glassmorphic UI design
- ⚡ Fast and responsive

## Tech Stack

### Backend
- Node.js
- Express.js
- CORS enabled
- RESTful API architecture

### Frontend
- React 18
- Tailwind CSS
- Vite
- Glassmorphism design
- Smooth animations

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The API server will run on `http://localhost:3001`

For development with auto-reload:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `vite.config.js` file:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

4. Create a `tailwind.config.js` file:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

5. Create an `index.html` file:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>WeatherFlow</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/main.jsx"></script>
  </body>
</html>
```

6. Create a `main.jsx` file:
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import WeatherApp from './WeatherApp.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WeatherApp />
  </React.StrictMode>,
)
```

7. Create an `index.css` file:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  padding: 0;
}
```

8. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Get weather by city
```
GET /api/weather/:city
```

Example:
```
GET http://localhost:3001/api/weather/london
```

Response:
```json
{
  "city": "London",
  "temperature": 18,
  "condition": "Partly Cloudy",
  "humidity": 65,
  "windSpeed": 12,
  "feelsLike": 17,
  "forecast": [...]
}
```

### Get weather by coordinates
```
GET /api/weather/coords/:lat/:lon
```

Example:
```
GET http://localhost:3001/api/weather/coords/51.5074/0.1278
```

## Customization

### Using Real Weather API

To use a real weather API (like OpenWeatherMap):

1. Sign up at https://openweathermap.org/api
2. Get your API key
3. Update the backend `server.js` to use the real API:

```javascript
const API_KEY = 'your-api-key-here';

app.get('/api/weather/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    // Transform the response to match your frontend
    const weatherData = {
      city: response.data.name,
      temperature: Math.round(response.data.main.temp),
      condition: response.data.weather[0].main,
      humidity: response.data.main.humidity,
      windSpeed: Math.round(response.data.wind.speed * 3.6),
      feelsLike: Math.round(response.data.main.feels_like),
    };
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});
```

## Design Philosophy

The WeatherFlow app features a distinctive glassmorphic design with:
- Deep purple-slate gradient background
- Animated particle effects
- Glass-effect cards with backdrop blur
- Smooth hover transitions
- Bold typography with Outfit font family
- Weather-specific color gradients
- Responsive layout

## License

MIT License - feel free to use this project for learning or production!
