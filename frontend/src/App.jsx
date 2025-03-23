import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./components/Dashboard";
import TripForm from "./components/TripForm";
import Leaderboard from "./components/Leaderboard";

function App() {
  console.log("App component is rendering");

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/trip-form" element={<TripForm />} /> 
        <Route path="/leaderboard" element={<Leaderboard />} /> 
      </Routes>
    </>
  );
}

export default App;

