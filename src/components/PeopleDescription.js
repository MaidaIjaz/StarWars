import React, { useState } from "react";
import RowInfo from "./RowInfo";
import Image from "next/image";
import PersonFeed from "./PersonFeed";

const PeopleDescription = ({ people, id, planet, residents }) => {

  return (
    <>
      <div className="flex flex-col content-between md:flex-row items-center md:justify-between px-16 pb-16 mx-auto">
        <div className="flex overflow-x-auto h-full w-4/12 rounded-lg">
          <Image
            className="h-full w-full object-contain"
            src={`/${id}.jpg`}
            height={300}
            width={300}
            objectFit="contain"
          />
        </div>
        <div className="w-full ml-10 mt-10 overflow-hidden bg-amazon_blue shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h1 className="leading-6 text-white font-medium border-solid border-yellow-400 border-b-2 text-3xl inline">
              {people?.name}
            </h1>
          </div>
          <div>
            <dl>
              <RowInfo label="Gender" text={people?.gender} isWhite />
              <RowInfo label="Birth day" text={people?.birth_year} />
              <RowInfo label="Height" text={people?.height} isWhite />
              <RowInfo label="Hair Color" text={people?.hair_color} />
              <RowInfo label="Eye Color" text={people?.eye_color} isWhite />
              <RowInfo label="Skin Color" text={people?.skin_color} />
              <RowInfo label="Mass" text={people?.mass} isWhite />
              <RowInfo label="Vehicles" text={people?.vehicles.length} />
              <RowInfo
                label="Starships"
                text={people?.starships.length}
                isWhite
              />
              <RowInfo label="Movies" text={people?.films.length} />
              <RowInfo label="Planet" text={planet?.name} isWhite />
            </dl>
          </div>
        </div>
      </div>

      <h2 className="text-white mx-16 font-medium border-solid border-yellow-400 border-b-2 text-3xl inline">
        Other Residents of {planet?.name}
      </h2>
      <PersonFeed starWarsPeople={residents} smallTiles />
    </>
  );
};

export default PeopleDescription;
