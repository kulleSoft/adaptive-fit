import { Drawer } from "vaul";
import { Clock, Flame, Target, Play, X, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
}

interface WorkoutSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workout: {
    title: string;
    duration: string;
    calories: string;
    level: string;
    image: string;
    description: string;
    exercises: Exercise[];
  } | null;
}

export function WorkoutSheet({ open, onOpenChange, workout }: WorkoutSheetProps) {
  if (!workout) return null;

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-foreground/40 z-50" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 mt-24 flex h-[90%] flex-col rounded-t-3xl bg-background">
          <div className="flex-1 overflow-auto">
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 rounded-full bg-muted-foreground/20" />
            </div>

            {/* Header Image */}
            <div className="relative h-48">
              <img
                src={workout.image}
                alt={workout.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              
              <button
                onClick={() => onOpenChange(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="px-5 -mt-8 relative">
              <div className="bg-card rounded-2xl p-5 shadow-card-lg">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {workout.title}
                </h2>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {workout.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-coral" />
                    {workout.calories}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Target className="w-4 h-4" />
                    {workout.level}
                  </span>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {workout.description}
                </p>
              </div>

              {/* Exercises List */}
              <div className="mt-6 mb-32">
                <h3 className="font-bold text-lg mb-4">Exercícios</h3>
                <div className="space-y-3">
                  {workout.exercises.map((exercise, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-card rounded-xl shadow-card"
                    >
                      <div className="w-10 h-10 rounded-full bg-coral-light flex items-center justify-center text-coral font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{exercise.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {exercise.sets} séries • {exercise.reps} reps • {exercise.rest} descanso
                        </p>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-muted-foreground/30" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Fixed Bottom Button */}
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-background via-background to-transparent pt-10 safe-bottom">
            <Button variant="coral" size="lg" className="w-full">
              <Play className="w-5 h-5" />
              Iniciar Treino
            </Button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
