import React from "react";
import Card from "./Card";
import { styled } from "styled-components";
// import { useState } from "react";
// import { useRef } from "react";
// import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const CardSlider = ({ data, title }) => {
  // const [showControls, setShowControls] = useState(false);
  // const [sliderPostion, setSliderPosition] = useState(0);

  // const scrollRef = useRef(null);

  // const scroll = (direction) => {
  //   const { current } = scrollRef;
  //   console.log(current, direction);

  //   if (direction === "left") {
  //     current.scrollLeft -= 300;
  //   } else {
  //     current.scrollLeft += 300;
  //   }
  // };

  return (
    <Wrapper
      className="flex column"
      // onMouseEnter={() => setShowControls(true)}
      // onMouseLeave={() => setShowControls(false)}
    >
      <h1>{title}</h1>
      <div className="wrapper">
        {/* <div
          className={`slider-action left ${
            !showControls ? "none" : ""
          } flex j-center a-center`}
        >
          {" "}
          <AiOutlineLeft
            onClick={() => scroll("left")}
            style={{ color: "#Fff" }}
          />
        </div> */}
        <div className="flex slider">
          {data?.map((movie, index) => {
            return <Card movieData={movie} index={index} key={movie.id} />;
          })}
        </div>
        {/* <div
          className={`slider-action right ${
            !showControls ? "none" : ""
          } flex j-center a-center`}
        >
          {" "}
          <AiOutlineRight
            onClick={() => scroll("right")}
            style={{ color: "#Fff" }}
          />
        </div> */}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  gap: 1rem;
  position: relative;
  padding: 2rem 0;

  h1 {
    color: #fff;
    font-size: 2.5rem;
    margin-left: 20px;
  }
  .wrapper {
    width: 100%;
    overflow-x: scroll;
    -ms-overflow-style: none;
    overscroll-behavior-inline: content;
    scrollbar-width: none;
  }
  .wrapper::-webkit-scrollbar {
    display: none;
  }
  .slider {
    width: max-content;
    gap: 1.5rem;
    /* transform: translate(0px); */
    transition: 0.3s ease-in-out;
    margin-left: 20px;
  }

  .slider-action {
    position: absolute;
    z-index: 99;
    height: 100%;
    top: 0;
    bottom: 0;
    width: 50px;
    transition: 0.3s ease-in-out;
    svg {
      font-size: 2.5rem;
      cursor: pointer;
    }
  }

  .none {
    display: none;
  }
  .left {
    left: 0;
  }
  .right {
    right: 0;
  }
  @media screen and (max-width: 650px) {
    h1 {
      font-size: 1.2rem;
    }
  }
`;

export default CardSlider;
