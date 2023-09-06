import React, { useState, useEffect, useMemo } from "react";
import { styled } from "styled-components";
import { Card } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import {
  fetchMoviesbySearch,
  getGenres,
  setQuery,
} from "../../feature/moviesSlice";
// import Loading from "../../components/Loading";
import { Form } from "react-bootstrap";
// import axios from "axios";
// import { API_KEY, TMDB_BASE_URL } from "../../utils/constant";

const SearchPage = () => {
  const [localSearch, setLocalSearch] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const { movies, genres, query, genresLoading } = useSelector(
    (state) => state.netflex
  );

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    dispatch(fetchMoviesbySearch({ genres, query }));
  }, [query, genres]);

  const searchMovies = (e) => {
    e.preventDefault();
  };

  const debounce = () => {
    let timeOutId;

    return (e) => {
      setLocalSearch(e.target.value);
      timeOutId = setTimeout(() => {
        // setInputValue(e.target.value);
        dispatch(setQuery(e.target.value));
      }, 2000);
    };
  };

  const optimizedDebounce = useMemo(() => debounce(), []);

  if (genresLoading) {
    return <div className="loading"></div>;
  }

  return (
    <Wrapper>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>
      <form onSubmit={searchMovies}>
        <Form.Control
          type="text"
          value={localSearch || ""}
          onChange={optimizedDebounce}
          placeholder="Search movie"
          className="search_input"
        />

        {/* <button type="submit">search</button> */}
      </form>
      <div className="grid flex">
        {movies?.map((movie, index) => {
          return <Card movieData={movie} index={index} key={movie.id} />;
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: #000;
  height: 100vh;
  .search_input {
    margin: 6rem auto;
    max-width: 500px;
    font-family: "acme";
    padding: 0.5rem;
  }
  .grid {
    flex-wrap: wrap;
    gap: 2rem;
    background: #000;
    padding-top: 2.5rem;
  }
  @media screen and (max-width: 500px) {
    .search_input {
      padding: 1rem;
      max-width: 300px;
    }
  }
`;
export default SearchPage;

// const fetchMovies = async (searchKey) => {
//     const type = searchKey ? "search" : "discover/movie";
//     try {
//       const { data: results } = await axios.get(
//         `${TMDB_BASE_URL}/${type}?api_key=${API_KEY}`
//       );

//       setMovies(results.results);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
