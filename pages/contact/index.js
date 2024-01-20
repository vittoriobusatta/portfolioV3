import InnerPage from "@/components/Layout/Inner";
import React from "react";

function Page() {
  return (
    <InnerPage
      style={{
        "--color": themeColor,
      }}
    >
      Works
    </InnerPage>
  );
}

export default Page;
