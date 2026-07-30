import HomeScreen from "../components/ui/HomeScreen";
import { router } from "expo-router";

export default function Home() {
  const handleLogout = () => {
    router.replace("/");
  };

  return (
    <HomeScreen
      email="user@example.com"
      onLogout={handleLogout}
    />
  );
}