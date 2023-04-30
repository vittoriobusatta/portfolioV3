import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Slideshow from "@/components/Slideshow";
import axios from "axios";

export async function getServerSideProps() {
  const res = await axios.get(
    "http://localhost:3000/api/database/db"
  );
  const data = await res.data;

  return {
    props: {
      data,
    },
  };
}

function Home({ data }) {
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
        {/* <div className="homepage__list">
          {data.map((item, index) => (
            <figure
              className="homepage__items"
              key={item.id}
              style={{
                "--color": item.color,
              }}
            >
              <figcaption>
                <span>0{index + 1}</span>
                <h1>{item.name}</h1>
              </figcaption>
              <div className="homepage__image">
                <Link href={`/projects/${item.id}`}>
                  {item.thumbnail && (
                    <Image
                      src={item.thumbnail.src}
                      alt={item.thumbnail.alt}
                      width={500}
                      height={500}
                      priority
                    />
                  )}
                  <div
                    style={{
                      "--placeholder": item.color,
                    }}
                    className="placeholder"
                  />
                </Link>
              </div>
            </figure>
          ))}
        </div> */}
      </main>
    </>
  );
}

export default Home;
