import React from 'react'
import styles from './CurrentWeather.module.css'
import { getUVInfo, getAQIInfo } from '../data/weatherData'

export default function CurrentWeather({ city, data, icon, toDisplay }) {
  const uvInfo = getUVInfo(data.uv)
  const aqiInfo = getAQIInfo(data.aqi)
  const now = new Date()
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className={styles.card}>
      <div className={styles.meta}>
        <div>
          <div className={styles.cityName}>{city}</div>
          <div className={styles.region}>{data.region}, {data.country} · {dateStr}</div>
        </div>
        <div className={styles.time}>{timeStr}</div>
      </div>

      <div className={styles.main}>
        <div className={styles.iconWrap}>
          <span className={styles.icon}>{icon}</span>
          <span className={styles.condition}>{data.condition}</span>
        </div>
        <div className={styles.tempBlock}>
          <div className={styles.temp}>{toDisplay(data.temp)}</div>
          <div className={styles.feelsLike}>feels like {toDisplay(data.feels)}</div>
          <div className={styles.range}>
            <span className={styles.high}>↑ {toDisplay(data.high)}</span>
            <span className={styles.low}>↓ {toDisplay(data.low)}</span>
          </div>
        </div>
      </div>

      <div className={styles.badges}>
        <span className={styles.badge} style={{ color: uvInfo.color, borderColor: uvInfo.color + '44' }}>
          UV {data.uv} · {uvInfo.label}
        </span>
        <span className={styles.badge} style={{ color: aqiInfo.color, borderColor: aqiInfo.color + '44' }}>
          AQI {data.aqi} · {aqiInfo.label}
        </span>
        <span className={styles.badge}>
          Cloud {data.cloudcover}%
        </span>
        <span className={styles.badge}>
          ☀ {data.sunrise} · ☽ {data.sunset}
        </span>
      </div>
    </div>
  )
}
