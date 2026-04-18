import { X } from "lucide-react";

type DeleteCardButtonProps = {
  cityName: string;
  onDelete: () => void;
};

function DeleteCardButton({ cityName, onDelete }: DeleteCardButtonProps) {
  return (
    <button
      type="button"
      onClick={onDelete}
      className="rounded-full bg-white/20 p-1.5 text-white transition hover:bg-white/30"
      aria-label={`Delete ${cityName} card`}
    >
      <X className="h-4 w-4" strokeWidth={2.5} />
    </button>
  );
}

export default DeleteCardButton;
