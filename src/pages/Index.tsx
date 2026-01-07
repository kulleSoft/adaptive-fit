import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { HomeScreen } from "@/components/screens/HomeScreen";
import { WorkoutsScreen } from "@/components/screens/WorkoutsScreen";
import { HistoryScreen } from "@/components/screens/HistoryScreen";
import { ProfileScreen } from "@/components/screens/ProfileScreen";
import { TermsDialog, useTermsDialog } from "@/components/TermsDialog";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const { showTerms, setShowTerms } = useTermsDialog();

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen />;
      case "workouts":
        return <WorkoutsScreen />;
      case "history":
        return <HistoryScreen />;
      case "profile":
        return <ProfileScreen onOpenTerms={() => setShowTerms(true)} />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto relative">
      <TermsDialog />
      <TermsDialog open={showTerms} onOpenChange={setShowTerms} isReadOnly />
      {renderScreen()}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
