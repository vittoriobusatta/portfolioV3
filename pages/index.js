import React from "react";
import Head from "next/head";
import fs from "fs";
import Link from "next/link";

export async function getStaticProps() {
  const data = await JSON.parse(fs.readFileSync("./public/db.json", "utf-8"));
  return { props: { data } };
}

function Home({ data }) {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Home" />
        <meta
          property="og:description"
          content="Generated by create next app"
        />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:url" content="https://www.example.com" />
      </Head>
      <main>
        {data.map((item) => (
          <div key={item.id}>
            <Link href={`/projects/${item.id}`}>
              <h1>{item.name}</h1>
            </Link>
          </div>
        ))}
      </main>
    </>
  );
}

export default Home;
