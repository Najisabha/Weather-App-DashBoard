/*
    {
      "id": 108410,
      "name": "Riyadh",
      "latitude": 24.68773,
      "longitude": 46.72185,
      "elevation": 612,
      "feature_code": "PPLC",
      "country_code": "SA",
      "admin1_id": 108411,
      "timezone": "Asia/Riyadh",
      "population": 4205961,
      "country_id": 102358,
      "country": "Saudi Arabia",
      "admin1": "Riyadh Region"
    },
*/
// https://geocoding-api.open-meteo.com/v1/search?name=Riyadh
export type CityData = {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    elevation: number;
    feature_code: string;
    country_code: string;
    admin1_id: number;
    timezone: string;
    population: number;
    country_id: number;
    country: string;
    admin1: string;
}