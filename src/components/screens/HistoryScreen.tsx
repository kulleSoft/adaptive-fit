import { Clock, Flame, Trophy, TrendingUp, Trash2 } from "lucide-react";
import { useWorkoutHistoryContext } from "@/contexts/WorkoutHistoryContext";
import { format, isToday, isYesterday } from "date-fns";
import { ptBR } from "date-fns/locale";

function formatDateLabel(date: Date): string {
  if (isToday(date)) return "Hoje";
  if (isYesterday(date)) return "Ontem";
  return format(date, "d 'de' MMMM", { locale: ptBR });
}

function formatTime(date: Date): string {
  return format(date, "HH:mm");
}

// Group workouts by date
function groupWorkoutsByDate(history: Array<{ id: string; title: string; duration: string; calories: string; completedAt: Date }>) {
  const groups: Record<string, typeof history> = {};
  
  history.forEach((workout) => {
    const dateKey = format(workout.completedAt, "yyyy-MM-dd");
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(workout);
  });

  return Object.entries(groups).map(([dateKey, workouts]) => ({
    date: formatDateLabel(new Date(dateKey + "T12:00:00")),
    workouts,
  }));
}

export function HistoryScreen() {
  const { history, stats, clearHistory } = useWorkoutHistoryContext();
  const groupedHistory = groupWorkoutsByDate(history);

  const displayStats = [
    { icon: Trophy, label: "Treinos", value: stats.totalWorkouts.toString(), color: "text-coral" },
    { icon: Flame, label: "Calorias", value: stats.totalCalories >= 1000 ? `${(stats.totalCalories / 1000).toFixed(1)}k` : stats.totalCalories.toString(), color: "text-coral" },
    { icon: Clock, label: "Minutos", value: `${stats.totalMinutes}`, color: "text-coral" },
    { icon: TrendingUp, label: "Sequência", value: `${stats.currentStreak} dias`, color: "text-success" },
  ];

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <header className="px-5 pt-12 pb-6 safe-top">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Histórico</h1>
            <p className="text-muted-foreground text-sm">Acompanhe sua evolução</p>
          </div>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="p-2 rounded-xl bg-secondary hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </header>

      {/* Stats Grid */}
      <div className="px-5 mb-6">
        <div className="grid grid-cols-2 gap-3">
          {displayStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-card p-4 rounded-xl shadow-card"
              >
                <Icon className={`w-5 h-5 ${stat.color} mb-2`} />
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* History List */}
      <div className="px-5">
        <h2 className="text-lg font-bold text-foreground mb-4">Atividades Recentes</h2>
        
        {history.length === 0 ? (
          <div className="text-center py-12">
            <Trophy className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum treino registrado ainda</p>
            <p className="text-muted-foreground/60 text-sm mt-1">Complete seu primeiro treino para começar!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {groupedHistory.map((day, dayIndex) => (
              <div key={dayIndex}>
                <p className="text-sm font-medium text-muted-foreground mb-3">{day.date}</p>
                <div className="space-y-3">
                  {day.workouts.map((workout) => (
                    <div
                      key={workout.id}
                      className="bg-card p-4 rounded-xl shadow-card flex items-center gap-4"
                    >
                      <div className="w-12 h-12 rounded-xl bg-coral-light flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-coral" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-sm line-clamp-1">
                          {workout.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                          <span>{formatTime(workout.completedAt)}</span>
                          <span>•</span>
                          <span>{workout.duration}</span>
                          <span>•</span>
                          <span className="text-coral">{workout.calories}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
