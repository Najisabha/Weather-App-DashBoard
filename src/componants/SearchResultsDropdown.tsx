import type { ReactNode } from "react";

type SearchResultsDropdownProps = {
  isVisible: boolean;
  isDark: boolean;
  children: ReactNode;
};

function SearchResultsDropdown({ isVisible, isDark, children }: SearchResultsDropdownProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`absolute left-4 right-4 top-full z-30 mt-2 max-h-72 space-y-2 overflow-y-auto rounded-xl border p-2 shadow-lg ${
        isDark ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"
      }`}
    >
      {children}
    </div>
  );
}

export default SearchResultsDropdown;
