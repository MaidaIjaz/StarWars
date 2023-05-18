import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { PersonContext } from '../context/PersonContext';
import {
    AdjustmentsVerticalIcon,
  } from "@heroicons/react/24/solid";

const SORT_INITIAL_OPTIONS = [
    'Height: Low to High',
    'Height: High to Low',
    'Mass: Low to High',
    'Mass: High to Low',
    'Birth Year: Low to High',
    'Birth Year: High to Low',
  ];

function Sort() {
  const [order, setOrder] = useState({
    column: "",
  });

  const { sortPersons } = useContext(PersonContext);

  const handleChange = ({ target }) => {
    const { name: targetName, value: targetValue } = target;
    setOrder((prevState) => ({
      ...prevState,
      [targetName]: targetValue,
    }));
    sortPersons({column: targetValue});
  };

//   const handleSort = () => {
//     sortPersons(order);
//   };

  const { column } = order;
  return (
    <form >
      <label htmlFor="sort-column">
        {/* <span className="text-white">Order By</span> */}
     <div className="flex items-center text-black h-12 mx-4 my-4 rounded-md flex-grow bg-yellow-400 hover:bg-yellow-500">
        <select className="p-2 h-full w-full flex-grow flex-shrink rounded-l-md focus:outline-none"
          name="column"
          id="sort-column"
          data-testid="column-sort"
          onChange={ handleChange }
          value={ column }
        >
            <option value = "" selected disabled hidden> Sort Here</option>
          {
            SORT_INITIAL_OPTIONS
              .map((option, index) => (
                <option
                  key={ index }
                  value={ option }
                >
                  {option}
                </option>
              ))
          }
        </select>
        <AdjustmentsVerticalIcon className="h-12 p-4" />
        </div>
      </label>

      {/* <label htmlFor="asc-order">
        <span>Ascending</span>
        <input
          type="radio"
          name="sort"
          id="asc-order"
          value="ASC"
          data-testid="column-sort-input-asc"
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="desc-order">
        <span>Descending</span>
        <input
          type="radio"
          name="sort"
          id="desc-order"
          value="DESC"
          data-testid="column-sort-input-desc"
          onChange={ handleChange }
        />
      </label> */}

      {/* <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleSort }
      >
        Ordenar
      </button> */}
    </form>
  );
}

Sort.propTypes = {
  INITIAL_OPTIONS: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Sort;