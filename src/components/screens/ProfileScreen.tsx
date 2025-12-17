import { User, Settings, Bell, HelpCircle, LogOut, ChevronRight, Award, Target } from "lucide-react";
import { Button } from "../ui/button";

const menuItems = [
  { icon: User, label: "Editar Perfil", href: "#" },
  { icon: Target, label: "Minhas Metas", href: "#" },
  { icon: Award, label: "Conquistas", href: "#", badge: "3 novas" },
  { icon: Bell, label: "Notificações", href: "#" },
  { icon: Settings, label: "Configurações", href: "#" },
  { icon: HelpCircle, label: "Ajuda", href: "#" },
];

const achievements = [
  { emoji: "🔥", label: "7 dias seguidos" },
  { emoji: "💪", label: "100 treinos" },
  { emoji: "⚡", label: "5000 kcal" },
];

export function ProfileScreen() {
  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <header className="px-5 pt-12 pb-6 safe-top">
        <h1 className="text-2xl font-bold text-foreground">Perfil</h1>
      </header>

      {/* Profile Card */}
      <div className="px-5 mb-6">
        <div className="bg-card p-6 rounded-2xl shadow-card text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-coral to-coral-dark mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            JM
          </div>
          <h2 className="text-xl font-bold text-foreground">João Marcos</h2>
          <p className="text-muted-foreground text-sm mb-4">joao@email.com</p>
          
          <div className="flex justify-center gap-8 pt-4 border-t border-border">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">127</p>
              <p className="text-xs text-muted-foreground">Treinos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">45.2k</p>
              <p className="text-xs text-muted-foreground">Calorias</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-coral">12</p>
              <p className="text-xs text-muted-foreground">Sequência</p>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="px-5 mb-6">
        <h3 className="font-bold text-foreground mb-3">Conquistas Recentes</h3>
        <div className="flex gap-3">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="flex-1 bg-card p-4 rounded-xl shadow-card text-center"
            >
              <span className="text-2xl mb-2 block">{achievement.emoji}</span>
              <p className="text-xs text-muted-foreground">{achievement.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div className="px-5 mb-6">
        <div className="bg-card rounded-2xl shadow-card overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                className="w-full flex items-center gap-4 p-4 hover:bg-secondary transition-colors text-left border-b border-border last:border-b-0"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                  <Icon className="w-5 h-5 text-foreground" />
                </div>
                <span className="flex-1 font-medium text-foreground">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-1 bg-coral-light text-coral text-xs font-medium rounded-full">
                    {item.badge}
                  </span>
                )}
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Logout */}
      <div className="px-5">
        <Button variant="outline" className="w-full text-destructive hover:text-destructive hover:bg-destructive/5">
          <LogOut className="w-5 h-5" />
          Sair da conta
        </Button>
      </div>
    </div>
  );
}
