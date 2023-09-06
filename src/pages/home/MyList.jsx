import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchLikedMoviesAsync } from "../../feature/moviesSlice";
import { Card } from "../../components";

const MyList = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const { MyList } = useSelector((state) => state.netflex);

  useEffect(() => {
    dispatch(fetchLikedMoviesAsync());
  }, [dispatch]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Wrapper>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="content colum">
        {/* <h1>My List</h1> */}
        <h1>{MyList.length === 0 ? "List Is Empty" : "My List"}</h1>
        <div className="grid flex">
          {MyList.map((movie, index) => {
            return (
              <Card
                movieData={movie}
                index={index}
                key={movie.id}
                isLiked={true}
              />
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #000;
  height: 100vh;
  .content {
    padding-top: 10rem;
    color: #fff;
    text-align: center;
  }
  .content h1 {
    padding-bottom: 2rem;
  }
  .grid {
    flex-wrap: wrap;
    gap: 2rem;
    background: #000;
  }
  @media screen and (max-width: 600px) {
    .content {
      padding-top: 5rem;
    }
  }
`;

export default MyList;
