import React from "react";
import { Routes, Route, BrowserRouter, Outlet } from "react-router-dom";
// import Navbar from "./pages/home/Navbar";
import { Home, Movies, TvSeries, MyList, SearchPage } from "./pages/home";
import { Error, ProtectedRoute, Signup, Landing, Player } from "./pages";
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
              <Outlet></Outlet>
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route exact path="/movies" element={<Movies />} />
          <Route exact path="/tv-series" element={<TvSeries />} />
          <Route exact path="/my-list" element={<MyList />} />
          <Route exact path="/search" element={<SearchPage />} />
        </Route>
        <Route exact path="/player" element={<Player />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/landing" element={<Landing />} />
        <Route exact path="*" element={<Error />} />
      </Routes>
      <ToastContainer
        position="top-center"
        theme="dark"
        progressClassName="custom-progress-bar"
      />
    </BrowserRouter>
  );
}

export default App;
