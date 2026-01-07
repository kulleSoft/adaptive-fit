import { useState } from "react";
import { Drawer } from "vaul";
import { X, Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useCustomWorkoutsContext } from "@/contexts/CustomWorkoutsContext";
import { toast } from "sonner";

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
}

interface CreateWorkoutSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const levels = ["Iniciante", "Intermediário", "Avançado"] as const;

export function CreateWorkoutSheet({ open, onOpenChange }: CreateWorkoutSheetProps) {
  const { addWorkout } = useCustomWorkoutsContext();
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");
  const [level, setLevel] = useState<typeof levels[number]>("Intermediário");
  const [description, setDescription] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([
    { name: "", sets: "3", reps: "12", rest: "60s" }
  ]);

  const addExercise = () => {
    setExercises([...exercises, { name: "", sets: "3", reps: "12", rest: "60s" }]);
  };

  const updateExercise = (index: number, field: keyof Exercise, value: string) => {
    const updated = [...exercises];
    updated[index][field] = value;
    setExercises(updated);
  };

  const removeExercise = (index: number) => {
    if (exercises.length > 1) {
      setExercises(exercises.filter((_, i) => i !== index));
    }
  };

  const resetForm = () => {
    setTitle("");
    setDuration("");
    setCalories("");
    setLevel("Intermediário");
    setDescription("");
    setExercises([{ name: "", sets: "3", reps: "12", rest: "60s" }]);
  };

  const handleCreate = () => {
    if (!title.trim()) {
      toast.error("Digite um nome para o treino");
      return;
    }

    const validExercises = exercises.filter(e => e.name.trim());
    if (validExercises.length === 0) {
      toast.error("Adicione pelo menos um exercício");
      return;
    }

    addWorkout({
      title: title.trim(),
      duration: duration.trim() || "30 min",
      calories: calories.trim() || "200 kcal",
      level,
      description: description.trim() || `Treino personalizado: ${title}`,
      exercises: validExercises,
    });

    toast.success("Treino criado!", {
      description: `${title} foi adicionado aos seus treinos.`,
    });

    resetForm();
    onOpenChange(false);
  };

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-foreground/40 z-50" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 mt-24 flex h-[90%] flex-col rounded-t-3xl bg-background">
          <div className="flex-1 overflow-auto">
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 rounded-full bg-muted-foreground/20" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">Criar Novo Treino</h2>
              <button
                onClick={() => onOpenChange(false)}
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <div className="px-5 py-6 space-y-6 mb-32">
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Nome do Treino *
                  </label>
                  <Input
                    placeholder="Ex: Treino de Costas"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Duração
                    </label>
                    <Input
                      placeholder="Ex: 45 min"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Calorias
                    </label>
                    <Input
                      placeholder="Ex: 300 kcal"
                      value={calories}
                      onChange={(e) => setCalories(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Nível
                  </label>
                  <div className="flex gap-2">
                    {levels.map((l) => (
                      <button
                        key={l}
                        onClick={() => setLevel(l)}
                        className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                          level === l
                            ? "bg-coral text-white"
                            : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Descrição
                  </label>
                  <Input
                    placeholder="Descreva seu treino..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              {/* Exercises */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-foreground">Exercícios</h3>
                  <Button variant="coral-outline" size="sm" onClick={addExercise}>
                    <Plus className="w-4 h-4" />
                    Adicionar
                  </Button>
                </div>

                <div className="space-y-4">
                  {exercises.map((exercise, index) => (
                    <div key={index} className="p-4 bg-card rounded-xl shadow-card space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-coral-light flex items-center justify-center text-coral font-bold text-sm">
                          {index + 1}
                        </div>
                        <Input
                          placeholder="Nome do exercício"
                          value={exercise.name}
                          onChange={(e) => updateExercise(index, "name", e.target.value)}
                          className="flex-1"
                        />
                        {exercises.length > 1 && (
                          <button
                            onClick={() => removeExercise(index)}
                            className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="text-xs text-muted-foreground">Séries</label>
                          <Input
                            placeholder="3"
                            value={exercise.sets}
                            onChange={(e) => updateExercise(index, "sets", e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">Reps</label>
                          <Input
                            placeholder="12"
                            value={exercise.reps}
                            onChange={(e) => updateExercise(index, "reps", e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">Descanso</label>
                          <Input
                            placeholder="60s"
                            value={exercise.rest}
                            onChange={(e) => updateExercise(index, "rest", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Fixed Bottom Button */}
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-background via-background to-transparent pt-10 safe-bottom">
            <Button variant="coral" size="lg" className="w-full" onClick={handleCreate}>
              Criar Treino
            </Button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
