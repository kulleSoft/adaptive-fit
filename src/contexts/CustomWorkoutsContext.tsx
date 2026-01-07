import { createContext, useContext, ReactNode } from "react";
import { useCustomWorkouts, CustomWorkout } from "@/hooks/useCustomWorkouts";

interface CustomWorkoutsContextType {
  workouts: CustomWorkout[];
  addWorkout: (workout: Omit<CustomWorkout, "id" | "image" | "isCustom">) => CustomWorkout;
  deleteWorkout: (id: number) => void;
}

const CustomWorkoutsContext = createContext<CustomWorkoutsContextType | undefined>(undefined);

export function CustomWorkoutsProvider({ children }: { children: ReactNode }) {
  const customWorkouts = useCustomWorkouts();

  return (
    <CustomWorkoutsContext.Provider value={customWorkouts}>
      {children}
    </CustomWorkoutsContext.Provider>
  );
}

export function useCustomWorkoutsContext() {
  const context = useContext(CustomWorkoutsContext);
  if (context === undefined) {
    throw new Error("useCustomWorkoutsContext must be used within a CustomWorkoutsProvider");
  }
  return context;
}
