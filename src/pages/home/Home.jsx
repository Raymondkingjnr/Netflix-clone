import React, { useState } from "react";
import { styled } from "styled-components";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMovies, getGenres } from "../../feature/moviesSlice";
import { Slider } from "../../components";
import { MOVIE_URL } from "../../utils/constant";

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

  // const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoading) dispatch(fetchMovies({ genres, type: "all" }));
  }, [genresLoading]);

  const singleMovie = movies[0];
  console.log(singleMovie);

  return (
    <Wrapper>
      <div
        className="home"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${MOVIE_URL}${singleMovie?.image})`,
          backgroundPosition: "center",
          objectFit: "contain",
        }}
      >
        <Navbar isScrolled={isScrolled} />

        <div className="container">
          <div className="logo">
            <h1>{singleMovie?.name}</h1>
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
  h1 {
    font-size: 3rem;
    color: #fff;
  }
  background: #000;
  .container {
    position: absolute;
    bottom: 10%;
    /* z-index: 1; */
    margin-left: 2.5rem;
  }
  .buttons {
    margin-top: 2rem;
    gap: 2rem;
    button {
      font-size: 1.4rem;
      gap: 1rem;
      border-radius: 0.2rem;
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
      h1 {
        font-size: 1.2rem;
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
