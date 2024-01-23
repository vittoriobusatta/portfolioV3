import React from "react";
import InnerPage from "@/components/Layout/Inner";
import WorkClient from "./WorkClient";
import { Canvas } from "@react-three/fiber";
import styled from "styled-components";
import Header from "@/components/Header";

function Page() {
  const themeColor = "#FFF6E7";
  return (
    <InnerPage
      style={{
        "--color": "#111",
        height: "100vh",
      }}
    >
      <Header logoColor={themeColor} color2={themeColor} />
      <Section>
        <WorkClient />
      </Section>
    </InnerPage>
  );
}

export default Page;

const Section = styled(Canvas)`
  width: 100%;
  height: 100vh;
  background: #1D1D1D;
  position: relative;
  overflow: hidden;
`;
