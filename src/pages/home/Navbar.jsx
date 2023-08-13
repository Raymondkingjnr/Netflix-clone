import React from "react";
import logoImg from "../../assets/logo.png";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../feature/authSlice";
import { useState } from "react";
import { AiOutlineSearch, AiOutlinePoweroff } from "react-icons/ai";

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
  {
    link: "My List",
    path: "/my-list",
  },
];

function Navbar({ isScrolled }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState(false);
  const [input, setInput] = useState(false);
  return (
    <Wrapper>
      <nav className={`${isScrolled ? "scrolled" : ""} `}>
        <main>
          <img src={logoImg} alt="logo image" />
          {links.map((item, index) => {
            const { link, path } = item;

            return (
              <Link to={path} key={index} className="nav-links">
                {link}
              </Link>
            );
          })}
        </main>
        <article>
          <div className={`search ${search ? "show-search" : "search"}`}>
            <input
              type="text"
              placeholder="Search"
              onMouseEnter={() => setInput(true)}
              onMouseLeave={() => setInput(false)}
              onBlur={() => {
                setSearch(false);
                setInput(flase);
              }}
            />
            <button
              onClick={() => setSearch(!search)}
              onBlur={() => {
                if (!input) setSearch(false);
              }}
            >
              <AiOutlineSearch />
            </button>
          </div>
          <button onClick={() => dispatch(logOutUser())}>
            <AiOutlinePoweroff />
          </button>
        </article>
      </nav>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100vw;
  /* background: rgba(0, 0, 0, 0.8); */
  .scrolled {
    background-color: black;
  }
  nav {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    position: fixed;
    z-index: 2;
    width: 100%;
  }
  nav img {
    width: 100px;
  }
  main {
    display: flex;
    gap: 10px;
  }
  article {
    display: flex;
    gap: 20px;
  }
  .nav-links {
    list-style: none;
    text-decoration: none;
    color: #fff;
    font-family: "acme";
    font-size: 25px;
  }
  button {
    background: transparent;
    border: transparent;
    outline: none;
    color: #fff;
    font-weight: bolder;
    font-weight: "acme";
    font-size: 1.4rem;
  }
  .search {
    display: flex;
    flex: 0 0 auto;
    gap: 0.4rem;
    align-items: center;
    justify-content: center;
    padding: 0.2rem;
    padding-left: 0%.5rem;
    button {
      background: transparent;
    }
    input {
      width: 0;
      visibility: hidden;
      opacity: 0;
      transform: 0.03s ease-in-out;
      background: transparent;
      border: transparent;
      color: #fff;
      &:focus {
        outline: none;
      }
    }
  }
  .show-search {
    border: 1px solid white;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 5px;
  }
  .show-search input {
    width: 100%;
    opacity: 1;
    visibility: visible;
    padding: 0.3rem;
  }
`;
export default Navbar;
