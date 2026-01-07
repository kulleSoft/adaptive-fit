import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Switch } from "./ui/switch";
import { Bell, Moon, Volume2, Vibrate, Globe } from "lucide-react";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Settings {
  notifications: boolean;
  darkMode: boolean;
  sound: boolean;
  vibration: boolean;
}

const SETTINGS_KEY = "app_settings";

const defaultSettings: Settings = {
  notifications: true,
  darkMode: false,
  sound: true,
  vibration: true,
};

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const updateSetting = (key: keyof Settings, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
  };

  const settingsItems = [
    {
      icon: Bell,
      title: "Notificações",
      description: "Receba lembretes de treino",
      key: "notifications" as keyof Settings,
    },
    {
      icon: Moon,
      title: "Modo Escuro",
      description: "Tema escuro para o app",
      key: "darkMode" as keyof Settings,
    },
    {
      icon: Volume2,
      title: "Sons",
      description: "Efeitos sonoros do app",
      key: "sound" as keyof Settings,
    },
    {
      icon: Vibrate,
      title: "Vibração",
      description: "Feedback tátil",
      key: "vibration" as keyof Settings,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-4 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Configurações</DialogTitle>
          <DialogDescription>
            Personalize sua experiência
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[400px]">
          <div className="space-y-1">
            {settingsItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.key}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <Icon className="w-5 h-5 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch
                    checked={settings[item.key]}
                    onCheckedChange={(checked) => updateSetting(item.key, checked)}
                  />
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                <Globe className="w-5 h-5 text-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Idioma</p>
                <p className="text-sm text-muted-foreground">Português (Brasil)</p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
