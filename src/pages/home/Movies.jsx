import React, { useState, useEffect } from "react";
import { fetchMovies, getGenres } from "../../feature/moviesSlice";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
// import Navbar from "./Navbar";
import { Slider, Empty } from "../../components";
import SelectGenres from "../../components/SelectGenres";
import Loading from "../../components/Loading";

const Movies = () => {
  // const navigate = useNavigate();

  // const [isScrolled, setIsScrolled] = useState(false);

  // window.onscroll = () => {
  //   setIsScrolled(window.pageYOffset === 0 ? false : true);
  //   return () => (window.onscroll = null);
  // };

  const dispatch = useDispatch();
  const { genresLoading, movies, genres } = useSelector(
    (state) => state.netflex
  );

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoading) dispatch(fetchMovies({ genres, type: "movie" }));
  }, [genresLoading]);

  if (genresLoading) {
    return <Loading />;
  }
  return (
    <Wrapper>
      {/* <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div> */}
      <div className="data">
        <SelectGenres genres={genres} type="movie" />
        {movies?.length ? <Slider movies={movies} /> : <Empty />}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: #000;
  .data {
    padding-top: 8rem;
  }
`;

export default Movies;
