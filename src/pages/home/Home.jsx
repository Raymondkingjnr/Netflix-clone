import React, { useState } from "react";
import movieLogo from "../../assets/homeTitle.webp";
import { styled } from "styled-components";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMovies, getGenres } from "../../feature/moviesSlice";
import { Slider } from "../../components";

function Home() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const dispatch = useDispatch();
  const { genresLoading, movies } = useSelector((state) => state.netflex);

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoading) dispatch(fetchMovies({ type: "all" }));
  });

  // useEffect(() => {
  //   dispatch(fetchMovies());
  // }, [dispatch]);

  console.log(movies);

  return (
    <Wrapper>
      <div className="home">
        <Navbar isScrolled={isScrolled} />

        <div className="container">
          <div className="logo">
            <img src={movieLogo} alt="" />
          </div>

          <div className="flex buttons">
            <button
              className="flex j-center a-center"
              onClick={() => navigate("/player")}
            >
              <FaPlay /> Play
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle /> More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies} />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100vw;
  .container {
    position: absolute;
    bottom: 5rem;
    z-index: 1;
    .logo {
      margin-left: 4rem;
    }
  }
  .buttons {
    margin: 5rem;
    gap: 2rem;
    button {
      font-size: 1.4rem;
      gap: 1rem;
      border-radius: 0%.2rem;
      font-family: "acme";
      padding: 0.5rem;
      padding-left: 2rem;
      padding-right: 2.4rem;
      border: transparent;
    }
  }
`;

export default Home;
