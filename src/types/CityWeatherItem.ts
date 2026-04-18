import type { CityData } from "./CityData";
import type { WatherData } from "./WatherData";

export type CityWeatherItem = {
  city: CityData;
  weather?: WatherData;
  isLoading?: boolean;
};
