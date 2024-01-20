import React, { useContext } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Carousel from "@/components/Carousel/Carousel";
import { GeneralContext } from "store/context";
import Transition from "utils/transitions";
import db from "../public/db.json";

function Home() {
  const { slideCurrent } = useContext(GeneralContext);

  const data = db
    .filter((item) => item.available === true)
    .sort((a, b) => new Date(b.date.en) - new Date(a.date.en));

  const themeColor = data[slideCurrent.index]?.color || "";

  return (
    <>
      <Head>
        <title>Accueil | Vittorio Busatta</title>
        <meta name="theme-color" content={themeColor} />
      </Head>
      <Header logoColor={themeColor} color2={themeColor} />
      <main className="landing">
        <Carousel data={data} />
      </main>
    </>
  );
}

export default Transition(Home);
