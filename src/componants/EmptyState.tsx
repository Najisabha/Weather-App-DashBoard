import { CloudSun } from "lucide-react";

type EmptyStateProps = {
  message: string;
  isDark: boolean;
};

function EmptyState({ message, isDark }: EmptyStateProps) {
  return (
    <div className="mx-auto mt-8 flex w-full max-w-6xl flex-col items-center gap-3 px-4 text-center">
      <CloudSun
        className={`h-10 w-10 ${isDark ? "text-slate-500" : "text-slate-400"}`}
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <p className={`text-sm ${isDark ? "text-slate-300" : "text-slate-500"}`}>{message}</p>
    </div>
  );
}

export default EmptyState;
