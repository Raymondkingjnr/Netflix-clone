import React from "react";
import { useState } from "react";
import { styled } from "styled-components";
import Modal from "react-bootstrap/Modal";
import { ModalBody, ModalHeader } from "react-bootstrap";
import { RiThumbDownFill, RiThumbUpFill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";

const Card = ({ movieData, isLiked = false }) => {
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

  return (
    <Wrapper>
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt=""
        key={movieData.id}
        onClick={() => handleShow(movieData)}
      />

      <Modal show={show} onHide={handleClose} centered={true} size="xl">
        <ModalBody
          style={{
            height: "80vh",
            background: "#000",
            color: "#fff",
          }}
        >
          <ModalHeader closeButton></ModalHeader>

          <main style={{ display: "flex", gap: "20px", marginTop: "5rem" }}>
            <div className="modal-img">
              <img
                src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
                alt={movieData.title || movieData.name}
                className="modal-img"
              />
            </div>
            <div className="text">
              <Modal.Title>
                <h1 style={{ color: "gray" }}>{movieData.name}</h1>
              </Modal.Title>
              <p>{movieData.tag}</p>
              <p>{movieData.text}</p>
              <div className="control flex">
                <RiThumbUpFill title="like" />
                <RiThumbDownFill title="Dislike" />
                {isLiked ? (
                  <BsCheck title="Remove from List" />
                ) : (
                  <AiOutlinePlus title="Add to my List" />
                )}
              </div>

              <div className="genres flex">
                <ul className="flex">
                  {movieData.genres?.map((genre) => {
                    return <li key={genre}>{genre}</li>;
                  })}
                </ul>
              </div>
            </div>
          </main>
        </ModalBody>
      </Modal>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: #000;

  .control {
    display: flex;
    gap: 5rem;
  }
  .text {
    display: flex;
    flex-direction: column;
    gap: 20px;
    border: 2px solid red;
  }
`;

export default Card;
