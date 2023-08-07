import React from "react";
import accordion from "../data";
import { Accordion } from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import { RiAddFill } from "react-icons/ri";
import { AiOutlineMinus } from "react-icons/ai";
import { styled } from "styled-components";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const According = () => {
  const [answers, setAnswers] = useState(accordion);
  const [activeCard, setActiveCard] = useState(null);

  const handlesign = (index) => {
    setActiveCard((prevIndex) => (prevIndex === index ? null : index));
  };

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () => {});

    return <div onClick={decoratedOnClick}>{children}</div>;
  }

  return (
    <Wrapper>
      <section>
        <Accordion>
          <h1 className="Header">Frequently Asked Questions</h1>
          {answers?.map((item, index) => {
            const { id, title, text } = item;
            return (
              <Card key={index} className="according-item">
                <Card.Header
                  style={{
                    backgroundColor: "#606060",
                    cursor: "pointer",
                    padding: "20px",
                  }}
                >
                  <CustomToggle eventKey={index} className="accordion-title">
                    <main onClick={() => handlesign(index)} key={index}>
                      <h2> {title}</h2>
                      <div>
                        {activeCard === index ? (
                          <h2>
                            <AiOutlineMinus />
                          </h2>
                        ) : (
                          <h2>
                            {" "}
                            <RiAddFill />
                          </h2>
                        )}
                      </div>
                    </main>
                  </CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey={index}>
                  <Card.Body className="accordion-text">
                    {" "}
                    <p>{text}</p>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            );
          })}
        </Accordion>
        <div className="restart-sec">
          <h2>
            Ready to watch? Enter your email to create or restart your
            membership.
          </h2>
          <main className="form">
            {/* <input type="email" placeholder="email" /> */}
            <InputGroup className="input">
              <Form.Control
                style={{ color: "#fff" }}
                placeholder="email"
                type="Email"
              />
            </InputGroup>
            <button className="form-btn">Get Started</button>
          </main>
        </div>
      </section>
      <div className="layer-line"></div>
    </Wrapper>
  );
};

export default According;

const Wrapper = styled.section`
  width: 100%;
  background: #000;

  .Header {
    color: #fff;
    text-align: center;
    font-size: 3rem;
    padding-top: 2rem;
    padding-bottom: 1.5rem;
  }

  section {
    max-width: 1200px;
    margin: auto;
    padding: 2rem;
  }
  .according-item {
    margin-bottom: 1rem;
    font-family: "acme";
    background: #333333;
    color: #fff;
    border: transparent;
    border-radius: none;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  .accordion-text p {
    font-weight: lighter;
    margin-top: 2px;
  }
  .accordion-title h2 {
    font-weight: 300;
    font-size: 1rem;
  }

  .accordion-title:hover {
    background-color: #b7b7b7;
  }

  .restart-sec {
    max-width: 800px;
    margin: auto;
    text-align: center;
    padding-bottom: 3rem;
  }
  .restart-sec h2 {
    color: #fff;
    font-size: 20px;
    padding-top: 3rem;
  }
  .form input {
    padding: 1.2rem;
    max-width: 600px;
    margin: auto;
    color: #fff;
    border: 1px solid #fff;
    font-size: 1rem;
    font-family: "acme";
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.5);
    &:focus {
      outline: none;
    }
  }
  .form {
    display: flex;
    gap: 5px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
  }
  .form-btn {
    background: red;
    width: 200px;
    cursor: pointer;
    color: #fff;
    padding: 0.9rem;
    border: transparent;
    border-radius: 5px;
    font-size: 1.5rem;
    font-family: "Acme";
  }

  @media screen and (max-width: 900px) {
    .form {
      flex-direction: column;
      gap: 10px;
    }
  }

  @media screen and (max-width: 600px) {
    .restart-sec h2 {
      font-size: 15px;
    }
    .form input {
      padding: 0.5rem;
    }
    .accordion-text p {
      font-size: 15px;
    }
    .form-btn {
      width: 150px;
      font-size: 15px;
      padding: 0.3rem;
    }
  }
`;
