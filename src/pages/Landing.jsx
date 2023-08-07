import React from "react";
// import { Header, According, Layers, Footer } from "../components/";
import { Header, According, Layers, Footer } from "../components";

const Landing = () => {
  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <Layers />
      <According />
      <Footer />
    </div>
  );
};

export default Landing;
