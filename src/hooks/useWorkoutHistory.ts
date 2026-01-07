import { useState, useEffect } from "react";

export interface WorkoutRecord {
  id: string;
  title: string;
  duration: string;
  calories: string;
  completedAt: Date;
}

const STORAGE_KEY = "fitflow_workout_history";

export function useWorkoutHistory() {
  const [history, setHistory] = useState<WorkoutRecord[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        const records = parsed.map((record: any) => ({
          ...record,
          completedAt: new Date(record.completedAt),
        }));
        setHistory(records);
      } catch (e) {
        console.error("Failed to parse workout history:", e);
      }
    }
  }, []);

  // Save to localStorage whenever history changes
  const saveHistory = (newHistory: WorkoutRecord[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  const addWorkout = (workout: Omit<WorkoutRecord, "id" | "completedAt">) => {
    const newRecord: WorkoutRecord = {
      ...workout,
      id: crypto.randomUUID(),
      completedAt: new Date(),
    };
    saveHistory([newRecord, ...history]);
    return newRecord;
  };

  const clearHistory = () => {
    saveHistory([]);
  };

  // Calculate stats
  const stats = {
    totalWorkouts: history.length,
    totalCalories: history.reduce((sum, w) => {
      const num = parseInt(w.calories.replace(/\D/g, "")) || 0;
      return sum + num;
    }, 0),
    totalMinutes: history.reduce((sum, w) => {
      const num = parseInt(w.duration.replace(/\D/g, "")) || 0;
      return sum + num;
    }, 0),
    currentStreak: calculateStreak(history),
  };

  return { history, addWorkout, clearHistory, stats };
}

function calculateStreak(history: WorkoutRecord[]): number {
  if (history.length === 0) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get unique workout days
  const workoutDays = new Set(
    history.map((w) => {
      const d = new Date(w.completedAt);
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    })
  );

  let streak = 0;
  let checkDate = new Date(today);

  // Check if worked out today or yesterday to start streak
  if (!workoutDays.has(checkDate.getTime())) {
    checkDate.setDate(checkDate.getDate() - 1);
    if (!workoutDays.has(checkDate.getTime())) {
      return 0;
    }
  }

  // Count consecutive days
  while (workoutDays.has(checkDate.getTime())) {
    streak++;
    checkDate.setDate(checkDate.getDate() - 1);
  }

  return streak;
}
