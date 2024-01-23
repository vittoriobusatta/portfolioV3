import React from "react";
import InnerPage from "@/components/Layout/Inner";
import WorkClient from "./WorkClient";
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

      <WorkClient />
    </InnerPage>
  );
}

export default Page;
