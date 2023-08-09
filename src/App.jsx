import React from "react";
import { Routes, Route, BrowserRouter, Outlet } from "react-router-dom";
import { Home, Navbar, Movies, TvSeries } from "./pages/home";
import { Error, ProtectedRoute, Signup, Landing } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <Navbar />
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route exact path="/movies" element={<Movies />} />
          <Route exact path="/tv-series" element={<TvSeries />} />
        </Route>

        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/landing" element={<Landing />} />
        <Route exact path="*" element={<Error />} />
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
}

export default App;
