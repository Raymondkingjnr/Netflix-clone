import React from "react";
import Card from "./Card";

const CardSlider = ({ data, title }) => {
  return (
    <div style={{ background: "#000" }}>
      {data?.map((movie, index) => {
        return <Card movieData={movie} index={index} key={movie.id} />;
      })}
    </div>
  );
};

export default CardSlider;
