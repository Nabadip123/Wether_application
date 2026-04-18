import React, { useState, useRef, useEffect } from 'react'
import styles from './SearchBar.module.css'

export default function SearchBar({ cities, onSelect, current }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const results = query.trim()
    ? cities.filter(c => c.toLowerCase().includes(query.toLowerCase()))
    : []

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  function handleSelect(city) {
    onSelect(city)
    setQuery('')
    setOpen(false)
  }

  return (
    <div className={styles.wrap} ref={ref}>
      <div className={styles.inputWrap}>
        <svg className={styles.icon} viewBox="0 0 20 20" fill="none">
          <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M13.5 13.5 L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <input
          className={styles.input}
          type="text"
          placeholder="Search city..."
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
        />
        <span className={styles.current}>{current}</span>
      </div>

      {open && results.length > 0 && (
        <ul className={styles.dropdown}>
          {results.map(c => (
            <li key={c} className={styles.item} onClick={() => handleSelect(c)}>
              <span className={styles.cityName}>{c}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
