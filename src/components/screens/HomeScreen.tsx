import { useState, useMemo } from "react";
import { Search, Bell, Flame, Zap, Dumbbell, Heart, Target } from "lucide-react";
import { CategoryChip } from "../CategoryChip";
import { ExerciseCard } from "../ExerciseCard";
import { WorkoutSheet } from "../WorkoutSheet";
import { useWorkoutHistoryContext } from "@/contexts/WorkoutHistoryContext";

const categories = [
  { id: "all", icon: Flame, label: "Todos" },
  { id: "strength", icon: Dumbbell, label: "Força" },
  { id: "cardio", icon: Zap, label: "Cardio" },
  { id: "yoga", icon: Heart, label: "Yoga" },
  { id: "hiit", icon: Target, label: "HIIT" },
];

const workouts = [
  {
    id: 1,
    title: "Treino de Peito e Tríceps",
    duration: "45 min",
    calories: "320 kcal",
    level: "Intermediário" as const,
    category: "strength",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop&q=60",
    description: "Um treino completo focado no desenvolvimento do peitoral e tríceps, com exercícios compostos e isolados para máximo ganho muscular.",
    exercises: [
      { name: "Supino Reto", sets: "4", reps: "10-12", rest: "90s" },
      { name: "Supino Inclinado", sets: "3", reps: "12", rest: "60s" },
      { name: "Crossover", sets: "3", reps: "15", rest: "45s" },
      { name: "Tríceps Corda", sets: "4", reps: "12", rest: "60s" },
      { name: "Tríceps Francês", sets: "3", reps: "12", rest: "45s" },
    ],
  },
  {
    id: 2,
    title: "HIIT Queima de Gordura",
    duration: "25 min",
    calories: "400 kcal",
    level: "Avançado" as const,
    category: "hiit",
    image: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800&auto=format&fit=crop&q=60",
    description: "Treino intervalado de alta intensidade para acelerar o metabolismo e queimar gordura de forma eficiente.",
    exercises: [
      { name: "Burpees", sets: "4", reps: "15", rest: "30s" },
      { name: "Mountain Climbers", sets: "4", reps: "30", rest: "30s" },
      { name: "Jump Squats", sets: "4", reps: "20", rest: "30s" },
      { name: "High Knees", sets: "4", reps: "40", rest: "30s" },
    ],
  },
  {
    id: 3,
    title: "Yoga para Flexibilidade",
    duration: "30 min",
    calories: "150 kcal",
    level: "Iniciante" as const,
    category: "yoga",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=60",
    description: "Sessão de yoga focada em alongamento e flexibilidade, perfeita para iniciantes e recuperação muscular.",
    exercises: [
      { name: "Saudação ao Sol", sets: "3", reps: "5 ciclos", rest: "30s" },
      { name: "Postura do Guerreiro", sets: "2", reps: "30s cada lado", rest: "15s" },
      { name: "Postura da Cobra", sets: "3", reps: "20s", rest: "15s" },
      { name: "Postura da Criança", sets: "2", reps: "60s", rest: "0s" },
    ],
  },
  {
    id: 4,
    title: "Treino de Pernas Completo",
    duration: "50 min",
    calories: "450 kcal",
    level: "Intermediário" as const,
    category: "strength",
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&auto=format&fit=crop&q=60",
    description: "Treino intenso para quadríceps, posteriores e glúteos. Ideal para desenvolver força e definição nas pernas.",
    exercises: [
      { name: "Agachamento Livre", sets: "4", reps: "10", rest: "90s" },
      { name: "Leg Press", sets: "4", reps: "12", rest: "60s" },
      { name: "Cadeira Extensora", sets: "3", reps: "15", rest: "45s" },
      { name: "Mesa Flexora", sets: "3", reps: "12", rest: "45s" },
      { name: "Panturrilha em Pé", sets: "4", reps: "20", rest: "30s" },
    ],
  },
  {
    id: 5,
    title: "Cardio Intenso",
    duration: "35 min",
    calories: "380 kcal",
    level: "Intermediário" as const,
    category: "cardio",
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&auto=format&fit=crop&q=60",
    description: "Sessão de cardio para melhorar resistência cardiovascular e queimar calorias.",
    exercises: [
      { name: "Corrida Estacionária", sets: "3", reps: "5 min", rest: "60s" },
      { name: "Polichinelos", sets: "4", reps: "30", rest: "30s" },
      { name: "Skipping", sets: "3", reps: "1 min", rest: "45s" },
      { name: "Shadow Boxing", sets: "3", reps: "2 min", rest: "60s" },
    ],
  },
];

