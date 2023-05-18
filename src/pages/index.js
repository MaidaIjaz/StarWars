import { useContext, useEffect } from "react";
import { PersonContext } from "../context/PersonContext";
import Head from "next/head";
import Banner from "../components/Banner";
import Headers from "../components/Headers";
import ProductFeed from "../components/ProductFeed";
import Search from "../components/Search";
import Table from "../components/Table";
import Filter from "../components/Filter";
import axios from "axios";
import Sort from "../components/Sort";


export default function Home(props) {
  const { settingPersons, filteredPersons, persons } =
    useContext(PersonContext);
 
  useEffect(() => {
    if (persons.length === 0) settingPersons(props.starWarsPeople);
  }, []);

  return (
    <div className="bg-black">
      <Head>
        <title>Star Wars</title>
      </Head>
      {/* Header */}
      <Headers />
      {/* Set maximum zoom out */}
      <main className="max-w-screen-2xl mx-auto">
        <div className = "flex flex-col md:flex-row flex-items mx-16 my-4">
       <Search />
       <Sort/>
        </div>
        <Filter />
        {/* <Table /> */}
        {/* Banner */}
        {/* <Banner /> */}
        {/* Product feed */}

        <ProductFeed starWarsPeople={filteredPersons ?? []} />
      </main>
    </div>
  );
}

function getAllStarwarsPeople() {
  let people = [];
  // first page
  return axios("https://swapi.dev/api/people/")
    .then((response) => {
      // collect people from first page
      people = response.data.results;
      return response.data.count;
    })
    .then((count) => {
      // exclude the first request
      const numberOfPagesLeft = Math.ceil((count - 1) / 10);
      let promises = [];
      // start at 2 as you already queried the first page
      for (let i = 2; i <= numberOfPagesLeft; i++) {
        promises.push(axios(`https://swapi.dev/api/people?page=${i}`));
      }
      return Promise.all(promises);
    })
    .then((response) => {
      //get the rest records - pages 2 through n.
      people = response.reduce(
        (acc, data) => [...acc, ...data.data.results],
        people
      );
      return people;
    })
    .catch((error) => console.log("Properly handle your exception here"));
}

function getAllStarwarsPlanets() {
  let people = [];
  // first page
  return axios("https://swapi.dev/api/people/")
    .then((response) => {
      // collect people from first page
      people = response.data.results;
      return response.data.count;
    })
    .then((count) => {
      // exclude the first request
      const numberOfPagesLeft = Math.ceil((count - 1) / 10);
      let promises = [];
      // start at 2 as you already queried the first page
      for (let i = 2; i <= numberOfPagesLeft; i++) {
        promises.push(axios(`https://swapi.dev/api/people?page=${i}`));
      }
      return Promise.all(promises);
    })
    .then((response) => {
      //get the rest records - pages 2 through n.
      people = response.reduce(
        (acc, data) => [...acc, ...data.data.results],
        people
      );
      return people;
    })
    .catch((error) => console.log("Properly handle your exception here"));
}

// (async () => {
//   const starwarsPeople = await getAllStarwarsPeople();
//   console.log("starwarsPeople", starwarsPeople);

// })();

// Tells NextJS it is no longer a static page (needs to have middle server step)
export async function getServerSideProps(context) {
  const starWarsPeople = await getAllStarwarsPeople() ?? [];
  // console.log("starwarsPeople", products);
  return {
    // pass data to actual component by returning props
    props: {
      starWarsPeople,
    },
  };
}
