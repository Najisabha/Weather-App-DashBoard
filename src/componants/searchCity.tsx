import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { CityData } from "../types/CityData";
import CityResultItem from "./CityResultItem";
import SearchResultsDropdown from "./SearchResultsDropdown";

type CityDataResponse = {
    results?: CityData[];
  };

type SearchCityProps = {
    onSelectCity: (city: CityData) => void;
    isDark: boolean;
};

const MIN_SEARCH_LENGTH = 3;
const MAX_QUERY_LENGTH = 80;
const MAX_RESULTS = 8;
const SEARCH_DEBOUNCE_MS = 350;
  
function SearchCity({ onSelectCity, isDark }: SearchCityProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<CityData[]>([]);
    const debounceTimerRef = useRef<number | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    const handleSelect = (city: CityData) => {
        setQuery("");
        setResults([]);
        onSelectCity(city);
    };

    const fetchCities = async (searchQuery: string) => {
        abortControllerRef.current?.abort();
        const controller = new AbortController();
        abortControllerRef.current = controller;

        try {
            const params = new URLSearchParams({ name: searchQuery });
            const response = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?${params.toString()}`,
                { signal: controller.signal }
            );

            if (!response.ok) {
                setResults([]);
                return;
            }

            const data: CityDataResponse = await response.json();
            setResults((data.results ?? []).slice(0, MAX_RESULTS));
        } catch {
            setResults([]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value.slice(0, MAX_QUERY_LENGTH);
        setQuery(newQuery);
    };

    useEffect(() => {
        const normalizedQuery = query.trim();
        if (debounceTimerRef.current !== null) {
            window.clearTimeout(debounceTimerRef.current);
        }

        if (normalizedQuery.length < MIN_SEARCH_LENGTH) {
            abortControllerRef.current?.abort();
            setResults([]);
            return;
        }

        debounceTimerRef.current = window.setTimeout(() => {
            fetchCities(normalizedQuery);
        }, SEARCH_DEBOUNCE_MS);

        return () => {
            if (debounceTimerRef.current !== null) {
                window.clearTimeout(debounceTimerRef.current);
            }
        };
    }, [query]);

    useEffect(() => {
        return () => {
            abortControllerRef.current?.abort();
            if (debounceTimerRef.current !== null) {
                window.clearTimeout(debounceTimerRef.current);
            }
        };
    }, []);

    return (
        <div className="relative mx-auto mt-4 w-full max-w-6xl px-4">
            <Search
                className={`pointer-events-none absolute left-7 top-1/2 z-10 h-5 w-5 -translate-y-1/2 ${
                    isDark ? "text-slate-400" : "text-slate-400"
                }`}
                strokeWidth={2}
                aria-hidden="true"
            />
            <input
                value={query}
                onChange={handleChange}
                type="text"
                placeholder="Search for a city"
                className={`w-full rounded-xl border py-3 pl-12 pr-4 text-base shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
                    isDark
                        ? "border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-400"
                        : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
                }`}
            />
            <SearchResultsDropdown isVisible={results.length > 0} isDark={isDark}>
                {results.map((result) => (
                    <CityResultItem key={result.id} city={result} onSelect={handleSelect} isDark={isDark} />
                ))}
            </SearchResultsDropdown>
        </div>
    );
}
export default SearchCity;