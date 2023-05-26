import React, { useEffect, useState, useContext } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Carousel from "@/components/Carousel/Carousel";
import { GeneralContext } from "store/context";

function Home() {
  const [data, setData] = useState([]);
  const { slideCurrent } = useContext(GeneralContext);

  useEffect(() => {
    fetch("/db.json")
      .then((response) => response.json())
      .then((resdata) => setData(resdata))
      .catch((err) => setErreur(err.message));
  }, []);

  const dataAvailable = data.filter((item) => item.available === true);

  const themeColor = dataAvailable[slideCurrent]?.color || "";

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

export default Home;
