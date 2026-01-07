import { createContext, useContext, ReactNode } from "react";
import { useWorkoutHistory, WorkoutRecord } from "@/hooks/useWorkoutHistory";

interface WorkoutHistoryContextType {
  history: WorkoutRecord[];
  addWorkout: (workout: Omit<WorkoutRecord, "id" | "completedAt">) => WorkoutRecord;
  clearHistory: () => void;
  stats: {
    totalWorkouts: number;
    totalCalories: number;
    totalMinutes: number;
    currentStreak: number;
  };
}

const WorkoutHistoryContext = createContext<WorkoutHistoryContextType | null>(null);

export function WorkoutHistoryProvider({ children }: { children: ReactNode }) {
  const workoutHistory = useWorkoutHistory();

  return (
    <WorkoutHistoryContext.Provider value={workoutHistory}>
      {children}
    </WorkoutHistoryContext.Provider>
  );
}

export function useWorkoutHistoryContext() {
  const context = useContext(WorkoutHistoryContext);
  if (!context) {
    throw new Error("useWorkoutHistoryContext must be used within WorkoutHistoryProvider");
  }
  return context;
}
