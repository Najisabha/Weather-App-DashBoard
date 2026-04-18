import { Circle, CloudSun, Moon, Sun } from "lucide-react";

type HeaderProps = {
  isDark: boolean;
  onToggleTheme: () => void;
};

function Header({ isDark, onToggleTheme }: HeaderProps) {
  return (
    <header
      className={`mx-auto mt-6 flex w-full max-w-6xl items-center justify-between rounded-2xl border px-5 py-4 shadow-sm backdrop-blur ${
        isDark ? "border-slate-700 bg-slate-900/85" : "border-slate-200 bg-white/90"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`rounded-full p-2 ${isDark ? "bg-slate-700 text-sky-300" : "bg-blue-100 text-blue-600"}`}
          aria-hidden="true"
        >
          <CloudSun className="h-6 w-6" strokeWidth={2} />
        </div>
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Weather App</h1>
          <h3 className={`text-sm sm:text-base ${isDark ? "text-slate-300" : "text-slate-500"}`}>
            Live weather updates every 60 seconds
          </h3>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleTheme}
          className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
            isDark
              ? "bg-slate-100 text-slate-900 hover:bg-white"
              : "bg-slate-900 text-white hover:bg-slate-800"
          }`}
          aria-label="Toggle light and dark mode"
        >
          <span className="flex items-center gap-2">
            {isDark ? (
              <>
                <Sun className="h-4 w-4" strokeWidth={2} />
                Light
              </>
            ) : (
              <>
                <Moon className="h-4 w-4" strokeWidth={2} />
                Dark
              </>
            )}
          </span>
        </button>
        <div
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold ${
            isDark ? "bg-slate-800 text-slate-100" : "bg-slate-900 text-white"
          }`}
        >
          Live <Circle className="h-2 w-2 fill-red-400 stroke-none text-red-400" aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}

export default Header;