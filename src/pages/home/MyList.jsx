import React, { useState, useEffect } from "react";
import { getUserLikedMovies } from "../../feature/moviesSlice";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import Navbar from "./Navbar";
import { onAuthStateChanged } from "firebase/auth";
// import { firebaseAuth } from "../utils/firebase-config";
import firebase from "../../utils/firebase-config";
import Card from "../../components/Card";
import { useNavigate } from "react-router-dom";

const MyList = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState(undefined);
  // const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.netflex);

  // onAuthStateChanged(firebase, (currentUser) => {
  //   if (currentUser) setEmail(currentUser.email);
  //   else navigate("/landing");
  // });

  useEffect(() => {
    if (email) {
      dispatch(getUserLikedMovies(email));
    }
  }, [email]);

  // useEffect(() => {
  //   if (email) {
  //     setEmail(user.email);
  //   } else navigate("/landing");
  // }, [email]);

  return (
    <Wrapper>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="content flex column">
        <h1>My List</h1>
        <div className="grid flex">
          {movies?.map((movie, index) => {
            return <Card movieData={movie} key={index} isLiked={true} />;
          })}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: #000;
  color: #fff;
  height: 100%;
  .content {
    padding-top: 6rem;
    text-align: center;
  }
  h1 {
    padding-bottom: 2rem;
  }
  .grid {
    flex-wrap: wrap;
    gap: 1rem;
  }
`;
export default MyList;
