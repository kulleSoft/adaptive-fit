import { Clock, Flame, Trophy, TrendingUp } from "lucide-react";

const historyData = [
  {
    date: "Hoje",
    workouts: [
      {
        id: 1,
        title: "Treino de Peito e Tríceps",
        time: "08:30",
        duration: "45 min",
        calories: "320 kcal",
      },
    ],
  },
  {
    date: "Ontem",
    workouts: [
      {
        id: 2,
        title: "HIIT Queima de Gordura",
        time: "07:00",
        duration: "25 min",
        calories: "400 kcal",
      },
      {
        id: 3,
        title: "Yoga para Flexibilidade",
        time: "19:30",
        duration: "30 min",
        calories: "150 kcal",
      },
    ],
  },
  {
    date: "15 de Dezembro",
    workouts: [
      {
        id: 4,
        title: "Treino de Pernas Completo",
        time: "06:00",
        duration: "50 min",
        calories: "450 kcal",
      },
    ],
  },
];

const stats = [
  { icon: Trophy, label: "Treinos", value: "127", color: "text-coral" },
  { icon: Flame, label: "Calorias", value: "45.2k", color: "text-coral" },
  { icon: Clock, label: "Horas", value: "89h", color: "text-coral" },
  { icon: TrendingUp, label: "Sequência", value: "12 dias", color: "text-success" },
];

export function HistoryScreen() {
  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <header className="px-5 pt-12 pb-6 safe-top">
        <h1 className="text-2xl font-bold text-foreground">Histórico</h1>
        <p className="text-muted-foreground text-sm">Acompanhe sua evolução</p>
      </header>

      {/* Stats Grid */}
      <div className="px-5 mb-6">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => {
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
        
        <div className="space-y-6">
          {historyData.map((day, dayIndex) => (
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
                        <span>{workout.time}</span>
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
      </div>
    </div>
  );
}
