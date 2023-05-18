import React from "react";
import Image from "next/image";
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";

import Link from "next/link";

function Headers() {
  return (
    <header>
      <div className="flex items-center justify-between flex-wrap bg-amazon_blue p-1  py-2">
        {/* Amazon logo */}
        <Link href="/">
          <div className="my-3 mx-4 flex items-center flex-grow sm:flex-grow-0 w-36 h-11 object-contain">
            {/* Using NexJS image tag as it compress image and does not loose quality as it uses webp image format */}
            {/* Serve image in the most optimized way */}
            <Image
              src="/logo.svg"
              width={100}
              height={40}
              alt="Amazon logo"
              // contain : increases or decreases the size of the image to fill the box whilst preserving its aspect-ratio.
              objectFit="contain"
              className="cursor-pointer"
            />
          </div>
        </Link>

        <div className="block lg:hidden">
          <button
            id="nav-toggle"
            className="flex items-center mx-4 px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white"
          >
            {/* <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg> */}
            <Bars3Icon className="h-8 w-6" />
          </button>
        </div>

        <div
          className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block pt-6 lg:pt-0"
          id="nav-content"
        >
          <ul className="list-reset lg:flex justify-end flex-1 items-center">
            <li className="mr-3">
              <a
                className="inline-block py-2 px-4 text-white no-underline hover:text-underline"
                href="#"
              >
                Movies
              </a>
            </li>
            <li className="mr-3">
              <a
                className="inline-block py-2 px-4 text-white no-underline hover:text-underline"
                href="#"
              >
                Characters
              </a>
            </li>
            <li className="mr-3">
              <a
                className="inline-block py-2 px-4 text-white no-underline hover:text-underline"
                href="#"
              >
                Planets
              </a>
            </li>
            <li className="mr-3">
              <a
                className="inline-block py-2 px-4 text-white no-underline hover:text-underline"
                href="#"
              >
                Vehicles
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Headers;
