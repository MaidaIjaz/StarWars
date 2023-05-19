import React, { useContext, useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { PersonContext } from "../context/PersonContext";

function Search() {
  // filterState is empty initially
  const [filterState, setFilterState] = useState("");

  const { filterPersonsByName } = useContext(PersonContext);

  // Update characters based on search
  useEffect(() => {
    filterPersonsByName(filterState);
  }, [filterPersonsByName, filterState]);

  // Set filterState upon character search
  const handleChange = ({ target }) => {
    const { value: targetValue } = target;
    setFilterState(targetValue);
  };

  return (
    // {/* Search bar */}
    <div className="flex items-center h-12 mx-4 my-4 rounded-md flex-grow bg-yellow-400 hover:bg-yellow-500">
      <input
        className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none"
        type="text"
        onChange={handleChange}
        value={filterState}
        id="name-filter"
        data-testid="name-filter"
        placeholder="Search for a person"
      />
      <MagnifyingGlassIcon className="h-12 p-4" />
    </div>
  );
}

export default Search;
