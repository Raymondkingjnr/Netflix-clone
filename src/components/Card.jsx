import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Modal from "react-bootstrap/Modal";
import { Col, ModalBody, Row } from "react-bootstrap";
import { RiThumbDownFill, RiThumbUpFill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { MOVIE_URL } from "../utils/constant";
import { useSelector, useDispatch } from "react-redux";
import {
  addLikedMoviesAsync,
  deleteLikedMovieAsync,
} from "../feature/moviesSlice";

const Card = ({ movieData, isLiked }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClose = () => {
    setShow(false);
    setSelectedItem(null); // Clear the selected item when the modal is closed
  };

  const handleShow = (item) => {
    setSelectedItem(item); // Set the selected item when the button is clicked
    setShow(true);
  };

  const handleLike = () => {
    if (isLiked) {
      dispatch(deleteLikedMovieAsync(movieData.id));
    } else {
      dispatch(addLikedMoviesAsync(movieData));
    }
  };

  // const handleLike = () => {
  //   const movieToAdd = {
  //     id: movieData.id, // Ensure the 'id' field is defined
  //     title: movieData.title,
  //     genre: movieData.genre,
  //     image: movieData.image,
  //   };

  //   if (isLiked) {
  //     dispatch(deleteLikedMovieAsync(movie.id));
  //   } else {
  //     dispatch(addLikedMoviesAsync(movieToAdd));
  //   }
  // };

  return (
    <Wrapper>
      <img
        src={`${MOVIE_URL}${movieData.posters}`}
        alt=""
        key={movieData.id}
        onClick={() => handleShow(movieData)}
        className="img"
      />

      <Modal
        show={show}
        onHide={handleClose}
        centered={true}
        size="xl"
        fullscreen="xl-down"
      >
        <div
          style={{
            background: "#000",
            padding: "10px",
            width: "100%",
          }}
        >
          <AiOutlineClose
            onClick={handleClose}
            style={{
              fontSize: "2rem",
              color: "red",
              float: "right",
              fontWeight: "800",
              cursor: "pointer",
              marginRight: "1rem",
            }}
          />
        </div>
        <ModalBody
          style={{
            background: "#000",
            color: "#fff",
          }}
        >
          <Row className="row">
            <Col md={4}>
              <div className="modal-img">
                <img
                  src={`${MOVIE_URL}${movieData.image}`}
                  alt={movieData.title || movieData.name}
                  className="modal-img"
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="text">
                <Modal.Title style={{ display: "flex", gap: "1rem" }}>
                  <h1>{movieData.name}</h1> <span>({movieData.date})</span>
                </Modal.Title>
                <p>{movieData.tag}</p>
                <p>{movieData.text}</p>
                <div className="control flex">
                  <RiThumbUpFill title="like" style={{ cursor: "pointer" }} />
                  <RiThumbDownFill
                    title="Dislike"
                    style={{ cursor: "pointer" }}
                  />
                  <button onClick={handleLike}>
                    {isLiked ? (
                      <BsCheck
                        title="Remove from List"
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <AiOutlinePlus
                        title="Add to my List"
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </button>
                </div>
                <ul className="genres">
                  <div className="genre_text">
                    {movieData.genres?.map((genre) => {
                      return <p key={genre}>{genre}</p>;
                    })}
                  </div>
                </ul>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: #000;
  max-width: 300px;
  margin: auto;
  width: 300px;
  cursor: pointer;
  .img {
    border-radius: 5px;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  @media screen and (max-width: 600px) {
    max-width: 150px;
    margin: auto;
    width: 150px;
    border: 5px;
  }
  img {
    width: 20%;
    height: 20%;
  }
`;

export default Card;
