import React from "react";
import logoImg from "../../assets/logo.png";
import { styled } from "styled-components";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../feature/authSlice";
// import { useState } from "react";
import { AiOutlineSearch, AiOutlinePoweroff } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { toggleSidebar } from "../../feature/moviesSlice";
import Sidebar from "../../components/Sidebar";
import links from "../../utils/constant";

function Navbar({ isScrolled }) {
  const dispatch = useDispatch();
  // const [search, setSearch] = useState(false);
  // const [input, setInput] = useState(false);
  const { isSidebarOpen } = useSelector((state) => state.netflex);

  const toggle = () => {
    dispatch(toggleSidebar());
  };
  return (
    <Wrapper>
      <div className="top-nav">
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
            <Link to="/search" className="search">
              <AiOutlineSearch />
            </Link>
            <button onClick={() => dispatch(logOutUser())}>
              <AiOutlinePoweroff />
            </button>
          </article>
        </nav>
        <div className="open-nav">
          <Link to="/search" className="search">
            <AiOutlineSearch />
          </Link>

          <GiHamburgerMenu onClick={toggle} className="toggle" />
        </div>

        <div
          className={`${isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}`}
        >
          <Sidebar />
        </div>
      </div>
      <Outlet />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100vw;
  .scrolled {
    transition: 0.3s ease-in-out;
    background-color: black;
  }

  .open-nav {
    position: absolute;
    z-index: 1;
    align-items: center;
    justify-content: center;
    gap: 20px;
    right: 0;
    padding-right: 1rem;
    padding-top: 1rem;
    display: flex;
    visibility: hidden;
  }
  .toggle {
    font-size: 25px;
    font-weight: 900;
    color: #e80606;
  }
  button {
    background: transparent;
    color: red;
    font-size: 25px;
  }
  nav {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    position: fixed;
    top: 0;
    z-index: 2;
    width: 100%;
  }
  nav img {
    width: 100px;
    object-fit: contain;
  }
  main {
    display: flex;
    gap: 10px;
  }
  article {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
  .nav-links {
    list-style: none;
    text-decoration: none;
    color: #fff;
    font-family: "acme";
    font-size: 25px;
  }

  .search {
    color: #fff;
    align-items: center;
    justify-content: center;
    padding: 0.2rem;
    padding-left: 0%.5rem;
    font-size: 26px;
  }
  .sidebar {
    width: 100%;
    height: 100%;
    background: #000;
    top: 0%;
    left: 0%;
    position: fixed;
    color: #fff;
    transform: translate(-100%);
    transition: all 0.3s linear;
    padding: 35px;
    z-index: 15;
    display: none;
  }
  .show-sidebar {
    transform: translate(0);
  }
  @media screen and (max-width: 600px) {
    nav {
      display: none;
    }
    .open-nav {
      visibility: visible;
    }
    .sidebar {
      display: block;
    }
  }
`;
export default Navbar;
