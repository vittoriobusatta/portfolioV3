import Header from "@/components/Header";
import InnerPage from "@/components/Layout/Inner";
import React from "react";

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
      Works
    </InnerPage>
  );
}

export default Page;
