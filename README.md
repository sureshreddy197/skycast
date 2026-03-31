# SkyCast

A beautiful, modern weather app built with React, TypeScript, and Tailwind CSS. Powered by the Open-Meteo API — no API key required.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)

## Features

- **City search** — Search any city worldwide via Open-Meteo geocoding
- **Current conditions** — Temperature, feels-like, humidity, wind speed, UV index
- **Hourly forecast** — Scrollable 24-hour outlook with weather icons
- **7-day forecast** — Daily high/low with temperature range bars and precipitation chance
- **Celsius / Fahrenheit toggle** — Preference saved to localStorage
- **Geolocation** — Detect and use current browser location
- **Recent searches** — Quick access to previously searched cities, stored locally
- **Dynamic backgrounds** — Gradient shifts based on weather condition and time of day
- **Responsive design** — Polished on mobile, tablet, and desktop
- **Accessible** — Semantic HTML, ARIA labels, keyboard navigation

## Tech Stack

| Layer       | Technology         |
| ----------- | ------------------ |
| Framework   | React 19           |
| Language    | TypeScript 5.7     |
| Build Tool  | Vite 6             |
| Styling     | Tailwind CSS 3.4   |
| Icons       | Lucide React       |
| Weather API | Open-Meteo (free)  |
| Storage     | localStorage       |

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
git clone https://github.com/sureshreddy197/skycast.git
cd skycast
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
skycast/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── CurrentWeather.tsx     # Main weather display card
│   │   ├── DailyForecast.tsx      # 7-day forecast section
│   │   ├── EmptyState.tsx         # Welcome screen
│   │   ├── ErrorState.tsx         # Error display with retry
│   │   ├── HourlyForecast.tsx     # 24-hour scrollable forecast
│   │   ├── LoadingState.tsx       # Loading spinner
│   │   ├── RecentSearches.tsx     # Recent city chips
│   │   ├── SearchBar.tsx          # City search with autocomplete
│   │   ├── UnitToggle.tsx         # °C / °F switcher
│   │   └── WeatherIcon.tsx        # Weather code → Lucide icon mapper
│   ├── data/
│   │   └── weather-codes.ts       # WMO weather code definitions
│   ├── hooks/
│   │   ├── useGeolocation.ts      # Browser geolocation hook
│   │   ├── useLocalStorage.ts     # Typed localStorage hook
│   │   └── useWeather.ts          # Weather data fetching hook
│   ├── lib/
│   │   ├── api.ts                 # Open-Meteo API client
│   │   └── weather-utils.ts       # Formatters and helpers
│   ├── types/
│   │   └── weather.ts             # TypeScript interfaces
│   ├── App.tsx                    # Root component
│   ├── index.css                  # Tailwind directives and base styles
│   └── main.tsx                   # Entry point
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## API

This app uses the [Open-Meteo](https://open-meteo.com/) free weather API and geocoding API. No API key or account registration is required.

- **Geocoding**: `https://geocoding-api.open-meteo.com/v1/search`
- **Forecast**: `https://api.open-meteo.com/v1/forecast`

## License

MIT
