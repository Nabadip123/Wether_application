import React, { useRef, useEffect } from 'react'
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler,
} from 'chart.js'
import { HOURS } from '../data/weatherData'
import styles from './HourlyChart.module.css'

Chart.register(LineElement, PointElement, LineController, CategoryScale, LinearScale, Tooltip, Filler)

export default function HourlyChart({ temps, unit }) {
  const canvasRef = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return
    if (chartRef.current) chartRef.current.destroy()

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: HOURS,
        datasets: [{
          data: temps,
          borderColor: '#6ee7f7',
          backgroundColor: 'rgba(110,231,247,0.06)',
          fill: true,
          tension: 0.45,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: '#6ee7f7',
          pointBorderColor: '#0a0a0f',
          pointBorderWidth: 2,
          borderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#111118',
            borderColor: '#ffffff18',
            borderWidth: 1,
            titleColor: '#8888a0',
            bodyColor: '#f0f0f5',
            titleFont: { family: "'DM Mono', monospace", size: 11 },
            bodyFont: { family: "'DM Mono', monospace", size: 13 },
            callbacks: {
              label: ctx => `  ${ctx.raw}°${unit}`,
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: {
              color: '#44445a',
              font: { family: "'DM Mono', monospace", size: 11 },
            }
          },
          y: {
            grid: { color: '#ffffff08', drawBorder: false },
            border: { display: false },
            ticks: {
              color: '#44445a',
              font: { family: "'DM Mono', monospace", size: 11 },
              callback: v => v + '°',
            }
          }
        }
      }
    })

    return () => chartRef.current?.destroy()
  }, [temps, unit])

  return (
    <div className={styles.card}>
      <div className={styles.title}>Hourly temperature</div>
      <div className={styles.chartWrap}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  )
}
