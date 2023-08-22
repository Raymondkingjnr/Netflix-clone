import React from "react";
import { styled } from "styled-components";
import { toggleSidebar } from "../feature/moviesSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = ({ links }) => {
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleSidebar());
  };
  console.log(links);

  return <Wrapper></Wrapper>;
};

const Wrapper = styled.div``;

export default Sidebar;