export function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedWorkout, setSelectedWorkout] = useState<typeof workouts[0] | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const { history } = useWorkoutHistoryContext();

  // Calculate weekly stats from history
  const weeklyStats = useMemo(() => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const thisWeekWorkouts = history.filter(w => new Date(w.completedAt) >= startOfWeek);
    
    const totalCalories = thisWeekWorkouts.reduce((sum, w) => {
      const cal = parseInt(w.calories.replace(/\D/g, '')) || 0;
      return sum + cal;
    }, 0);

    const totalMinutes = thisWeekWorkouts.reduce((sum, w) => {
      const mins = parseInt(w.duration.replace(/\D/g, '')) || 0;
      return sum + mins;
    }, 0);

    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    const timeStr = hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;

    return {
      count: thisWeekWorkouts.length,
      calories: totalCalories.toLocaleString('pt-BR'),
      time: timeStr,
    };
  }, [history]);

  // Filter workouts by category and search
  const filteredWorkouts = useMemo(() => {
    return workouts.filter(workout => {
      const matchesCategory = activeCategory === "all" || workout.category === activeCategory;
      const matchesSearch = searchQuery === "" || 
        workout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workout.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleWorkoutClick = (workout: typeof workouts[0]) => {
    setSelectedWorkout(workout);
    setSheetOpen(true);
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <header className="px-5 pt-12 pb-6 safe-top">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-muted-foreground text-sm">Olá, João 👋</p>
            <h1 className="text-2xl font-bold text-foreground">Bora treinar?</h1>
          </div>
          <button className="relative p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors">
            <Bell className="w-5 h-5 text-foreground" />
            {history.length > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-coral rounded-full" />
            )}
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar treinos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-coral/50"
          />
        </div>
      </header>

      {/* Stats Card */}
      <div className="px-5 mb-6">
        <div className="bg-gradient-to-br from-coral to-coral-dark p-5 rounded-2xl text-white shadow-card-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 text-sm">Esta semana</p>
              <h2 className="text-3xl font-bold">
                {weeklyStats.count} {weeklyStats.count === 1 ? 'treino' : 'treinos'}
              </h2>
            </div>
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <Flame className="w-8 h-8" />
            </div>
          </div>
          <div className="flex gap-6">
            <div>
              <p className="text-white/80 text-xs">Calorias</p>
              <p className="font-bold text-lg">{weeklyStats.calories} kcal</p>
            </div>
            <div>
              <p className="text-white/80 text-xs">Tempo total</p>
              <p className="font-bold text-lg">{weeklyStats.time}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-5 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <CategoryChip
              key={category.id}
              icon={category.icon}
              label={category.label}
              isActive={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            />
          ))}
        </div>
      </div>

      {/* Workouts Grid */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">
            {activeCategory === "all" ? "Treinos Populares" : categories.find(c => c.id === activeCategory)?.label}
          </h2>
          <span className="text-muted-foreground text-sm">{filteredWorkouts.length} treinos</span>
        </div>

        {filteredWorkouts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredWorkouts.map((workout) => (
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
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum treino encontrado</p>
          </div>
        )}
      </div>

      {/* Workout Detail Sheet */}
      <WorkoutSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        workout={selectedWorkout}
      />
    </div>
  );
}
