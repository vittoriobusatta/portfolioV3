import HeadFoot from "@/components/Layout/HeadFoot";
import Header from "@/components/Layout/Header";
import InnerPage from "@/components/Layout/Inner";
import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";

function Page() {
  const themeColor = "#FFF6E7";
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("/api/contact", data);
      reset();
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <InnerPage
      style={{
        "--color": "#1D1D1D",
        minHeight: "100vh",
        background: "#1D1D1D",
      }}
    >
      <Header logoColor={themeColor} color2={themeColor} />
      <Container>
        <Title>
          <h1>Let's create</h1>
        </Title>
        <Content>
          <Details>
            <div>
              <h2>Contacts</h2>
              <a href="mailto:vittoriobusatta092@gmail.com">
                vittoriobusatta092@gmail.com
              </a>
              <p>La Réunion, France</p>
            </div>
            <div>
              <h2>Socials</h2>
              <Socials>
                <a href="https://www.linkedin.com/in/vittorio-busatta-870921277/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="https://www.behance.net/fltzwoo">
                  <svg
                    width="25"
                    height="17"
                    viewBox="0 0 25 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id="Vector"
                      d="M9.73133 7.70898C9.95527 7.48505 10.2352 7.3171 10.5711 7.20513C10.907 7.09317 11.2429 6.81325 11.5788 6.36538C11.9147 5.91752 12.0826 5.35768 12.0826 4.68588C12.0826 3.34228 11.6348 2.2786 10.739 1.49483C9.8433 0.711067 8.8356 0.319183 7.71593 0.319183H-0.00976562V16.1065H8.38773C9.05954 16.1065 9.67535 15.9385 10.2352 15.6026C10.795 15.2667 11.2989 14.7629 11.7467 14.0911C12.1946 13.4193 12.4185 12.6355 12.4185 11.7398C12.4185 10.844 12.3066 10.1722 12.0826 9.72438C11.6348 8.38078 10.851 7.70898 9.73133 7.70898ZM7.04413 3.34228H7.71593H8.05183C8.27577 3.34228 8.44372 3.45425 8.55569 3.67818C8.66765 3.90212 8.72363 4.34998 8.72363 5.02178C8.72363 5.69358 8.61167 6.14145 8.38773 6.36538C8.1638 6.58932 7.8279 6.70128 7.38003 6.70128H3.34923V3.34228H7.04413ZM7.38003 13.4193H3.34923V9.05258L8.05183 9.38848C8.4997 9.38848 8.8356 9.55643 9.05954 9.89233C9.28347 10.2282 9.39543 10.7321 9.39543 11.4039C9.39543 12.7475 8.72363 13.4193 7.38003 13.4193ZM18.8006 4.34998C17.457 4.34998 16.3934 4.6299 15.6096 5.18973C14.8258 5.74957 14.266 6.42137 13.9301 7.20513C13.5942 7.9889 13.3143 8.71668 13.0903 9.38848V11.4039C13.0903 12.0757 13.2583 12.8035 13.5942 13.5872C13.9301 14.371 14.5459 15.0428 15.4416 15.6026C16.3374 16.1625 17.457 16.4424 18.8006 16.4424H19.4724C20.1442 16.4424 20.816 16.3304 21.4878 16.1065C22.1596 15.8825 22.7195 15.4347 23.1673 14.7629C23.6152 14.0911 23.8391 13.3073 23.8391 12.4116H21.1519V12.7475C21.1519 13.1953 20.984 13.5312 20.6481 13.7552C20.3122 13.9791 19.6964 14.0911 18.8006 14.0911L17.457 13.7552C17.2331 13.5312 16.9532 13.2513 16.6173 12.9154C16.2814 12.5795 16.1134 12.0757 16.1134 11.4039H24.175V9.38848C23.9511 8.04488 23.4473 6.86923 22.6635 5.86153C21.8797 4.85383 20.5921 4.34998 18.8006 4.34998ZM16.1134 9.05258C16.3374 8.82865 16.5053 8.54873 16.6173 8.21283C16.7293 7.87693 16.9532 7.54103 17.2891 7.20513C17.625 6.86923 18.2408 6.70128 19.1365 6.70128C20.0323 6.70128 20.5921 6.9812 20.816 7.54103C21.04 8.10087 21.1519 8.60472 21.1519 9.05258H16.1134ZM21.8237 3.34228H15.4416V1.32688H21.8237V3.34228Z"
                    />
                  </svg>
                </a>
              </Socials>
            </div>
          </Details>
          <Contact>
            <h2>UNE IDÉE EN TÊTE ?</h2>
            <p>
              Je suis actuellement disponible pour des projets freelance. Si
              vous souhaitez discuter d'un projet, n'hésitez pas à me contacter.
            </p>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Input
                  {...register("name", { required: true })}
                  placeholder="Prénom"
                />
                {errors.prenom && <p>Le prénom est requis.</p>}
              </div>
              <div>
                <Input
                  {...register("email", { required: true })}
                  placeholder="Email"
                />
                {errors.email && <p>L'email est requis.</p>}
              </div>
              <div>
                <Input
                  className="message"
                  {...register("message", { required: true })}
                  // style={{ height: "40vw", maxHeight: "200px" }}
                  placeholder="Parlez-moi de votre projet"
                />
                {errors.projet && <p>La description du projet est requise.</p>}
                {isSubmitted && <p>Votre message a été envoyé avec succès!</p>}
              </div>
              <Button type="submit">Envoyer</Button>
            </Form>
          </Contact>
        </Content>
      </Container>

      <HeadFoot />
    </InnerPage>
  );
}

export default Page;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 5.5vw 5.5vw;
  gap: clamp(50px, 10vw, 66px);
  color: #fff6e7;
  @media (max-width: 768px) {
    align-items: flex-start;
  }
  & a {
    color: #fff6e7;
    text-decoration: underline;
  }
  & p,
  a {
    font-size: clamp(14px, 1.8vw, 16px);
  }
  & svg path {
    fill: #fff6e7;
  }
`;

const Content = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 900px;
  width: 80vw;
  gap: clamp(44px, 9vw, 100px);
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    & > div {
      width: 100%;
    }
  }
  & h2 {
    font-family: Tusker Grotesk;
    font-size: clamp(20px, 4vw, 30px);
    font-weight: 800;
    text-transform: uppercase;
    color: #fff6e7;
    padding-bottom: 6px;
    letter-spacing: 0.05em;
  }
`;
const Title = styled.div`
  padding-top: 122px;
  font-family: Tusker Grotesk;
  font-size: clamp(26px, 5vw, 64px);
  font-weight: 800;
  text-align: center;
  text-transform: uppercase;
  color: #fff6e7;
`;
const Contact = styled.div`
  flex: 1;
  max-width: 550px;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 400px;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex-direction: row;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 32px;
`;
const Input = styled.input`
  border: 1px solid #fff6e7;
  background: transparent;
  color: #fff6e7;
  padding: 15px 20px;
  border-radius: 5px;
  width: 100%;
  &.message {
    padding: 15px 20px 200px;
    resize: none;
  }
`;

const Button = styled.button`
  background: #fff6e7;
  padding: 15px 40px;
  border-radius: 5px;
  width: fit-content;
  cursor: pointer;
  color: #1d1d1d;
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Socials = styled.div`
  display: inline-flex;
  gap: clamp(10px, 4vw, 20px);
  & a {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: clamp(20px, 5vw, 30px);
    height: clamp(20px, 5vw, 30px);
    border-radius: 50%;
    &:hover {
      opacity: 0.8;
    }
    & svg {
      width: 20px;
      height: 20px;
    }
  }
`;
