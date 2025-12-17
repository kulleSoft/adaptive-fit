import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { HomeScreen } from "@/components/screens/HomeScreen";
import { WorkoutsScreen } from "@/components/screens/WorkoutsScreen";
import { HistoryScreen } from "@/components/screens/HistoryScreen";
import { ProfileScreen } from "@/components/screens/ProfileScreen";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen />;
      case "workouts":
        return <WorkoutsScreen />;
      case "history":
        return <HistoryScreen />;
      case "profile":
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto relative">
      {renderScreen()}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
