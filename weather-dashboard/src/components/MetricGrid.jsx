import React from 'react'
import styles from './MetricGrid.module.css'

function Metric({ label, value, sub, accent }) {
  return (
    <div className={styles.metric}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value} style={accent ? { color: accent } : {}}>{value}</div>
      {sub && <div className={styles.sub}>{sub}</div>}
    </div>
  )
}

export default function MetricGrid({ data }) {
  const beaufortScale = (kmh) => {
    if (kmh < 1)  return 'Calm'
    if (kmh < 20) return 'Light'
    if (kmh < 40) return 'Moderate'
    if (kmh < 60) return 'Fresh'
    return 'Strong'
  }

  const humidityLevel = (h) => {
    if (h < 30) return 'Dry'
    if (h < 60) return 'Comfortable'
    if (h < 80) return 'Humid'
    return 'Very Humid'
  }

  return (
    <div className={styles.grid}>
      <Metric label="Humidity" value={`${data.humidity}%`} sub={humidityLevel(data.humidity)} />
      <Metric label="Wind" value={`${data.wind} km/h`} sub={`${data.windDir} · ${beaufortScale(data.wind)}`} />
      <Metric label="Pressure" value={`${data.pressure}`} sub="hPa" />
      <Metric label="Visibility" value={`${data.visibility} km`} sub={data.visibility >= 10 ? 'Excellent' : data.visibility >= 5 ? 'Good' : 'Poor'} />
      <Metric label="Dew Point" value={`${data.dewpoint}°`} sub="condensation point" />
      <Metric label="Cloud Cover" value={`${data.cloudcover}%`} sub={data.cloudcover < 20 ? 'Clear sky' : data.cloudcover < 60 ? 'Partly cloudy' : 'Overcast'} />
    </div>
  )
}
