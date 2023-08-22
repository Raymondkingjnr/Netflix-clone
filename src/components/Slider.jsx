import React from "react";
import CardSlider from "./CardSlider";

const Slider = ({ movies }) => {
  const getMoviesFromRange = (from, to) => {
    return movies?.slice(from, to);
  };

  return (
    <div style={{ background: "#000" }}>
      <CardSlider title="Trending Now" data={getMoviesFromRange(0, 10)} />
      <CardSlider title="New Releases" data={getMoviesFromRange(10, 20)} />
      <CardSlider
        title="Blockbuster Movies"
        data={getMoviesFromRange(20, 30)}
      />
      <CardSlider
        title="Populer On NetFlix"
        data={getMoviesFromRange(30, 40)}
      />
      <CardSlider title="Action Movies" data={getMoviesFromRange(40, 50)} />
      <CardSlider title="Epics" data={getMoviesFromRange(50, 60)} />
      <CardSlider title="Sci-fic" data={getMoviesFromRange(60, 70)} />
      <CardSlider title="documentries" data={getMoviesFromRange(70, 80)} />
      <CardSlider title="Award Winning" data={getMoviesFromRange(80, 90)} />
      <CardSlider title="Comedy" data={getMoviesFromRange(90, 100)} />
    </div>
  );
};

export default Slider;
