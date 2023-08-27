import React from "react";
import { styled } from "styled-components";

const Empty = () => {
  return (
    <Wrapper>
      <h1 style={{ paddingTop: "5rem" }}>Movie Genre Not Avaliable</h1>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: #000;
  height: 100vh;
  color: #fff;
  text-align: center;
`;

export default Empty;
