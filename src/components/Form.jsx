import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { signUp } from "../feature/authSlice";

const Forms = () => {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  const initialState = {
    name: "",
    email: "",
    password: "",
  };

  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSingUp = () => {
    dispatch(signUp(values.email, values.password, values.name));
  };

  return (
    <Wrapper>
      <main>
        <h2>Sign up</h2>
        <FloatingLabel controlId="floatingName" label="name">
          <Form.Control
            type="name"
            placeholder="name"
            className="input"
            style={{ outline: "none", backgroundColor: "gray", border: "none" }}
            onChange={handleChange}
            name="name"
            value={values.name}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3 form-floating"
        >
          <Form.Control
            type="email"
            placeholder="name@example.com"
            className="input"
            style={{ focus: "none", backgroundColor: "gray", border: "none" }}
            onChange={handleChange}
            name="email"
            value={values.email}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control
            type="password"
            placeholder="Password"
            className="input transparent-bg"
            style={{ outline: "none", backgroundColor: "gray", border: "none" }}
            onChange={handleChange}
            name="password"
            value={values.password}
          />
        </FloatingLabel>
        <article>
          <button
            type="button"
            className="sign-btn"
            onClick={handleSingUp}
            disabled={isLoading}
          >
            Sign up
          </button>
          {error && <p>{error}</p>}
          <div className="remember">
            <aside>
              <input type="checkbox" name=" Remember me" id="" />
              <p>Remember me</p>
            </aside>
            <p className="help-p">Need Help?</p>
          </div>
        </article>
        <section>
          <h5>
            Already a member? <Link to="/"> Sign In</Link>{" "}
          </h5>
          <p>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.{" "}
          </p>
        </section>
      </main>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100vw;
  color: #fff;
  p {
    font-size: 13px;
    font-family: "acme";
    color: gray;
  }
  h5 {
    font-family: "acme";
    font-size: 20px;
  }
  section {
    padding-bottom: 3rem;
  }
  section p {
    padding-top: 1.5rem;
  }
  main {
    max-width: 400px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    margin: auto;
    padding: 20px;
    background: rgba(0, 0, 0, 0.8);
  }
  .form-floating label {
    background-color: transparent;
  }
  aside {
    display: flex;
    gap: 2px;
    align-items: center;
  }
  aside p {
    font-size: 13px;
    padding-top: 0.8rem;
  }
  .help-p {
    padding-top: 0.8rem;
  }
  .input {
    outline: none !important;
    box-shadow: none !important;
    font-family: "acme";
    color: #fff;
  }
  .transparent-bg {
    background-color: transparent;
  }
  .remember {
    display: flex;
    justify-content: space-between;
  }

  .sign-btn {
    padding: 15px;
    width: 100%;
    border-radius: 5px;
    outline: none;
    background: red;
    color: #fff;
    font-family: "acme";
    font-size: 20px;
    border: transparent;
  }
`;

export default Forms;
