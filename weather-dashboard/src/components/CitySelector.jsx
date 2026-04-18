import React from 'react'
import styles from './CitySelector.module.css'

export default function CitySelector({ cities, current, onSelect }) {
  return (
    <div className={styles.wrap}>
      {cities.map(c => (
        <button
          key={c}
          className={`${styles.btn} ${c === current ? styles.active : ''}`}
          onClick={() => onSelect(c)}
        >
          {c}
        </button>
      ))}
    </div>
  )
}
