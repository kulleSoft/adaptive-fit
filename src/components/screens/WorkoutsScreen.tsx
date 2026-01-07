import { useState, useMemo } from "react";
import { Plus, Calendar, TrendingUp } from "lucide-react";
import { Button } from "../ui/button";
import { ExerciseCard } from "../ExerciseCard";
import { WorkoutSheet } from "../WorkoutSheet";
import { CreateWorkoutSheet } from "../CreateWorkoutSheet";
import { useWorkoutHistoryContext } from "@/contexts/WorkoutHistoryContext";
import { useCustomWorkoutsContext } from "@/contexts/CustomWorkoutsContext";
import { CustomWorkout } from "@/hooks/useCustomWorkouts";

const weekDays = ["S", "T", "Q", "Q", "S", "S", "D"];

export function WorkoutsScreen() {
  const [selectedWorkout, setSelectedWorkout] = useState<CustomWorkout | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [createSheetOpen, setCreateSheetOpen] = useState(false);
  const { history } = useWorkoutHistoryContext();
  const { workouts } = useCustomWorkoutsContext();

  // Calculate completed days this week based on actual history
  const completedDays = useMemo(() => {
    const today = new Date();
    const currentDay = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay);
    startOfWeek.setHours(0, 0, 0, 0);

    // Create array for each day of the week (Sun-Sat)
    const days = [false, false, false, false, false, false, false];
    
    history.forEach(workout => {
      const workoutDate = new Date(workout.completedAt);
      if (workoutDate >= startOfWeek) {
        const dayIndex = workoutDate.getDay();
        days[dayIndex] = true;
      }
    });

    // Reorder to start from Monday (S, T, Q, Q, S, S, D)
    return [days[1], days[2], days[3], days[4], days[5], days[6], days[0]];
  }, [history]);

  const completedCount = completedDays.filter(Boolean).length;
  const weeklyGoal = 5;

  const handleWorkoutClick = (workout: CustomWorkout) => {
    setSelectedWorkout(workout);
    setSheetOpen(true);
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <header className="px-5 pt-12 pb-6 safe-top">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Meus Treinos</h1>
          <Button variant="coral" size="icon-sm" onClick={() => setCreateSheetOpen(true)}>
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Weekly Progress */}
      <div className="px-5 mb-6">
        <div className="bg-card p-5 rounded-2xl shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-coral" />
            <h2 className="font-semibold text-foreground">Esta Semana</h2>
          </div>
          
          <div className="flex justify-between mb-4">
            {weekDays.map((day, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <span className="text-xs text-muted-foreground">{day}</span>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    completedDays[index]
                      ? "bg-coral text-white"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {completedDays[index] ? "✓" : index + 1}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-success" />
            <span className="text-muted-foreground">
              <span className="text-success font-semibold">{completedCount} de {weeklyGoal}</span> treinos completos
            </span>
          </div>
        </div>
      </div>

      {/* My Workouts */}
      <div className="px-5">
        <h2 className="text-lg font-bold text-foreground mb-4">Treinos Salvos</h2>
        
        <div className="space-y-4">
          {workouts.map((workout) => (
            <ExerciseCard
              key={workout.id}
              title={workout.title}
              duration={workout.duration}
              calories={workout.calories}
              level={workout.level}
              image={workout.image}
              onClick={() => handleWorkoutClick(workout)}
            />
          ))}
        </div>

        {/* Create New Workout CTA */}
        <button 
          onClick={() => setCreateSheetOpen(true)}
          className="w-full mt-6 p-6 border-2 border-dashed border-border rounded-2xl flex flex-col items-center gap-2 text-muted-foreground hover:border-coral hover:text-coral transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
            <Plus className="w-6 h-6" />
          </div>
          <span className="font-medium">Criar novo treino</span>
        </button>
      </div>

      {/* Workout Detail Sheet */}
      <WorkoutSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        workout={selectedWorkout}
      />

      {/* Create Workout Sheet */}
      <CreateWorkoutSheet
        open={createSheetOpen}
        onOpenChange={setCreateSheetOpen}
      />
    </div>
  );
}
