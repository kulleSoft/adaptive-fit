import { useState, useEffect } from "react";

export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
}

export interface CustomWorkout {
  id: number;
  title: string;
  duration: string;
  calories: string;
  level: "Iniciante" | "Intermediário" | "Avançado";
  image: string;
  description: string;
  exercises: Exercise[];
  isCustom: boolean;
}

const CUSTOM_WORKOUTS_KEY = "custom_workouts";

const defaultWorkouts: CustomWorkout[] = [
  {
    id: 1,
    title: "Meu Treino de Segunda",
    duration: "60 min",
    calories: "500 kcal",
    level: "Avançado",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=60",
    description: "Treino personalizado focado em hipertrofia para início da semana.",
    exercises: [
      { name: "Agachamento", sets: "5", reps: "8", rest: "120s" },
      { name: "Leg Press 45°", sets: "4", reps: "12", rest: "90s" },
      { name: "Cadeira Extensora", sets: "4", reps: "15", rest: "60s" },
      { name: "Stiff", sets: "4", reps: "10", rest: "90s" },
    ],
    isCustom: false,
  },
  {
    id: 2,
    title: "Cardio Matinal",
    duration: "30 min",
    calories: "350 kcal",
    level: "Iniciante",
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&auto=format&fit=crop&q=60",
    description: "Rotina de cardio leve para começar o dia com energia.",
    exercises: [
      { name: "Caminhada Rápida", sets: "1", reps: "10 min", rest: "0s" },
      { name: "Corrida Leve", sets: "1", reps: "15 min", rest: "0s" },
      { name: "Alongamento", sets: "1", reps: "5 min", rest: "0s" },
    ],
    isCustom: false,
  },
];

const workoutImages = [
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800&auto=format&fit=crop&q=60",
];

export function useCustomWorkouts() {
  const [workouts, setWorkouts] = useState<CustomWorkout[]>(defaultWorkouts);

  useEffect(() => {
    const stored = localStorage.getItem(CUSTOM_WORKOUTS_KEY);
    if (stored) {
      try {
        const customWorkouts = JSON.parse(stored) as CustomWorkout[];
        setWorkouts([...defaultWorkouts, ...customWorkouts]);
      } catch {
        setWorkouts(defaultWorkouts);
      }
    }
  }, []);

  const addWorkout = (workout: Omit<CustomWorkout, "id" | "image" | "isCustom">) => {
    const newWorkout: CustomWorkout = {
      ...workout,
      id: Date.now(),
      image: workoutImages[Math.floor(Math.random() * workoutImages.length)],
      isCustom: true,
    };

    setWorkouts(prev => {
      const customWorkouts = prev.filter(w => w.isCustom);
      const updated = [...customWorkouts, newWorkout];
      localStorage.setItem(CUSTOM_WORKOUTS_KEY, JSON.stringify(updated));
      return [...defaultWorkouts, ...updated];
    });

    return newWorkout;
  };

  const deleteWorkout = (id: number) => {
    setWorkouts(prev => {
      const updated = prev.filter(w => w.id !== id || !w.isCustom);
      const customWorkouts = updated.filter(w => w.isCustom);
      localStorage.setItem(CUSTOM_WORKOUTS_KEY, JSON.stringify(customWorkouts));
      return updated;
    });
  };

  return { workouts, addWorkout, deleteWorkout };
}
