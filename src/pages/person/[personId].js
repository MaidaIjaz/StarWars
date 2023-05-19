import React, { useContext, useCallback, useEffect, useState } from "react";
import { PersonContext } from "../../context/PersonContext";
import PeopleDescription from "../../components/PeopleDescription";
import { useRouter } from "next/router";
import axios from "axios";
import Headers from "../../components/Headers";

export default function PeopleDetail(props) {
  const { settingPersons, persons } = useContext(PersonContext);

  // If persons not already set, set them through props
  useEffect(() => {
    if (persons.length === 0) settingPersons(props.starWarsPeople);
  }, []);

  // Get person id
  const router = useRouter();
  let personId = router.query.personId - 1;
  if (personId > 16) personId = personId - 1;

  // If call fails load it from context
  const [people, setPeople] = useState(
    props.starWarsPeople[personId] ?? persons[personId]
  );

  useEffect(() => {
    setPeople(props.starWarsPeople[personId] ?? persons[personId]);
  },  [router.query.personId]);

  // Extract all residents of current person planet
  const extractResidents = (residents) => {
    let residentArray = [];
    residents?.forEach((resident) => {
      let personId = parseInt(resident.match(/\d/g).join(""));
      // Filter current person
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

function getAllStarWarsPeople() {
  let people = [];
  // Get people on first page
  return axios("https://swapi.dev/api/people/")
    .then((response) => {
      people = response.data.results;
      return response.data.count;
    })
    .then((count) => {
      // Store number of pages
      const numberOfPagesLeft = Math.ceil((count - 1) / 10);

      let promises = [];
      // start at 2 as you already queried the first page
      for (let i = 2; i <= numberOfPagesLeft; i++) {
        promises.push(axios(`https://swapi.dev/api/people?page=${i}`));
      }
      return Promise.all(promises);
    })
    .then((response) => {
      // get the rest of records
      people = response.reduce(
        (acc, data) => [...acc, ...data.data.results],
        people
      );
      return people;
    })
    .catch((error) => console.log(error));
}

function getStarWarsPlanet(url) {
  return axios(url)
    .then((response) => {
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

  const starWarsPeople = (await getAllStarWarsPeople()) ?? [];

  let arrayId = personId - 1;
  if (arrayId > 16) arrayId = arrayId - 1;
  const homeworld = starWarsPeople[arrayId]?.homeworld;
  const planet = (await getStarWarsPlanet(homeworld)) ?? [];

  return {
    // Pass data to actual component by returning props
    props: {
      starWarsPeople,
      planet,
    },
  };
}
