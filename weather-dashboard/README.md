# Skyvue — Weather Dashboard

A clean, dark-themed weather dashboard built with React, Vite, and Chart.js.

## Features

- Search across 8 pre-loaded cities worldwide
- °C / °F unit toggle
- Current conditions — temperature, feels-like, high/low, sunrise/sunset
- UV index & AQI with color-coded severity
- 6 metric cards — humidity, wind, pressure, visibility, dew point, cloud cover
- Hourly temperature chart (Chart.js)
- 7-day forecast with animated temperature range bars
- Fully responsive layout
- Dark editorial aesthetic (Syne + DM Mono fonts)

## Project Structure

```
weather-dashboard/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx              # Entry point
    ├── App.jsx               # Root layout
    ├── App.module.css
    ├── index.css             # Global tokens & resets
    ├── data/
    │   └── weatherData.js    # City data, forecast & hourly generators
    ├── hooks/
    │   └── useWeather.js     # Custom hook — state & derived data
    └── components/
        ├── SearchBar.jsx     # City search with dropdown
        ├── UnitToggle.jsx    # °C / °F switcher
        ├── CitySelector.jsx  # Quick-pick pill tabs
        ├── CurrentWeather.jsx# Hero weather card
        ├── MetricGrid.jsx    # 6 stat cards
        ├── HourlyChart.jsx   # Chart.js line chart
        └── ForecastRow.jsx   # 7-day forecast with range bars
```

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Install & Run

```bash
cd weather-dashboard
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
npm run preview
```

## Connecting a Real Weather API

To replace mock data with live weather, swap `src/data/weatherData.js` with
calls to the [OpenWeatherMap API](https://openweathermap.org/api):

```js
// Example fetch in useWeather.js
const res = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_KEY&units=metric`
)
const json = await res.json()
```

Free tier covers current weather + 5-day forecast. For hourly data, the
One Call API 3.0 plan is recommended.

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite | Build tool & dev server |
| Chart.js 4 | Hourly temperature chart |
| CSS Modules | Scoped component styles |
| Google Fonts | Syne (display) + DM Mono |
