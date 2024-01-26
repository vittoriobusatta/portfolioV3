import HeadFoot from "@/components/Layout/HeadFoot";
import Header from "@/components/Layout/Header";
import InnerPage from "@/components/Layout/Inner";
import React from "react";
import styled from "styled-components";

function Page() {
  const themeColor = "#FFF6E7";
  return (
    <InnerPage
      style={{
        "--color": "#1D1D1D",
        height: "100vh",
        background: "#1D1D1D",
      }}
    >
      <Header logoColor={themeColor} color2={themeColor} />
      <Title>
        <h1>Let's create</h1>
      </Title>
      <Content>
        <Details></Details>
        <Contact>
          <h2>Get in touch</h2>
          <p>
            I'm currently available for freelance work. If you have a project
            that you want to get started, think you need my help with something
            or just fancy saying hey, then get in touch.
          </p>
          <Form>
            <Input>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" />
            </Input>
            <Input>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" />
            </Input>
            <Input>
              <label htmlFor="message">Message</label>
              <textarea id="message" />
            </Input>
            <Input>
              <button>Send</button>
            </Input>
          </Form>
        </Contact>
      </Content>
      <HeadFoot />
    </InnerPage>
  );
}

export default Page;

const Content = styled.div``;
const Title = styled.div`
  padding-top: 59px;
`;
const Contact = styled.div``;
const Details = styled.div``;
const Form = styled.form``;
const Input = styled.div``;
