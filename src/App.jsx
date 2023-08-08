import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Error from "./pages/Error";
import Landing from "./pages/Landing";
import NetflixPage from "./pages/NetflixPage";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/netflix" element={<NetflixPage />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/" element={<Landing />} />
        <Route exact path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
