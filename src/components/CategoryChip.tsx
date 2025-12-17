import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface CategoryChipProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function CategoryChip({ icon: Icon, label, isActive, onClick }: CategoryChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-200 active:scale-[0.97]",
        isActive
          ? "bg-coral text-white shadow-card"
          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
      )}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}
