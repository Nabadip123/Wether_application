import React from 'react'
import styles from './ForecastRow.module.css'

export default function ForecastRow({ forecast, toDisplay }) {
  const maxHigh = Math.max(...forecast.map(f => f.high))
  const minLow = Math.min(...forecast.map(f => f.low))
  const range = maxHigh - minLow

  return (
    <div className={styles.card}>
      <div className={styles.title}>7-day forecast</div>
      <div className={styles.rows}>
        {forecast.map((f, i) => {
          const barLeft = ((f.low - minLow) / range) * 100
          const barWidth = ((f.high - f.low) / range) * 100

          return (
            <div key={f.day} className={styles.row} style={{ animationDelay: `${i * 40}ms` }}>
              <span className={styles.day}>{f.day}</span>
              <span className={styles.icon}>{f.icon}</span>
              <span className={styles.precip}>{f.precip}%</span>
              <div className={styles.barTrack}>
                <div
                  className={styles.barFill}
                  style={{ left: `${barLeft}%`, width: `${barWidth}%` }}
                />
              </div>
              <span className={styles.low}>{toDisplay(f.low)}</span>
              <span className={styles.high}>{toDisplay(f.high)}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
