import { useContext, useEffect } from "react";
import { PersonContext } from "../context/PersonContext";
import Headers from "../components/Headers";
import PersonFeed from "../components/PersonFeed";
import Search from "../components/Search";
import Filter from "../components/Filter";
import axios from "axios";
import Sort from "../components/Sort";

export default function Home(props) {
  // Use context to set persons
  const { settingPersons, filteredPersons, persons } =
    useContext(PersonContext);

  // Set persons on first load
  useEffect(() => {
    if (persons.length === 0) settingPersons(props.starWarsPeople);
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <Headers />
      <main className="max-w-screen-2xl mx-auto">
        {/* On mobile Search and Sort component should be displayed vertically on medium screen display them horizontally */}
        <div className="flex flex-col md:flex-row flex-items mx-16 my-4">
          <Search />
          <Sort />
        </div>
        <Filter />
        {/* If filtered persons undefined pass data from props, if props undefined pass empty array*/}
        <PersonFeed
          starWarsPeople={filteredPersons ?? props.starWarsPeople ?? []}
        />
      </main>
    </div>
  );
}

function getAllStarWarsPeople() {
  let people = [];
   // collect people from first page
  return axios("https://swapi.dev/api/people/")
    .then((response) => { 
      people = response.data.results;
      return response.data.count;
    })
    .then((count) => {
      // Extract total page number
      const numberOfPagesLeft = Math.ceil((count - 1) / 10);
      let promises = [];
      // start at 2 as you already queried the first page
      for (let i = 2; i <= numberOfPagesLeft; i++) {
        promises.push(axios(`https://swapi.dev/api/people?page=${i}`));
      }
      return Promise.all(promises);
    })
    .then((response) => {
      //get the rest records 
      people = response.reduce(
        (acc, data) => [...acc, ...data.data.results],
        people
      );
      return people;
    })
    .catch((error) => console.log("Properly handle your exception here"));
}


// Tells NextJS it is no longer a static page (needs to have middle server step)
export async function getServerSideProps(context) {
  const starWarsPeople = (await getAllStarWarsPeople()) ?? [];
  return {
    // pass data to actual component by returning props
    props: {
      starWarsPeople,
    },
  };
}
