import React from "react";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import { fetchMoviesbyGenres } from "../feature/moviesSlice";
// import { getGenres } from "../feature/moviesSlice";

const SelectGenres = ({ genres, type }) => {
  const dispatch = useDispatch();

  return (
    <Select>
      <select
        className="flex"
        onChange={(e) => {
          dispatch(
            fetchMoviesbyGenres({
              genres,
              genre: e.target.value,
              type,
            })
          );
        }}
      >
        {genres?.map((genre, index) => {
          return (
            <option value={genre.id} key={genre.id} index={index}>
              {genre.name}
            </option>
          );
        })}
      </select>
    </Select>
  );
};

const Select = styled.section`
  /* margin-left: 4rem; */
  max-width: 200px;
  margin: auto;

  select {
    cursor: pointer;
    width: 100%;
    font-size: 1.3rem;
    background: #000;
    color: #fff;
    outline: none;
    font-family: "acme";
    border: 1px gray solid;
    border-radius: 5px;
  }
  option {
    padding-top: 1rem;
    border: transparent;
  }

  @media screen and (max-width: 600px) {
    select {
      font-size: 1rem;
      padding: 10px;
    }
  }
`;

export default SelectGenres;
