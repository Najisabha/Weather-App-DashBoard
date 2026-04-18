import Header from './componants/Header';
import { useEffect, useRef, useState } from 'react';
import type { CityData } from './types/CityData';
import type { WatherData } from './types/WatherData';
import type { CityWeatherItem } from './types/CityWeatherItem';
import SearchCity from './componants/searchCity';
import WeatherCardGrid from './componants/WeatherCardGrid';
import EmptyState from './componants/EmptyState';
import ToastMessage from './componants/ToastMessage.tsx';

const WEATHER_REFRESH_INTERVAL_MS = 60000;
const REQUEST_TIMEOUT_MS = 8000;
const MAX_TRACKED_CITIES = 8;
const TOAST_DURATION_MS = 2500;
const THEME_STORAGE_KEY = "weather-app-theme";

type ToastVariant = "success" | "danger";
type ThemeMode = "light" | "dark";

const reorderCities = (
  items: CityWeatherItem[],
  sourceCityId: number,
  targetCityId: number
) => {
  const sourceIndex = items.findIndex((item) => item.city.id === sourceCityId);
  const targetIndex = items.findIndex((item) => item.city.id === targetCityId);

  if (sourceIndex < 0 || targetIndex < 0) {
    return items;
  }

  const next = [...items];
  const [movedItem] = next.splice(sourceIndex, 1);
  next.splice(targetIndex, 0, movedItem);
  return next;
};

function App() {

  const [citiesWeather, setCitiesWeather] = useState<CityWeatherItem[]>([]);
  const [draggedCityId, setDraggedCityId] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastVariant, setToastVariant] = useState<ToastVariant>("success");
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const citiesRef = useRef<CityWeatherItem[]>([]);
  const isRefreshingRef = useRef(false);
  const isDark = theme === "dark";

  useEffect(() => {
    citiesRef.current = citiesWeather;
  }, [citiesWeather]);

  useEffect(() => {
    if (!toastMessage) {
      return;
    }
    const timeoutId = window.setTimeout(() => setToastMessage(null), TOAST_DURATION_MS);
    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const fetchWeatherByCity = async (city: CityData): Promise<WatherData | null> => {
    let timeoutId: number | null = null;
    try {
      if (
        !Number.isFinite(city.latitude) ||
        !Number.isFinite(city.longitude) ||
        city.latitude < -90 ||
        city.latitude > 90 ||
        city.longitude < -180 ||
        city.longitude > 180
      ) {
        return null;
      }

      const params = new URLSearchParams({
        latitude: String(city.latitude),
        longitude: String(city.longitude),
        current_weather: 'true',
      });
      const timeoutController = new AbortController();
      timeoutId = window.setTimeout(() => timeoutController.abort(), REQUEST_TIMEOUT_MS);
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?${params.toString()}`,
        { signal: timeoutController.signal }
      );

      if (!response.ok) {
        return null;
      }

      const data: WatherData = await response.json();
      return data;
    } catch {
      return null;
    } finally {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    }
  };

  const handleCitySelect = async (selectedCity: CityData) => {
    let shouldFetch = false;
    let didAdd = false;

    // Add city immediately so the card appears while weather is loading.
    setCitiesWeather((prev) => {
      const exists = prev.some((item) => item.city.id === selectedCity.id);
      if (exists) {
        return prev;
      }
      if (prev.length >= MAX_TRACKED_CITIES) {
        return prev;
      }
      shouldFetch = true;
      didAdd = true;
      return [...prev, { city: selectedCity, isLoading: true }];
    });

    if (didAdd) {
      setToastVariant("success");
      setToastMessage(`Added ${selectedCity.name}`);
    }

    if (!shouldFetch) {
      return;
    }

    const data = await fetchWeatherByCity(selectedCity);
    setCitiesWeather((prev) =>
      prev.map((item) =>
        item.city.id === selectedCity.id
          ? { ...item, weather: data ?? item.weather, isLoading: false }
          : item
      )
    );
  };

  const handleDeleteCity = (cityId: number) => {
    setCitiesWeather((prev) => {
      const cityToDelete = prev.find((item) => item.city.id === cityId);
      if (cityToDelete) {
        setToastVariant("danger");
        setToastMessage(`Removed ${cityToDelete.city.name}`);
      }
      return prev.filter((item) => item.city.id !== cityId);
    });
  };

  const cityIdsSignature = citiesWeather.map((item) => item.city.id).join(',');

  useEffect(() => {
    if (citiesWeather.length === 0) {
      return;
    }

    const refreshAllWeather = async () => {
      if (document.visibilityState !== 'visible' || !navigator.onLine) {
        return;
      }

      // This lock prevents overlapping interval requests from racing state updates.
      if (isRefreshingRef.current) {
        return;
      }
      isRefreshingRef.current = true;
      try {
        const latestCities = citiesRef.current;
        const weatherEntries = await Promise.all(
          latestCities.map(async (item) => ({
            cityId: item.city.id,
            weather: await fetchWeatherByCity(item.city),
          }))
        );

        const weatherByCityId = new Map(
          weatherEntries.map((entry) => [entry.cityId, entry.weather])
        );

        setCitiesWeather((prev) =>
          prev.map((item) => ({
            ...item,
            weather: weatherByCityId.get(item.city.id) ?? item.weather,
            isLoading: false,
          }))
        );
      } finally {
        isRefreshingRef.current = false;
      }
    };

    refreshAllWeather();
    const intervalId = window.setInterval(refreshAllWeather, WEATHER_REFRESH_INTERVAL_MS);
    return () => window.clearInterval(intervalId);
  }, [cityIdsSignature, citiesWeather.length]);

  const handleDragStart = (cityId: number) => {
    setDraggedCityId(cityId);
  };

  const handleDrop = (targetCityId: number) => {
    if (draggedCityId === null || draggedCityId === targetCityId) {
      setDraggedCityId(null);
      return;
    }

    setCitiesWeather((prev) => {
      return reorderCities(prev, draggedCityId, targetCityId);
    });

    setDraggedCityId(null);
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div
      className={`relative min-h-screen overflow-hidden pb-8 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950"
          : "bg-gradient-to-br from-sky-100 via-indigo-100 to-blue-50"
      }`}
    >
      <div
        className={`pointer-events-none absolute -top-28 -left-20 h-72 w-72 rounded-full blur-3xl ${
          isDark ? "bg-cyan-500/20" : "bg-cyan-300/35"
        }`}
      />
      <div
        className={`pointer-events-none absolute top-24 right-0 h-96 w-96 rounded-full blur-3xl ${
          isDark ? "bg-violet-500/20" : "bg-indigo-300/30"
        }`}
      />
      <div
        className={`pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full blur-3xl ${
          isDark ? "bg-blue-500/20" : "bg-blue-300/20"
        }`}
      />

      <div className="relative z-10">
        <Header isDark={isDark} onToggleTheme={handleToggleTheme} />
        <SearchCity onSelectCity={handleCitySelect} isDark={isDark} />
        <WeatherCardGrid
          items={citiesWeather}
          draggedCityId={draggedCityId}
          onDragStart={handleDragStart}
          onDragEnd={() => setDraggedCityId(null)}
          onDrop={handleDrop}
          onDelete={handleDeleteCity}
        />
        {citiesWeather.length === 0 && (
          <EmptyState
            message="Start by searching and selecting a city to see its weather card."
            isDark={isDark}
          />
        )}
      </div>

      <ToastMessage message={toastMessage} variant={toastVariant} />
    </div>
  )
}

export default App
