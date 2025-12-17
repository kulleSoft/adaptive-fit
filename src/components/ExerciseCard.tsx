import { Clock, Flame, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExerciseCardProps {
  title: string;
  duration: string;
  calories: string;
  level: "Iniciante" | "Intermediário" | "Avançado";
  image: string;
  onClick?: () => void;
  className?: string;
}

const levelColors = {
  Iniciante: "bg-success-light text-success",
  Intermediário: "bg-coral-light text-coral",
  Avançado: "bg-destructive/10 text-destructive",
};

export function ExerciseCard({
  title,
  duration,
  calories,
  level,
  image,
  onClick,
  className,
}: ExerciseCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-lg transition-all duration-300 active:scale-[0.98] text-left",
        className
      )}
    >
      <div className="relative h-32 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <span className={cn(
          "absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold",
          levelColors[level]
        )}>
          {level}
        </span>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-foreground mb-2 line-clamp-1">{title}</h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-muted-foreground text-sm">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-coral" />
              {calories}
            </span>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </button>
  );
}
