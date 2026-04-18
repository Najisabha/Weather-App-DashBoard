import { Check, CircleAlert } from "lucide-react";

type ToastMessageProps = {
  message: string | null;
  variant?: "success" | "danger";
};

const variantClasses: Record<NonNullable<ToastMessageProps["variant"]>, string> = {
  success: "bg-emerald-600/95 text-emerald-50 ring-emerald-200/30",
  danger: "bg-rose-600/95 text-rose-50 ring-rose-200/30",
};

function ToastMessage({ message, variant = "success" }: ToastMessageProps) {
  if (!message) {
    return null;
  }

  const Icon = variant === "danger" ? CircleAlert : Check;

  return (
    <div
      className={`pointer-events-none fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium shadow-xl ring-1 backdrop-blur ${variantClasses[variant]}`}
    >
      <Icon className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden="true" />
      {message}
    </div>
  );
}

export default ToastMessage;
