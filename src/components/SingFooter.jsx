import React from "react";
import { styled } from "styled-components";

const grid = [
  {
    id: 0,
    text: "FAQ",
  },
  {
    id: 0,
    text: "Help Center",
  },
  {
    id: 0,
    text: "Terms of Use",
  },
  {
    id: 0,
    text: "Privacy",
  },
  {
    id: 0,
    text: "Cookie Preferences",
  },
  {
    id: 0,
    text: "Corporate Information",
  },
];

const SingFooter = () => {
  return (
    <Wrapper>
      <main>
        <h5>Questions? Contact us</h5>
        <article>
          {grid.map((item, index) => {
            return (
              <a href="" key={index}>
                {item.text}
              </a>
            );
          })}
        </article>
      </main>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding-bottom: 5rem;
  padding-top: 3rem;
  color: gray;
  margin-top: 5rem;
  background: rgba(0, 0, 0, 0.8);
  main {
    max-width: 1300px;
    margin: auto;
  }
  a {
    color: gray;
    list-style: none;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }

  article {
    display: grid;
    grid-template-columns: repeat(4, 2fr);
    gap: 2rem;
    padding-top: 1rem;
  }
  @media screen and (max-width: 900px) {
    main {
      padding: 10px;
    }
  }
  @media screen and (max-width: 600px) {
    article {
      grid-template-columns: repeat(2, 2fr);
    }
  }
  @media screen and (max-width: 400px) {
    a {
      font-size: 12px;
    }
  }
`;

export default SingFooter;
