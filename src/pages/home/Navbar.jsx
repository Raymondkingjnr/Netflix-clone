import React from "react";
import logoImg from "../../assets/logo.png";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../feature/authSlice";

const links = [
  {
    link: "Home",
    path: "/",
  },
  {
    link: "Tv Series",
    path: "/tv-series",
  },
  {
    link: "Movies",
    path: "/movies",
  },
];

function Navbar() {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <nav>
        <img src={logoImg} alt="logo image" />
        <main>
          {links.map((item, index) => {
            const { link, path } = item;

            return (
              <Link to={path} key={index}>
                {link}
              </Link>
            );
          })}
        </main>
        <button onClick={() => dispatch(logOutUser())}>Log out</button>
      </nav>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100vw;
  nav {
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }
  nav img {
    width: 100px;
  }
`;

export default Navbar;
