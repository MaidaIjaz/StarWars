import React, { useContext, useState, useEffect } from "react";
import { PersonContext } from "../context/PersonContext";
import {
  FunnelIcon,
  XMarkIcon,
  ArchiveBoxXMarkIcon,
} from "@heroicons/react/24/solid";

function Filters() {
  const INITIAL_OPTIONS = ["height", "mass", "birth_year"];
  const operatorMap = {
    "Greater than": ">",
    "Less than": "<",
    "Equal to": "==",
  };

  const { filterPersonsByColumn } = useContext(PersonContext);
  const [columnOptions, setColumnOption] = useState(INITIAL_OPTIONS);

  // Initial filter state
  const [filterState, setFilterState] = useState({
    column: INITIAL_OPTIONS[0],
    operator: "Greater than",
    value: "0",
  });

  const { column, operator, value } = filterState;
  // Keeps track of already done filters
  const [filtersDone, setFiltersDone] = useState([]);

  // Update filter state
  const handleChange = ({ target }) => {
    const { name: targetName, value: targetValue } = target;
    setFilterState((prevState) => ({
      ...prevState,
      [targetName]: targetValue,
    }));
  };
  
  // Delete filter with given id
  const handleDeleteFilter = ({ target: { id } }) => {
    // Remove filter with given id
    const attFiltersDone = filtersDone.filter(
      (_filter, index) => Number(index) !== Number(id)
    );
    filterPersonsByColumn(attFiltersDone, true);

    // Update column
    setColumnOption((prevState) => {
      const { column: filterType } = filtersDone[id];
      const attColumnOptions = [filterType, ...prevState];
      return attColumnOptions;
    });
    // Update done filters
    setFiltersDone(attFiltersDone);
  };

  
  const removeAllFilters = () => {
    setFiltersDone([]);
    setColumnOption(INITIAL_OPTIONS);
    filterPersonsByColumn([]);
  };

  const handleFilter = () => {
    const filterType = {
      column,
      operator,
      value,
    };
    const newFilters = [...filtersDone, filterType];
    setFiltersDone(newFilters);
    const attOptions = columnOptions.filter((option) => option !== column);
    setColumnOption(attOptions);
    filterPersonsByColumn([filterType]);
  };

  useEffect(() => {
    setFilterState((prevState) => ({
      ...prevState,
      column: columnOptions[0],
    }));
  }, [columnOptions]);

  return (
    <section>
      <form className="text-white flex flex-items mx-16 my-4 flex-col md:flex-row">
        {/* Select column */}
        <label htmlFor="column-filter">
          <div className="flex items-center text-black h-12 mx-4 my-4 rounded-md flex-grow bg-yellow-400 hover:bg-yellow-500">
            <select
              className="p-2 h-full w-full flex-grow flex-shrink rounded-md focus:outline-none"
              id="column-filter"
              name="column"
              data-testId="column-filter"
              defaultValue={column}
              onChange={handleChange}
            >
              {columnOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </label>

         {/* Select operator */}
        <label htmlFor="operator-filter">
          <div className="flex items-center text-black h-12 mx-4 my-4 rounded-md flex-grow bg-yellow-400 hover:bg-yellow-500">
            <select
              className="p-2 h-full w-full flex-grow flex-shrink rounded-md focus:outline-none"
              id="operator-filter"
              name="operator"
              data-testId="comparison-filter"
              value={operator}
              onChange={handleChange}
            >
              <option value="Greater than"> {">"} </option>
              <option value="Less than"> {"<"} </option>
              <option value="Equal to"> {"=="}</option>
            </select>
          </div>
        </label>

        {/* Select value */}
        <label htmlFor="value-filter">
          <div className="flex items-center text-black h-12 mx-4 my-4 rounded-md flex-grow bg-yellow-400 hover:bg-yellow-500">
            <input
              className="p-2 h-full w-full flex-grow flex-shrink rounded-md focus:outline-none"
              id="value-filter"
              type="number"
              data-testId="value-filter"
              value={value}
              name="value"
              onChange={handleChange}
            />
          </div>
        </label>

        {/* Apply filter */}
        <button
          className="w-12 rounded-md h-12 p-4 self-center text-black bg-yellow-400 hover:bg-yellow-500"
          type="button"
          // Disable button if all options are selected
          disabled={columnOptions.length == 0}
          data-testId="button-filter"
          onClick={handleFilter}
        >
          <FunnelIcon />
        </button>

        <section className="ml-2 self-center  flex flex-col md:flex-row">
          {filtersDone.map((filter, index) => {
            const {
              column: filterColumn,
              operator: filterOperator,
              value: filterValue,
            } = filter;
            return (
              <div
                key={index}
                data-testId="filter"
                className="flex flex-row text-white bg-gray-600 m-1 p-1 rounded-md"
              >
                <button
                  className="w-5 h-5 self-center hover:bg-yellow-400"
                  onClick={handleDeleteFilter}
                  type="button"
                  id={index}
                  data-testId="delete-filter"
                >
                  {/* Remove filter on text as we need id */}
                  <XMarkIcon className="pointer-events-none" />
                </button>
                {/* Display filter details */}
                <span className="self-center">{`${filterColumn} ${operatorMap[filterOperator]} ${filterValue}`}</span>
              </div>
            );
          })}

          <button
            className="w-12 rounded-md h-12 p-4 mx-2 text-black self-center bg-yellow-400 hover:bg-yellow-500"
            data-testid="button-remove-filters"
            type="button"
            onClick={removeAllFilters}
          >
            <ArchiveBoxXMarkIcon />
          </button>
        </section>
      </form>
    </section>
  );
}

export default Filters;
