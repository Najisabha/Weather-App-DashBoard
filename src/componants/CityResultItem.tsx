import { MapPin } from "lucide-react";
import type { CityData } from "../types/CityData";

type CityResultItemProps = {
    city: CityData;
    onSelect: (city: CityData) => void;
    isDark: boolean;
};

function CityResultItem({ city, onSelect, isDark }: CityResultItemProps) {
    return (
        <button
            type="button"
            onClick={() => onSelect(city)}
            className={`w-full cursor-pointer rounded-lg border px-3 py-2 text-left transition ${
                isDark
                    ? "border-slate-700 bg-slate-800 hover:border-sky-500 hover:bg-slate-700"
                    : "border-slate-100 bg-slate-50 hover:border-blue-200 hover:bg-blue-50"
            }`}
        >
            <div className="flex items-center justify-between gap-2">
                <div className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-800"}`}>{city.name}</div>
                <div className="flex items-center gap-2">
                  <div
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      isDark ? "bg-slate-700 text-slate-200" : "bg-white text-slate-600"
                    }`}
                  >
                    {city.country}
                  </div>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                      isDark ? "bg-slate-700/90" : "bg-white"
                    }`}
                    aria-hidden="true"
                  >
                    <MapPin
                      className={isDark ? "text-sky-400" : "text-blue-600"}
                      size={18}
                      strokeWidth={2}
                    />
                  </span>
                </div>
            </div>
            {city.admin1 && (
              <div className={`mt-1 text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>{city.admin1}</div>
            )}
        </button>
    );
}

export default CityResultItem;
