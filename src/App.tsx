import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
// import CreateUser from "./pages/CreateUser";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/create-user" element={<CreateUser />} /> */}
    </Routes>
  );
};

export default App;
