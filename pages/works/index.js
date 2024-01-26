import React from "react";
import InnerPage from "@/components/Layout/Inner";
import WorkClient from "./WorkClient";
import Header from "@/components/Layout/Header";
import HeadFoot from "@/components/Layout/HeadFoot";

function Page() {
  return null;
  const themeColor = "#FFF6E7";
  return (
    <InnerPage
      style={{
        "--color": "#1D1D1D",
        height: "100vh",
      }}
    >
      <Header logoColor={themeColor} color2={themeColor} />
      <WorkClient />
      <HeadFoot />
    </InnerPage>
  );
}

export default Page;
