import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import { PersonContext } from '../context/PersonContext';

  

function Headers() {
  const INITIAL_OPTIONS = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const [columnOptions, setColumnOption] = useState(INITIAL_OPTIONS);
  const [filterState, setFilterState] = useState({
    name: '',
    column: columnOptions[0],
    operator: 'maior que',
    value: 0,
  });
  const { name, column, operator, value } = filterState;
  const {
    filterPersonsByName,
    filterPersonsByColumn,
  } = useContext(PersonContext);

  useEffect(() => {
    filterPersonsByName(name);
  }, [filterPersonsByName, name]);

  const handleChange = ({ target }) => {
    const { name: targetName, value: targetValue } = target;
    setFilterState((prevState) => ({
      ...prevState,
      [targetName]: targetValue,
    }));
  };

  return (

        // {/* Search bar */}
        // {/* Hide search bar on small screen */}

  
        <div className="flex items-center h-12 mx-4 my-4 rounded-md flex-grow bg-yellow-400 hover:bg-yellow-500">
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none"
            type="text"
            onChange={ handleChange }
            value={ name }
            id="name-filter"
            data-testid="name-filter"
            name="name"
            placeholder="Search for a person"
          />
          <MagnifyingGlassIcon className="h-12 p-4" />
        </div>
 
     
    

  );
}

export default Headers;
