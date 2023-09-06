import React, { useState } from "react";
import movieLogo from "../../assets/strenger.png";
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

  // Navbar config
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  // Navbar config ends.

  const dispatch = useDispatch();
  const { genresLoading, movies, genres } = useSelector(
    (state) => state.netflex
  );

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoading) dispatch(fetchMovies({ genres, type: "all" }));
  }, [genresLoading]);

  // console.log(movies);

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
  background: #000;
  .container {
    position: absolute;
    bottom: 10%;
    /* z-index: 1; */
    .logo {
      width: 100%;
      /* margin-left: 1rem; */
    }
  }
  .buttons {
    margin-top: 2rem;
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
      color: #fff;
      background: red;
    }
  }
  @media screen and (max-width: 600px) {
    .container {
      .logo {
        margin-left: 0;
      }
      .logo img {
        width: 350px;
        margin-left: 0;
      }
    }

    .buttons {
      margin-left: 0;
      margin-top: 1rem;
      margin-bottom: 2rem;
      button {
        font-size: 12px;
        padding: 10px;
      }
    }
  }
  @media screen and (max-width: 400px) {
    .container {
      padding-top: 27rem;
      .logo {
        margin-left: 0;
      }
      .logo img {
        width: 200px;
        margin-left: 0;
      }
    }

    .buttons {
      margin-left: 0;
      margin-top: 1rem;
      margin-bottom: 2rem;
      button {
        font-size: 12px;
        padding: 10px;
      }
    }
  }
`;

export default Home;
