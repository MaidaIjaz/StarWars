import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";

function Person({
  name,
  height,
  mass,
  birth_year,
  gender,
  homeworld,
  id,
  smallTiles,
}) {
  // The default value is 0, it will be used during pre-rendering and the first render in the browser (hydration)

  return (
    <Link href={`/person/${id}`}>
      <div
        className={`relative flex flex-col m-5  bg-yellow-400 z-30 ${
          smallTiles ? "w-46 h-80" : "w-46 h-80 md:w-60 md:h-96"
        }  rounded-lg`}
      >
        <Image
          className="h-52 w-52 object-fill self-center min-w-full rounded-t-lg"
          style={{ minHeight: "85%" }}
          src={`/${id}.jpg`}
          alt={name}
          height={200}
          width={400}
          loading="lazy"
        />
        {/* h4 is better for SEO */}

        <h4 className=" text-center my-auto">{name}</h4>
        {!smallTiles && (
          <div class="opacity-0 hover:opacity-100  hover:backdrop-blur-md duration-300 absolute inset-0 z-10 flex flex-col justify-center items-center text-2xl text-yellow-400 font-semibold">
            <p className="text-md my-1">Height: {height}</p>
            <p className="text-md my-1">Birth Year: {birth_year}</p>
            <p className="text-md my-1"> Mass: {mass}</p>
          </div>
        )}
      </div>
    </Link>
  );
}

export default Person;
