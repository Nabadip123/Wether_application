import React from 'react'
import styles from './UnitToggle.module.css'

export default function UnitToggle({ unit, setUnit }) {
  return (
    <div className={styles.wrap}>
      {['C', 'F'].map(u => (
        <button
          key={u}
          className={`${styles.btn} ${unit === u ? styles.active : ''}`}
          onClick={() => setUnit(u)}
        >
          °{u}
        </button>
      ))}
    </div>
  )
}
