import React from "react";
import { styled } from "styled-components";
import tvImg from "../assets/tv.png";
import girlImg from "../assets/girl.jpg";
import kidsImg from "../assets/kids.png";

const Layers = () => {
  return (
    <Wrapper>
      <div className="layer-line"></div>
      <div className="tv-sec">
        <main>
          <h1>Enjoy on your TV</h1>
          <p>
            Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray
            players, and more.
          </p>
        </main>
        <img src={tvImg} alt="" />
      </div>
      <div className="layer-line"></div>
      <div className="girl-sec">
        <img src={girlImg} alt="" />
        <main>
          <h1>Download your shows to watch offline</h1>
          <p>Save your favorites easily and always have something to watch.</p>
        </main>
      </div>
      <div className="layer-line"></div>
      <div className="text-sec">
        <h1>Watch everywhere</h1>
        <p>
          Stream unlimited movies and TV shows on your phone, tablet, laptop,
          and TV.
        </p>
      </div>
      <div className="layer-line"></div>
      <div className="kids-sec">
        <img src={kidsImg} alt="" />
        <main>
          <h1>Create profiles for kids</h1>
          <p>
            Send kids on adventures with their favorite characters in a space
            made just for them—free with your membership.
          </p>
        </main>
      </div>
      <div className="layer-line"></div>
    </Wrapper>
  );
};

export default Layers;

const Wrapper = styled.section`
  background: #000;
  color: #fff;
  width: 100vw;

  .tv-sec,
  .girl-sec,
  .kids-sec {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    align-items: center;
    flex-direction: row;
    max-width: 1300px;
    margin: auto;
  }
  .girl-sec main,
  .kids-sec main,
  .tv-sec main {
    display: flex;
    flex-direction: column;
    text-align: left;
    width: 600px;
  }
  .text-sec {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: flex-start;
    width: 400px;
    margin-left: 10rem;
  }
  .text-sec > h1 {
    padding-top: 8rem;
    padding-bottom: 1.5rem;
    font-size: 40px;
    /* width: 400px; */
    line-height: 4rem;
    font-weight: 900;
    font-family: "acme";
    font-size: 3rem;
  }
  .text-sec > p {
    padding-bottom: 8rem;
    line-height: 3rem;
    font-family: "acme";
    font-size: 20px;
    /* width: 500px; */
    font-weight: 700;
  }

  @media screen and (max-width: 900px) {
    .tv-sec,
    .girl-sec,
    .kids-sec {
      flex-direction: column;
      gap: 20px;
      text-align: center;
    }

    .girl-sec main,
    .kids-sec main,
    .tv-sec main {
      text-align: center;
      width: 100%;
    }
    .tv-sec h1,
    .girl-sec h1,
    .kids-sec h1 {
      font-size: 1.8rem;
    }
    .tv-sec p,
    .girl-sec p,
    .kids-sec p {
      font-size: 18px;
    }
    .girl-sec,
    .kids-sec {
      flex-direction: column-reverse;
    }
    img {
      width: 70%;
      object-fit: contain;
    }
    .text-sec {
      justify-content: center;
      align-items: center;
      width: 100%;
      margin-left: 0;
      text-align: center;
    }
    .text-sec h1 {
      font-size: 1.8rem;
    }
    .text-sec p {
      font-size: 18px;
    }
  }

  @media screen and (max-width: 600px) {
    .text-sec p {
      font-size: 15px;
      line-height: 1.5rem;
    }
    .text-sec h1 {
      font-size: 1.5rem;
    }
    .tv-sec p,
    .girl-sec p,
    .kids-sec p {
      font-size: 15px;
    }
    .tv-sec h1,
    .girl-sec h1,
    .kids-sec h1 {
      font-size: 1.5rem;
    }
  }
`;
