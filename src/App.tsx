import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CreateUserPage from "./pages/CreateUserPage";
import CreatePetPage from "./pages/CreatePetPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/create-user" element={<CreateUserPage />} />
      <Route path="/create-pet" element={<CreatePetPage />} />
    </Routes>
  );
};

export default App;
