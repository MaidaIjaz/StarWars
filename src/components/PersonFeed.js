import React from "react";
import Person from "./Person";

function PersonFeed({ starWarsPeople, smallTiles = false }) {
  return (
    // show single product on small screen, 2 on medium and so on...
    // Overlap products with banner on medium screen
    <div className="grid grid-flow-row-dense sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mx-16 justify-items-center">
      {/* // Use SSR to fetch all products from fakestore API (REST API)
    // Fetch data from API render page on server and then deliver it to browser */}
      {/* destructuring */}
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
            id={url.match(/\d/g).join("")}
            smallTiles={smallTiles}
          />
        )
      )}
    </div>
  );
}

export default PersonFeed;
