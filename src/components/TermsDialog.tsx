import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

interface TermsDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  isReadOnly?: boolean;
}

const TERMS_ACCEPTED_KEY = "terms_accepted";

export function TermsDialog({ open, onOpenChange, isReadOnly = false }: TermsDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  useEffect(() => {
    if (!isReadOnly) {
      const accepted = localStorage.getItem(TERMS_ACCEPTED_KEY);
      if (!accepted) {
        setInternalOpen(true);
      }
    }
  }, [isReadOnly]);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const handleAccept = () => {
    localStorage.setItem(TERMS_ACCEPTED_KEY, "true");
    if (isControlled) {
      onOpenChange?.(false);
    } else {
      setInternalOpen(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (isReadOnly) {
      onOpenChange?.(newOpen);
    }
    // If not read-only mode, don't allow closing without accepting
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md mx-4 rounded-2xl" onPointerDownOutside={(e) => !isReadOnly && e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            Termos de Uso
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Por favor, leia e aceite nossos termos para continuar
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[300px] pr-4">
          <div className="space-y-4 text-sm text-foreground/80">
            <section>
              <h3 className="font-semibold text-foreground mb-2">1. Aceitação dos Termos</h3>
              <p>
                Ao utilizar este aplicativo, você concorda com estes termos de uso. 
                Se você não concordar com qualquer parte destes termos, não utilize o aplicativo.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">2. Uso do Aplicativo</h3>
              <p>
                Este aplicativo é destinado para fins de acompanhamento de exercícios físicos. 
                Consulte um profissional de saúde antes de iniciar qualquer programa de exercícios.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">3. Exibição de Anúncios</h3>
              <p className="text-coral font-medium">
                Este aplicativo exibe anúncios publicitários para manter o serviço gratuito. 
                Os anúncios podem aparecer durante o uso do aplicativo em diferentes formatos, 
                incluindo banners e anúncios intersticiais.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">4. Privacidade</h3>
              <p>
                Respeitamos sua privacidade. Os dados do aplicativo são armazenados localmente 
                no seu dispositivo. Não compartilhamos suas informações pessoais com terceiros.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">5. Limitação de Responsabilidade</h3>
              <p>
                O aplicativo é fornecido "como está". Não nos responsabilizamos por lesões 
                ou danos resultantes do uso das informações fornecidas.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">6. Alterações nos Termos</h3>
              <p>
                Reservamos o direito de modificar estes termos a qualquer momento. 
                Alterações entram em vigor imediatamente após a publicação.
              </p>
            </section>
          </div>
        </ScrollArea>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          {isReadOnly ? (
            <Button onClick={() => onOpenChange?.(false)} className="w-full">
              Fechar
            </Button>
          ) : (
            <Button onClick={handleAccept} className="w-full">
              Li e Aceito os Termos
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function useTermsDialog() {
  const [showTerms, setShowTerms] = useState(false);

  const openTerms = () => setShowTerms(true);
  const closeTerms = () => setShowTerms(false);

  return { showTerms, openTerms, closeTerms, setShowTerms };
}
