import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../feature/authSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { user, isLoading, error } = useSelector((state) => state.auth);
  const initailState = {
    email: "",
    password: "",
  };

  const [values, setValues] = useState(initailState);
  const [togglePassword, setTogglePassword] = useState(false);

  const handlePasword = () => {
    setTogglePassword(!togglePassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignIn = async () => {
    dispatch(signIn(values.email, values.password));
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user]);

  return (
    <Wrapper>
      <nav>
        <img src={logo} alt="" />

        <Link to="/signup" className="sign-btn">
          Sign up
        </Link>
      </nav>
      <div className="header-center">
        <div className="note-header">
          <h1>Unlimited movies, TV shows, and more</h1>
          <p>Watch anywhere. Cancel anytime.</p>
          <p>
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
        </div>
        <div className="form">
          <input
            type="email"
            value={values.email}
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          {togglePassword && (
            <input
              type="password"
              value={values.password}
              name="password"
              placeholder="password"
              onChange={handleChange}
            />
          )}
          {!togglePassword && (
            <button onClick={handlePasword} className="toggle-password">
              Get Started
            </button>
          )}
        </div>
        <button
          className="login-btn"
          onClick={handleSignIn}
          disabled={isLoading}
        >
          Sign in
        </button>
        {error && <p>{error}</p>}
      </div>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.section`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    max-width: 1100px;
    margin: auto;
  }
  .toggle-password {
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
  .form {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .form input {
    padding: 20px;
    width: 400px;
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
  .login-btn {
    background: red;
    padding: 0.5rem;
    width: 100px;
    text-align: center;
    text-decoration: none;
    margin-top: 1.5rem;
    list-style: none;
    border-radius: 5px;
    color: #fff;
    text-transform: capitalize;
    font-size: 15px;
    border: transparent;
    font-family: "Acme";
    cursor: pointer;
  }
  .header-center {
    display: flex;
    padding-top: 2rem;
    margin-top: 5rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
  .note-header {
    text-align: center;
  }
  .note-header h1 {
    font-size: 3rem;
    font-weight: bold;
    font-style: normal;
  }
  .note-header p {
    font-size: 1.5rem;
  }
  .sign-btn {
    background: red;
    padding: 0.5rem;
    width: 100px;
    text-align: center;
    text-decoration: none;
    list-style: none;
    border-radius: 5px;
    font-family: "acme";
    font-weight: 600;
    font-size: 18px;
    color: #fff;
    text-transform: capitalize;
    font-size: 15px;
    cursor: pointer;
  }
  nav img {
    width: 130px;
  }
  @media screen and (max-width: 900px) {
    .form {
      flex-direction: column;
    }
    .note-header h1 {
      padding: 30px;
    }
    .toggle-password {
      padding: 0.5rem;
    }
    .form input {
      width: 500px;
    }
  }

  @media screen and (max-width: 600px) {
    .note-header h1 {
      font-size: 30px;
      padding: 10px;
    }

    .note-header p {
      font-size: 18px;
      padding: 10px;
    }
    .form input {
      width: 320px;
      padding: 10px;
      font-size: 0.8rem;
    }
  }

  @media screen and (max-width: 330px) {
    .header-center {
      padding: 2px;
      margin-top: 0;
    }
    .note-header h1 {
      font-size: 25px;
      padding: 5px;
    }
    .note-header p {
      padding: 5px;
    }
    .login-btn {
      margin-top: 0.5rem;
    }
    .form input {
      width: 260px;
      padding: 6px;
    }
    .toggle-password {
      padding: 0.2rem;
      font-size: 15px;
      padding: 6px;
      width: 150px;
    }
  }
`;
