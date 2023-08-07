import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import NetflixPage from "./pages/NetflixPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<NetflixPage />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/landing" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
