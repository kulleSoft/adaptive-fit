import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { MessageCircle, Mail, FileQuestion, BookOpen } from "lucide-react";

interface HelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const helpItems = [
  {
    icon: FileQuestion,
    title: "Perguntas Frequentes",
    description: "Encontre respostas para as dúvidas mais comuns",
  },
  {
    icon: BookOpen,
    title: "Como usar o app",
    description: "Guia completo de funcionalidades",
  },
  {
    icon: MessageCircle,
    title: "Chat de suporte",
    description: "Fale com nossa equipe de atendimento",
  },
  {
    icon: Mail,
    title: "Email",
    description: "suporte@fitnessapp.com",
  },
];

export function HelpDialog({ open, onOpenChange }: HelpDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-4 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Central de Ajuda</DialogTitle>
          <DialogDescription>
            Como podemos te ajudar?
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[400px]">
          <div className="space-y-3">
            {helpItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  className="w-full flex items-center gap-4 p-4 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-coral" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-coral/5 rounded-xl border border-coral/20">
            <p className="text-sm text-foreground font-medium mb-1">Versão do App</p>
            <p className="text-xs text-muted-foreground">1.0.0</p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
