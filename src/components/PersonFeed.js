import React from "react";
import Person from "./Person";

function PersonFeed({ starWarsPeople, smallTiles = false }) {
  return (
    // show single person on small screen, 2 on medium and so on...
    <div className="grid grid-flow-row-dense sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mx-16 justify-items-center">
      {/* Whenever use map always include key to let it know which element belongs where in this way it renders list efficiently */}
      {starWarsPeople.map(
        ({ name, height, mass, birth_year, gender, homeworld, url }, index) => (
          <Person
            key={index}
            name={name}
            height={height}
            mass={mass}
            birth_year={birth_year}
            gender={gender}
            homeworld={homeworld}
            // Extract integer from url
            id={url.match(/\d/g).join("")}
            smallTiles={smallTiles}
          />
        )
      )}
    </div>
  );
}

export default PersonFeed;
