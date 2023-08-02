import React, { useEffect, useState, useContext } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Carousel from "@/components/Carousel/Carousel";
import { GeneralContext } from "store/context";
import Transition from "utils/transitions";

function Home() {
  const [data, setData] = useState([]);
  const { slideCurrent } = useContext(GeneralContext);

  useEffect(() => {
    fetch("/db.json")
      .then((response) => response.json())
      .then((resdata) =>
        setData(
          resdata
            .filter((item) => item.available === true)
            .sort((a, b) => new Date(b.date.en) - new Date(a.date.en))
        )
      )
      .catch((err) => setError(err.message));
  }, []);

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
