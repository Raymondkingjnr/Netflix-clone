import React, { useEffect, useState } from "react";
import { fetchMovies, getGenres } from "../../feature/moviesSlice";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import Navbar from "./Navbar";

import { Slider, Empty } from "../../components";
import SelectGenres from "../../components/SelectGenres";
import Loading from "../../components/Loading";

const TvSeries = () => {
  // const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const dispatch = useDispatch();
  const { genresLoading, movies, genres } = useSelector(
    (state) => state.netflex
  );

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoading) dispatch(fetchMovies({ genres, type: "tv" }));
  }, [genresLoading]);

  if (genresLoading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="title">
        <h2>Tv Series:</h2>
      </div>
      <div className="data">
        <SelectGenres genres={genres} type="tv" />
        {movies?.length ? <Slider movies={movies} /> : <Empty />}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: #000;
  .data {
    padding-top: 2rem;
  }
  .title {
    text-align: center;
  }
  .title h2 {
    color: #fff;
    padding-top: 5rem;
  }
`;

export default TvSeries;
