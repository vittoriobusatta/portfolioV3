import React, { useContext } from "react";
import Head from "next/head";
import Header from "@/components/Layout/Header";
import Carousel from "@/components/Carousel/Carousel";
import { GeneralContext } from "store/context";
import db from "../public/db.json";
import InnerPage from "@/components/Layout/Inner";

function Home() {
  const { slideCurrent } = useContext(GeneralContext);

  const data = db
    .filter((item) => item.available === true)
    .sort((a, b) => new Date(b.date.en) - new Date(a.date.en));

  const themeColor = data[slideCurrent.index]?.color || "";
  const themeColor2 = data[slideCurrent.index]?.color2 || "";

  return (
    <>
      <Head>
        <title>Accueil | Vittorio Busatta</title>
        <meta name="theme-color" content={themeColor} />
      </Head>
      <InnerPage
        style={{
          "--color": themeColor,
          backgroundColor: themeColor2,
        }}
        className="landing"
      >
        <Header logoColor={themeColor} color2={themeColor} />
        <Carousel data={data} />
      </InnerPage>
    </>
  );
}

export default Home;
