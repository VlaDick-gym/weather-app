import { useState } from 'react'

interface WeatherData {
  city: string
  country: string
  temp: number
  feelsLike: number
  humidity: number
  wind: number
  description: string
  icon: string
}

const API_KEY = 'demo' // Замените на ваш API ключ OpenWeatherMap

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchWeather = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!city.trim()) return

    setLoading(true)
    setError('')

    try {
      // Используем демо-данные для примера
      const demoData: Record<string, WeatherData> = {
        'москва': {
          city: 'Москва',
          country: 'RU',
          temp: 15,
          feelsLike: 13,
          humidity: 72,
          wind: 5.2,
          description: 'Облачно с прояснениями',
          icon: 'cloudy'
        },
        'минск': {
          city: 'Минск',
          country: 'BY',
          temp: 14,
          feelsLike: 12,
          humidity: 75,
          wind: 4.8,
          description: 'Небольшой дождь',
          icon: 'rainy'
        },
        'лондон': {
          city: 'Лондон',
          country: 'GB',
          temp: 12,
          feelsLike: 10,
          humidity: 82,
          wind: 6.1,
          description: 'Пасмурно',
          icon: 'cloudy'
        },
        'нью-йорк': {
          city: 'Нью-Йорк',
          country: 'US',
          temp: 22,
          feelsLike: 24,
          humidity: 65,
          wind: 3.5,
          description: 'Ясно',
          icon: 'sunny'
        },
        'париж': {
          city: 'Париж',
          country: 'FR',
          temp: 18,
          feelsLike: 17,
          humidity: 68,
          wind: 4.2,
          description: 'Переменная облачность',
          icon: 'partly-cloudy'
        }
      }

      // Имитация задержки API
      await new Promise(resolve => setTimeout(resolve, 800))

      const cityLower = city.toLowerCase().trim()
      const data = demoData[cityLower]

      if (data) {
        setWeather(data)
      } else {
        // Генерируем случайные данные для других городов
        setWeather({
          city: city.charAt(0).toUpperCase() + city.slice(1),
          country: 'XX',
          temp: Math.floor(Math.random() * 30) + 5,
          feelsLike: Math.floor(Math.random() * 30) + 3,
          humidity: Math.floor(Math.random() * 40) + 40,
          wind: Number((Math.random() * 10).toFixed(1)),
          description: ['Ясно', 'Облачно', 'Дождь', 'Пасмурно'][Math.floor(Math.random() * 4)],
          icon: ['sunny', 'cloudy', 'rainy', 'partly-cloudy'][Math.floor(Math.random() * 4)]
        })
      }
    } catch (err) {
      setError('Ошибка получения данных. Попробуйте позже.')
    } finally {
      setLoading(false)
    }
  }

  const getWeatherIcon = (icon: string) => {
    const icons: Record<string, string> = {
      sunny: '☀️',
      cloudy: '☁️',
      rainy: '🌧️',
      'partly-cloudy': '⛅'
    }
    return icons[icon] || '🌤️'
  }

  return (
    <div className="app">
      <div className="container">
        <h1>🌤️ Weather App</h1>
        
        <form onSubmit={fetchWeather} className="search-form">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Введите город..."
            className="city-input"
          />
          <button type="submit" className="search-btn" disabled={loading}>
            {loading ? '⏳' : '🔍'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {weather && (
          <div className="weather-card">
            <div className="weather-header">
              <h2>{weather.city}, {weather.country}</h2>
              <div className="weather-icon">{getWeatherIcon(weather.icon)}</div>
            </div>
            
            <div className="weather-main">
              <div className="temperature">{weather.temp}°C</div>
              <div className="description">{weather.description}</div>
            </div>

            <div className="weather-details">
              <div className="detail">
                <span className="detail-label">Ощущается как</span>
                <span className="detail-value">{weather.feelsLike}°C</span>
              </div>
              <div className="detail">
                <span className="detail-label">Влажность</span>
                <span className="detail-value">{weather.humidity}%</span>
              </div>
              <div className="detail">
                <span className="detail-label">Ветер</span>
                <span className="detail-value">{weather.wind} м/с</span>
              </div>
            </div>
          </div>
        )}

        {!weather && !loading && !error && (
          <div className="empty-state">
            <p>Введите название города для получения прогноза погоды</p>
            <div className="sample-cities">
              <p>Попробуйте:</p>
              <div className="cities-list">
                <button onClick={() => { setCity('Москва'); fetchWeather({ preventDefault: () => {} } as any) }}>Москва</button>
                <button onClick={() => { setCity('Минск'); fetchWeather({ preventDefault: () => {} } as any) }}>Минск</button>
                <button onClick={() => { setCity('Лондон'); fetchWeather({ preventDefault: () => {} } as any) }}>Лондон</button>
                <button onClick={() => { setCity('Нью-Йорк'); fetchWeather({ preventDefault: () => {} } as any) }}>Нью-Йорк</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
