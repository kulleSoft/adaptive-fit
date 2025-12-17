import { Home, Dumbbell, User, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "home", icon: Home, label: "Início" },
  { id: "workouts", icon: Dumbbell, label: "Treinos" },
  { id: "history", icon: Clock, label: "Histórico" },
  { id: "profile", icon: User, label: "Perfil" },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border safe-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl transition-all duration-200",
                isActive && "bg-coral-light"
              )}>
                <Icon className={cn(
                  "w-5 h-5 transition-all duration-200",
                  isActive && "text-coral"
                )} />
              </div>
              <span className={cn(
                "text-xs font-medium transition-all duration-200",
                isActive && "text-coral"
              )}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
