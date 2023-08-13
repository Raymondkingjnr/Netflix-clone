import React from "react";
import { styled } from "styled-components";
import video from "../assets/video.mp4";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const Player = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        <video src={video} autoPlay loop controls muted></video>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .player {
    width: 100vw;
    height: 100vh;
    .back {
      position: absolute;
      padding: 2rem;
      z-index: 1;
    }
  }
  video {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

export default Player;
