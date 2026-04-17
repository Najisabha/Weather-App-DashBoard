/*
{
  "latitude": 51.51147,
  "longitude": -0.13078308,
  "generationtime_ms": 0.167369842529297,
  "utc_offset_seconds": 0,
  "timezone": "GMT",
  "timezone_abbreviation": "GMT",
  "elevation": 23,
  "current_weather_units": {
    "time": "iso8601",
    "interval": "seconds",
    "temperature": "°C",
    "windspeed": "km/h",
    "winddirection": "%",
    "is_day": "",
    "weathercode": "wmo code"
  },
  "current_weather": {
    "time": "2026-04-17T06:45",
    "interval": 900,
    "temperature": 12,
    "windspeed": 7.9,
    "winddirection": 180,
    "is_day": 1,
    "weathercode": 3
  }
}
*/
// https://api.open-meteo.com/v1/forecast?latitude=51.50853&longitude=-0.12574&current_weather=true
 type CurrentWeatherUnits = {
    time: string;
    interval: number;
    temperature: number;
    windspeed: number;
    winddirection: number;
    is_day: number;
    weathercode: number;
}
 type CurrentWeather = {
    time: string;
    interval: number;
    temperature: number;
    windspeed: number;
    winddirection: number;
    is_day: number;
    weathercode: number;
}
export type WatherData = {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_weather_units: CurrentWeatherUnits;
    current_weather: CurrentWeather;
}