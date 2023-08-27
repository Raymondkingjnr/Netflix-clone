import React from "react";
import { styled } from "styled-components";
import { toggleSidebar } from "../feature/moviesSlice";
import { useDispatch } from "react-redux";
import links from "../utils/constant";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

const Sidebar = () => {
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Wrapper>
      <main>
        <article>
          <AiOutlineClose onClick={toggle} />
        </article>
        <aside>
          {links.map((item, index) => {
            const { link, path } = item;
            return (
              <Link to={path} key={index} className="links" onClick={toggle}>
                {link}
              </Link>
            );
          })}
        </aside>
      </main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  article {
    font-size: 2rem;
    color: red;
    font-family: "acme";
    float: right;
    font-weight: 900;
    position: absolute;
    right: 3%;
  }
  main {
    display: flex;
    flex-direction: column;
  }
  aside {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 8rem;
    gap: 2rem;
  }
  .links {
    color: #fff;
    list-style: none;
    text-decoration: none;
    font-size: 15px;
    font-weight: 700;
    font-family: "acme";
  }
`;

export default Sidebar;
