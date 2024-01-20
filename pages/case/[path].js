import React from "react";
import db from "../../public/db.json";
import ProjectsClient from "./ProjectsClient";

const data = db
  .filter((item) => item.available === true)
  .sort((a, b) => new Date(b.date.en) - new Date(a.date.en));

function Page({ project }) {
  return <ProjectsClient project={project} data={data} />;
}

export default Page;

export async function getStaticProps({ params }) {
  const { path } = params;
  let project = data.find((item) => item.path === path);
  return { props: { project } };
}

export async function getStaticPaths() {
  const paths = data.map((item) => ({
    params: { path: item.path.toString() },
  }));
  return { paths, fallback: false };
}
