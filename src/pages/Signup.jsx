import React from "react";
import Form from "../components/Form";
import logo from "../assets/logo.png";
import SingFooter from "../components/SingFooter";

const Signup = () => {
  return (
    <div className="sign-page">
      <img src={logo} alt="" />
      <Form />
      <SingFooter />
    </div>
  );
};

export default Signup;
