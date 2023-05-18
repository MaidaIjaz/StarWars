import React, { useContext, useCallback, useEffect, useState } from "react";
import { PersonContext } from "../../context/PersonContext";
import PeopleDescription from "../../components/PeopleDescription";
import { useRouter } from "next/router";
import axios from "axios";
import Headers from "../../components/Headers";

export default function PeopleDetail(props) {
  const { settingPersons, persons } = useContext(PersonContext);

  useEffect(() => {
    if (persons.length === 0) settingPersons(props.starWarsPeople);
  }, []);
  const router = useRouter();
  let personId = router.query.personId - 1;
  if (personId > 16) personId = personId - 1;
  const [people, setPeople] = useState(
    props.starWarsPeople[personId] ?? persons[personId]
  );

  const extractResidents = (residents) => {
    let residentArray = [];
    residents?.forEach((resident) => {
      let personId = parseInt(resident.match(/\d/g).join(""));
      if (parseInt(router.query.personId) !== personId) {
        personId = personId - 1;
        if (personId > 16) personId = personId - 1;
        residentArray.push(props.starWarsPeople[personId]);
      }
    });
    return residentArray;
  };

  let residents = extractResidents(props.planet.residents);
  return (
    <div className="bg-black">
      {/* Header */}
      <Headers />

      <div className="py-6 super-container lg:py-10">
        <PeopleDescription
          people={people}
          id={router.query.personId}
          planet={props.planet}
          residents={residents}
        />
      </div>
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

function getStarWarsPlanet(url) {
  return axios(url)
    .then((response) => {
      // collect people from first page
      return response.data;
    })
    .catch((error) => console.log("Planet not found"));
}

// Tells NextJS it is no longer a static page (needs to have middle server step)
export async function getServerSideProps(context) {
  const personId = context.params.personId;
  if (personId < 1 || personId > 83 || parseInt(personId) === 17) {
    return {
      notFound: true,
    };
  }

  const starWarsPeople = (await getAllStarwarsPeople()) ?? [];

  let arrayId = personId - 1;
  if (arrayId > 16) arrayId = arrayId - 1;
  const homeworld = starWarsPeople[arrayId]?.homeworld;
  console.log(homeworld);
  const planet = (await getStarWarsPlanet(homeworld)) ?? [];

  return {
    // pass data to actual component by returning props
    props: {
      starWarsPeople,
      planet,
    },
  };
}
