import React, { Suspense } from "react";
import InnerPage from "@/components/Layout/Inner";
import WorkClient from "./WorkClient";
import { Canvas } from "@react-three/fiber";
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
      <Canvas
        style={{
          height: "100vh",
          width: "100%",
          background: "#1d1d1d",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <WorkClient />
      </Canvas>
    </InnerPage>
  );
}

export default Page;
