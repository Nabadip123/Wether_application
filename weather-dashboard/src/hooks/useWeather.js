import { useState, useCallback } from 'react'
import { CITIES, getForecast, getHourlyTemps, condIcon } from '../data/weatherData'

export function useWeather(initialCity = 'Bengaluru') {
  const [city, setCity] = useState(initialCity)
  const [unit, setUnit] = useState('C') // 'C' | 'F'

  const data = CITIES[city]
  const forecast = getForecast(city)
  const hourlyTemps = getHourlyTemps(city)
  const icon = condIcon(city)

  const toDisplay = useCallback(
    (c) => {
      if (unit === 'C') return `${Math.round(c)}°C`
      return `${Math.round(c * 9 / 5 + 32)}°F`
    },
    [unit]
  )

  const toRaw = useCallback(
    (c) => (unit === 'C' ? Math.round(c) : Math.round(c * 9 / 5 + 32)),
    [unit]
  )

  const allCities = Object.keys(CITIES)

  return {
    city, setCity,
    unit, setUnit,
    data, forecast, hourlyTemps, icon,
    toDisplay, toRaw,
    allCities,
  }
}
