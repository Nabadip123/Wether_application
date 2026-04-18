import React from 'react'
import styles from './App.module.css'
import { useWeather } from './hooks/useWeather'
import SearchBar from './components/SearchBar'
import UnitToggle from './components/UnitToggle'
import CitySelector from './components/CitySelector'
import CurrentWeather from './components/CurrentWeather'
import MetricGrid from './components/MetricGrid'
import HourlyChart from './components/HourlyChart'
import ForecastRow from './components/ForecastRow'

export default function App() {
  const {
    city, setCity,
    unit, setUnit,
    data, forecast, hourlyTemps, icon,
    toDisplay,
    allCities,
  } = useWeather('Bengaluru')

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>◈</span>
          <span className={styles.logoText}>skyvue</span>
        </div>
        <div className={styles.controls}>
          <SearchBar cities={allCities} onSelect={setCity} current={city} />
          <UnitToggle unit={unit} setUnit={setUnit} />
        </div>
      </header>

      <main className={styles.main} key={city}>
        <div className={styles.cityRow}>
          <CitySelector cities={allCities} current={city} onSelect={setCity} />
        </div>

        <div className={styles.grid}>
          <div className={styles.left}>
            <div className={styles.animateIn} style={{ animationDelay: '0ms' }}>
              <CurrentWeather
                city={city}
                data={data}
                icon={icon}
                toDisplay={toDisplay}
              />
            </div>
            <div className={styles.animateIn} style={{ animationDelay: '60ms' }}>
              <MetricGrid data={data} />
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.animateIn} style={{ animationDelay: '120ms' }}>
              <HourlyChart temps={hourlyTemps} unit={unit} />
            </div>
            <div className={styles.animateIn} style={{ animationDelay: '180ms' }}>
              <ForecastRow forecast={forecast} toDisplay={toDisplay} />
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <span>skyvue · weather dashboard · built with React + Chart.js</span>
      </footer>
    </div>
  )
}
