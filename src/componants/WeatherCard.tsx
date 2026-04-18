import { CloudSun, Loader2, Snowflake, Sun } from "lucide-react";
import type { CityData } from "../types/CityData";
import type { WatherData } from "../types/WatherData";
import DeleteCardButton from "./DeleteCardButton";

type WeatherCardProps = {
    city: CityData;
    weather?: WatherData;
    isLoading?: boolean;
    onDelete: () => void;
};

type WeatherStatProps = {
    label: string;
    value: string;
};

function WeatherStat({ label, value }: WeatherStatProps) {
    return (
        <div className="min-w-0 rounded-xl bg-white/15 p-3">
            <p className="text-xs text-blue-100">{label}</p>
            <p className="mt-1 text-lg font-semibold leading-snug whitespace-normal break-normal">{value}</p>
        </div>
    );
}

function TemperatureIcon({ temperature }: { temperature?: number }) {
    const iconClass = "h-8 w-8 shrink-0 text-white";
    if (temperature === undefined) {
        return <CloudSun className={iconClass} strokeWidth={2} />;
    }
    if (temperature < 10) {
        return <Snowflake className={iconClass} strokeWidth={2} />;
    }
    if (temperature <= 25) {
        return <CloudSun className={iconClass} strokeWidth={2} />;
    }
    return <Sun className={iconClass} strokeWidth={2} />;
}

function WeatherCard({ city, weather, isLoading = false, onDelete }: WeatherCardProps) {
    const temperature = weather?.current_weather?.temperature;
    const windSpeed = weather?.current_weather?.windspeed;
    const stats = [
        { label: "Country", value: city.country },
        { label: "Timezone", value: city.timezone },
        { label: "Wind", value: windSpeed !== undefined ? `${windSpeed} km/h` : "--" },
        { label: "Coordinates", value: `${city.latitude.toFixed(2)}, ${city.longitude.toFixed(2)}` },
    ];

    return (
        <section className="w-full rounded-2xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 p-5 text-white shadow-lg ring-1 ring-white/20 sm:p-6">
            <div className="mb-6 flex items-start justify-between gap-3">
                <div>
                    <p className="text-sm text-blue-100/90">City weather overview</p>
                    <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                        <TemperatureIcon temperature={temperature} />
                        <span>{city.name}</span>
                    </h2>
                </div>
                <div className="flex items-center gap-2">
                    {city.admin1 ? (
                        <span className="max-w-[8rem] truncate rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                            {city.admin1}
                        </span>
                    ) : null}
                    <DeleteCardButton cityName={city.name} onDelete={onDelete} />
                </div>
            </div>

            <div className="mb-6 flex flex-wrap items-end gap-2">
                {isLoading ? (
                    <div className="flex items-center gap-3">
                        <Loader2 className="h-8 w-8 animate-spin text-white" strokeWidth={2} aria-hidden="true" />
                        <p className="text-base text-blue-100">Loading weather...</p>
                    </div>
                ) : (
                    <>
                        <p className="text-5xl font-extrabold leading-none sm:text-6xl">
                            {temperature !== undefined ? `${temperature}°` : "--"}
                        </p>
                        <p className="pb-2 text-blue-100">Current temperature</p>
                    </>
                )}
            </div>

            <div className="grid grid-cols-2 gap-3">
                {stats.map((stat) => (
                    <WeatherStat key={stat.label} label={stat.label} value={stat.value} />
                ))}
            </div>
        </section>
    );
}

export default WeatherCard;
