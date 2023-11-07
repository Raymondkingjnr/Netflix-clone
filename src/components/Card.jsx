import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Modal from "react-bootstrap/Modal";
import { Col, ModalBody, Row } from "react-bootstrap";
// import { RiThumbDownFill, RiThumbUpFill } from "react-icons/ri";
// import { BsCheck } from "react-icons/bs";
// import { BiSolidError } from "react-icons/bi";
import {
  AiOutlineClose,
  // AiOutlinePlus,
  AiOutlineYoutube,
} from "react-icons/ai";
import { MOVIE_URL, TMDB_BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import Youtube from "react-youtube";
// import {
//   addLikedMoviesAsync,
//   deleteLikedMovieAsync,
// } from "../feature/moviesSlice";
import axios from "axios";
//isLiked = false
const Card = ({ movieData }) => {
  // const { user } = useSelector((state) => state.auth);

  // const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [selectMovie, setSelectMovie] = useState(null);
  const [type, set_type] = useState(0);
  const [playTrailer, setPlayTrailer] = useState(false);

  const fetchmovie = async (id) => {
    try {
      const { data } = await axios.get(
        `${TMDB_BASE_URL}/${type ? "tv" : "movie"}/${id}?api_key=${
          import.meta.env.VITE_API_KEY
        }&append_to_response=videos`
      );
      return data;
    } catch (error) {
      console.log("Error getting movie", error);
    }
  };

  const handleClose = () => {
    setShow(false);
    setSelectMovie(null); // Clear the selected item when the modal is closed
  };

  const handleOpen = async (movie) => {
    const data = await fetchmovie(movie.id);
    setSelectMovie(data); // Set the selected item when the button is clicked
    setShow(true);
  };

  const renderTrailer = () => {
    if (selectMovie?.videos && selectMovie?.videos?.results) {
      const trailer = selectMovie.videos.results.find(
        (vid) => vid.name === "Official Trailer" || "New Trailer"
      );

      if (trailer) {
        return (
          <Youtube
            videoId={trailer.key}
            className="movie"
            opts={{
              width: "100%",
              height: "100%",
              playerVars: {
                enablejsapi: 1,
              },
            }}
          />
        );
      }
    }

    return "Trailer Not Available";
  };

  // || "New Trailer" || "Teaser Trailer" <Youtube videoId={trailer.key} />;

  // console.log(selectMovie);

  return (
    <Wrapper>
      <img
        src={`${MOVIE_URL}${movieData.posters}`}
        alt=""
        key={movieData.id}
        onClick={() => handleOpen(movieData)}
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
                  <h1>{movieData.name}</h1>{" "}
                </Modal.Title>
                <p>{movieData.tag}</p>
                <p>{movieData?.text?.substring(0, 500)}</p>
                {/* <div className="control flex">
                  <RiThumbUpFill title="like" style={{ cursor: "pointer" }} />
                  <RiThumbDownFill
                    title="Dislike"
                    style={{ cursor: "pointer" }}
                  />

                  {isLiked ? (
                    <BsCheck
                      title="Remove from List"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        // console.log("Deleting movie with ID:", movieData.newId);
                        dispatch(
                          deleteLikedMovieAsync(movieData.newId.toString())
                        );
                      }}
                    />
                  ) : (
                    <AiOutlinePlus
                      title="Add to my List"
                      style={{ cursor: "pointer" }}
                      onClick={() => dispatch(addLikedMoviesAsync(movieData))}
                    />
                  )}
                </div> */}
                <ul className="genres">
                  <div className="genre_text">
                    {movieData.genres?.map((genre) => {
                      return <p key={genre}>{genre}</p>;
                    })}
                  </div>
                </ul>

                <button
                  className="play_btn"
                  onClick={() => setPlayTrailer(true)}
                >
                  Play Trailer{" "}
                  <span>
                    <AiOutlineYoutube className="play_icon" />
                  </span>
                </button>
                {playTrailer && selectMovie?.videos ? renderTrailer() : null}
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
