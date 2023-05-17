import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Slideshow from "@/components/Slideshow";
import { GeneralContext } from "utils/translate";

// export async function getServerSideProps() {
//   try {
//     const response = await axios.get('http://localhost:3000/api/database/db');
//     const data = response.data;
//     return {
//       props: { data },
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       props: { data: null },
//     };
//   }
// }

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/db.json")
      .then((response) => response.json())
      .then((resdata) => setData(resdata))
      .catch((err) => setErreur(err.message));
  }, []);

  const { slideCurrent, setSlideCurrent } = useContext(GeneralContext);

  console.log(slideCurrent);

  return (
    <>
      <Head>
        <title>Accueil | Vittorio Busatta</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Home" />
        <meta
          property="og:description"
          content="Generated by create next app"
        />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:url" content="https://www.example.com" />
        <meta name="theme-color" content="#fffde8" />
      </Head>

      <Header logoColor={"#222"} />

      <main className="homepage">
        <Slideshow data={data} />
      </main>
    </>
  );
}

export default Home;
