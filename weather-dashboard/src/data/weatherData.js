export const CITIES = {
  Bengaluru: {
    country: 'IN', region: 'Karnataka',
    temp: 28, feels: 30, humidity: 65, wind: 14, windDir: 'SW',
    uv: 7, pressure: 1012, visibility: 10, condition: 'Partly Cloudy',
    high: 31, low: 22, aqi: 72, dewpoint: 18, cloudcover: 45,
    sunrise: '06:08', sunset: '18:34',
  },
  Mumbai: {
    country: 'IN', region: 'Maharashtra',
    temp: 33, feels: 38, humidity: 80, wind: 18, windDir: 'W',
    uv: 9, pressure: 1008, visibility: 8, condition: 'Humid & Hazy',
    high: 35, low: 27, aqi: 110, dewpoint: 26, cloudcover: 70,
    sunrise: '06:12', sunset: '18:40',
  },
  Delhi: {
    country: 'IN', region: 'NCT',
    temp: 38, feels: 42, humidity: 30, wind: 10, windDir: 'NW',
    uv: 10, pressure: 1005, visibility: 6, condition: 'Hot & Sunny',
    high: 41, low: 29, aqi: 155, dewpoint: 14, cloudcover: 10,
    sunrise: '05:52', sunset: '18:55',
  },
  London: {
    country: 'GB', region: 'England',
    temp: 14, feels: 12, humidity: 72, wind: 22, windDir: 'W',
    uv: 3, pressure: 1018, visibility: 12, condition: 'Overcast',
    high: 16, low: 10, aqi: 35, dewpoint: 8, cloudcover: 90,
    sunrise: '05:30', sunset: '20:10',
  },
  'New York': {
    country: 'US', region: 'NY',
    temp: 18, feels: 16, humidity: 55, wind: 20, windDir: 'N',
    uv: 5, pressure: 1015, visibility: 15, condition: 'Clear',
    high: 21, low: 13, aqi: 48, dewpoint: 9, cloudcover: 15,
    sunrise: '05:55', sunset: '19:45',
  },
  Tokyo: {
    country: 'JP', region: 'Kanto',
    temp: 22, feels: 23, humidity: 60, wind: 12, windDir: 'SE',
    uv: 6, pressure: 1020, visibility: 14, condition: 'Sunny Spells',
    high: 25, low: 17, aqi: 42, dewpoint: 13, cloudcover: 30,
    sunrise: '04:50', sunset: '18:30',
  },
  Paris: {
    country: 'FR', region: 'Île-de-France',
    temp: 16, feels: 14, humidity: 68, wind: 16, windDir: 'SW',
    uv: 4, pressure: 1016, visibility: 11, condition: 'Light Rain',
    high: 18, low: 11, aqi: 38, dewpoint: 10, cloudcover: 75,
    sunrise: '05:58', sunset: '21:00',
  },
  Sydney: {
    country: 'AU', region: 'NSW',
    temp: 20, feels: 19, humidity: 58, wind: 15, windDir: 'SE',
    uv: 5, pressure: 1022, visibility: 20, condition: 'Mostly Sunny',
    high: 23, low: 14, aqi: 22, dewpoint: 11, cloudcover: 20,
    sunrise: '06:45', sunset: '17:20',
  },
}

export const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
export const HOURS = ['6am', '8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm', '10pm']

const ICONS = {
  sunny: '☀',
  cloud: '⛅',
  overcast: '☁',
  rain: '🌧',
  drizzle: '🌦',
  haze: '🌫',
  storm: '⛈',
}

function seededRand(seed) {
  let x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

function conditionIcon(condition) {
  const c = condition.toLowerCase()
  if (c.includes('sunny') || c.includes('clear') || c.includes('hot')) return ICONS.sunny
  if (c.includes('rain')) return ICONS.rain
  if (c.includes('drizzle') || c.includes('light rain')) return ICONS.drizzle
  if (c.includes('hazy') || c.includes('haze') || c.includes('fog')) return ICONS.haze
  if (c.includes('overcast') || c.includes('cloud')) return ICONS.overcast
  if (c.includes('storm')) return ICONS.storm
  return ICONS.cloud
}

export function getForecast(cityName) {
  const data = CITIES[cityName]
  const seed = Object.keys(CITIES).indexOf(cityName) * 7
  const forecastIcons = [ICONS.sunny, ICONS.cloud, ICONS.overcast, ICONS.drizzle, ICONS.rain, ICONS.cloud, ICONS.sunny]
  return WEEK_DAYS.map((day, i) => {
    const delta = Math.round((seededRand(seed + i) - 0.5) * 10)
    return {
      day,
      high: data.temp + delta + 3,
      low: data.temp + delta - 6,
      icon: forecastIcons[(seed + i) % forecastIcons.length],
      precip: Math.round(seededRand(seed + i + 20) * 80),
    }
  })
}

export function getHourlyTemps(cityName) {
  const data = CITIES[cityName]
  const seed = Object.keys(CITIES).indexOf(cityName) * 3
  return HOURS.map((_, i) => {
    const curve = Math.sin((i / (HOURS.length - 1)) * Math.PI)
    const noise = (seededRand(seed + i + 50) - 0.5) * 4
    return Math.round(data.low + curve * (data.high - data.low) + noise)
  })
}

export function getUVInfo(uv) {
  if (uv <= 2) return { label: 'Low', color: '#6ee7a0' }
  if (uv <= 5) return { label: 'Moderate', color: '#ffb86c' }
  if (uv <= 7) return { label: 'High', color: '#ff9a6c' }
  if (uv <= 10) return { label: 'Very High', color: '#ff6e6e' }
  return { label: 'Extreme', color: '#ff4444' }
}

export function getAQIInfo(aqi) {
  if (aqi <= 50)  return { label: 'Good', color: '#6ee7a0' }
  if (aqi <= 100) return { label: 'Moderate', color: '#ffb86c' }
  if (aqi <= 150) return { label: 'Sensitive', color: '#ff9a6c' }
  if (aqi <= 200) return { label: 'Unhealthy', color: '#ff6e6e' }
  return { label: 'Hazardous', color: '#ff4444' }
}

export function condIcon(city) {
  return conditionIcon(CITIES[city]?.condition || '')
}
