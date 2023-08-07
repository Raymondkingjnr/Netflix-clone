import React from "react";
import { styled } from "styled-components";
import { TbWorld } from "react-icons/tb";
import Form from "react-bootstrap/Form";

const footer = {
  FAQ: [
    { id: 2, text: "FAQ" },
    { id: 0, text: "Media Center" },
    { id: 1, text: "Ways to Watch" },
    { id: 2, text: "Cookie Preferences" },
    { id: 3, text: "Speed Test" },
  ],

  HelpCenter: [
    { id: 6, text: "Help Center" },
    { id: 0, text: "Investor Relations" },
    { id: 1, text: "Terms of Use" },
    { id: 2, text: " Corporate Information" },
    { id: 3, text: "Legal Notices" },
  ],
  Account: [
    { id: 7, text: "Account" },
    { id: 0, text: "jobs" },
    { id: 1, text: "Privacy" },
    { id: 2, text: "Contact Us" },
    { id: 3, text: "Only on Netflix" },
  ],
};

const Footer = () => {
  //   console.log(footer);
  return (
    <Wrapper>
      <a href="#" className="header-link">
        Questions, Contact us
      </a>
      <article>
        <main>
          {footer.FAQ.map((item, index) => {
            const { id, text } = item;
            return (
              <a href="#" key={index}>
                {text}
              </a>
            );
          })}
        </main>
        <main>
          {footer.HelpCenter.map((item, index) => {
            const { id, text } = item;
            return (
              <a href="#" key={index}>
                {text}
              </a>
            );
          })}
        </main>
        <main>
          {footer.Account.map((item, index) => {
            const { id, text } = item;
            return (
              <a href="#" key={index}>
                {text}
              </a>
            );
          })}
        </main>
      </article>
      <aside>
        <Form.Select
          style={{
            maxWidth: "200px",

            background: "#000",
            color: "#fff",
          }}
          aria-label="Default select example"
        >
          <TbWorld />
          <option>English</option>
        </Form.Select>
        <h4>Netflix Nigeria</h4>
      </aside>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: #000;
  width: 100vw;
  /* height: 70vh; */
  color: gray;
  padding-top: 5rem;
  .header-link {
    max-width: 900px;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  aside {
    padding-bottom: 4rem;
    max-width: 900px;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  aside h4 {
    /* padding-left: 7rem; */
    padding-top: 2rem;
    font-size: 20px;
    color: #d3d3d3;
  }
  article {
    max-width: 900px;
    margin: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: 5rem;
  }
  a {
    color: #d3d3d3;
    transition: 1s;
  }
  a:hover {
    color: #cacaca;
    transition: 1s;
  }
  main {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 2rem;
  }
  @media screen and (max-width: 900px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  @media screen and (max-width: 600px) {
    padding-left: 1rem;
    font-size: 15px;

    article {
      flex-direction: column;
      justify-content: center;
      gap: 0;
    }
  }
`;

export default Footer;
