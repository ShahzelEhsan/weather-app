import { useState, useEffect } from 'react';

export default function WeatherApp() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load default city
    fetchWeather('London');
  }, []);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:3001/api/weather/${cityName}`);
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError('Unable to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
      setCity('');
    }
  };

  const getWeatherIcon = (condition) => {
    const icons = {
      'Sunny': '☀️',
      'Cloudy': '☁️',
      'Rainy': '🌧️',
      'Partly Cloudy': '⛅',
      'Stormy': '⛈️'
    };
    return icons[condition] || '🌤️';
  };

  const getConditionGradient = (condition) => {
    const gradients = {
      'Sunny': 'from-amber-400 via-orange-400 to-yellow-500',
      'Cloudy': 'from-slate-400 via-gray-400 to-slate-500',
      'Rainy': 'from-blue-500 via-indigo-500 to-blue-600',
      'Partly Cloudy': 'from-sky-400 via-blue-400 to-cyan-500',
      'Stormy': 'from-purple-600 via-indigo-700 to-purple-800'
    };
    return gradients[condition] || 'from-blue-400 via-cyan-400 to-teal-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden relative">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-10"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 20 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        
        * {
          font-family: 'Outfit', sans-serif;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-100vh) translateX(50px); }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .slide-in {
          animation: slideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .glass {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .glass-strong {
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(30px);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .weather-card {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .weather-card:hover {
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 0.15);
        }
      `}</style>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className={`text-center mb-12 ${mounted ? 'slide-in' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
          <h1 className="text-7xl font-bold text-white mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              WeatherFlow
            </span>
          </h1>
          <p className="text-xl text-white/70 font-light" style={{ fontFamily: 'Space Mono, monospace' }}>
            Real-time weather intelligence
          </p>
        </div>

        {/* Search Bar */}
        <div className={`max-w-2xl mx-auto mb-16 ${mounted ? 'slide-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search for any city..."
              className="w-full px-8 py-6 rounded-3xl glass-strong text-white text-lg outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-2xl font-semibold transition-all hover:scale-105 active:scale-95"
            >
              Search
            </button>
          </form>
          {error && (
            <p className="text-red-400 mt-4 text-center glass px-4 py-2 rounded-2xl inline-block">
              {error}
            </p>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center">
            <div className="inline-block w-16 h-16 border-4 border-white/20 border-t-cyan-400 rounded-full animate-spin" />
          </div>
        )}

        {/* Weather Display */}
        {weather && !loading && (
          <div className={`${mounted ? 'slide-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            {/* Main Weather Card */}
            <div className={`glass-strong rounded-[3rem] p-12 mb-8 bg-gradient-to-br ${getConditionGradient(weather.condition)} bg-opacity-10`}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-5xl font-bold text-white mb-2">{weather.city}</h2>
                  <p className="text-2xl text-white/80 mb-8 font-light">{weather.condition}</p>
                  <div className="flex items-start gap-4">
                    <div className="text-9xl" style={{ lineHeight: '1' }}>
                      {getWeatherIcon(weather.condition)}
                    </div>
                    <div>
                      <div className="text-8xl font-bold text-white" style={{ lineHeight: '1' }}>
                        {weather.temperature}°
                      </div>
                      <p className="text-2xl text-white/60 mt-2">
                        Feels like {weather.feelsLike}°
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="glass rounded-3xl p-6 weather-card">
                    <div className="text-4xl mb-2">💧</div>
                    <div className="text-3xl font-bold text-white">{weather.humidity}%</div>
                    <div className="text-white/60 text-sm mt-1">Humidity</div>
                  </div>
                  <div className="glass rounded-3xl p-6 weather-card">
                    <div className="text-4xl mb-2">💨</div>
                    <div className="text-3xl font-bold text-white">{weather.windSpeed} km/h</div>
                    <div className="text-white/60 text-sm mt-1">Wind Speed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5-Day Forecast */}
            <div className="glass-strong rounded-[3rem] p-8">
              <h3 className="text-3xl font-bold text-white mb-8 px-4">5-Day Forecast</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {weather.forecast.map((day, index) => (
                  <div
                    key={index}
                    className="glass rounded-2xl p-6 text-center weather-card"
                    style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                  >
                    <div className="text-white/80 font-semibold mb-3 text-lg">{day.day}</div>
                    <div className="text-5xl mb-4">{getWeatherIcon(day.condition)}</div>
                    <div className="flex justify-center gap-3 text-white">
                      <span className="font-bold text-xl">{day.high}°</span>
                      <span className="text-white/50 text-xl">{day.low}°</span>
                    </div>
                    <div className="text-white/60 text-sm mt-2">{day.condition}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className={`text-center mt-16 ${mounted ? 'slide-in' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
          <p className="text-white/40 text-sm" style={{ fontFamily: 'Space Mono, monospace' }}>
            Powered by WeatherFlow API • Real-time Data
          </p>
        </div>
      </div>
    </div>
  );
}
