import React, { useContext, useState, useEffect } from "react";
import { PersonContext } from "../context/PersonContext";
import Sort from "./Sort";
import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/solid";

function Filters() {
  const INITIAL_OPTIONS = ["height", "mass", "birth_year"];
  const operatorMap = {
    "Greater than" : ">",
    "Less than" : "<",
    "Equal to" : "=="
  }

  const { filterPersonsByName, filterPersonsByColumn } =
    useContext(PersonContext);
  const [columnOptions, setColumnOption] = useState(INITIAL_OPTIONS);
  const [filterState, setFilterState] = useState({
    name: "",
    column: INITIAL_OPTIONS[0],
    operator: "Greater than",
    value: "0",
  });
  const { name, column, operator, value } = filterState;
  const [filtersDone, setFiltersDone] = useState([]);

  const handleChange = ({ target }) => {
    const { name: targetName, value: targetValue } = target;
    setFilterState((prevState) => ({
      ...prevState,
      [targetName]: targetValue,
    }));
  };

  const handleDeleteFilter = ({ target: {id} }) => {
    console.log('id', id, filtersDone)
    const attFiltersDone = filtersDone.filter(
      (_filter, index) => Number(index) !== Number(id)
    );
    filterPersonsByColumn(attFiltersDone, true);
    
    setColumnOption((prevState) => {
      const { column: filterType } = filtersDone[id];
      const attColumnOptions = [filterType, ...prevState];
      return attColumnOptions;
    });
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

  useEffect(() => {
    filterPersonsByName(name);
  }, [filterPersonsByName, name]);

  return (
    <section>
      <form className="text-white flex flex-items mx-16 my-4 flex flex-col md:flex-row">
        <label htmlFor="column-filter">
          {/* <span>Filter</span> */}
          <div className="flex items-center text-black h-12 mx-4 my-4 rounded-md flex-grow bg-yellow-400 hover:bg-yellow-500">
            <select
              className="p-2 h-full w-full flex-grow flex-shrink rounded-md focus:outline-none"
              id="column-filter"
              name="column"
              data-testid="column-filter"
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

        <label htmlFor="operator-filter">
          {/* <span>Is</span> */}
          <div className="flex items-center text-black h-12 mx-4 my-4 rounded-md flex-grow bg-yellow-400 hover:bg-yellow-500">
            <select
              className="p-2 h-full w-full flex-grow flex-shrink rounded-md focus:outline-none"
              id="operator-filter"
              name="operator"
              data-testid="comparison-filter"
              value={operator}
              onChange={handleChange}
            >
              <option value="Greater than"> {">"} </option>
              <option value="Less than"> {"<"} </option>
              <option value="Equal to"> {"=="}</option>
            </select>
          </div>
        </label>

        <label htmlFor="value-filter">
          <div className="flex items-center text-black h-12 mx-4 my-4 rounded-md flex-grow bg-yellow-400 hover:bg-yellow-500">
            <input
              className="p-2 h-full w-full flex-grow flex-shrink rounded-md focus:outline-none"
              id="value-filter"
              type="number"
              data-testid="value-filter"
              value={value}
              name="value"
              onChange={handleChange}
            />
          </div>
        </label>
        
        <button
          className="w-12 rounded-md h-12 p-4 self-center bg-yellow-400 hover:bg-yellow-500"
          type="button"
          disabled={columnOptions.length == 0}
          data-testid="button-filter"
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
          console.log('index', index)
          return (
            <div key={index} data-testid="filter" className="flex flex-row text-white bg-gray-600 m-1 p-1 rounded-md">
              <button
              className="w-5 h-5 self-center hover:bg-yellow-400"
                onClick={handleDeleteFilter}
                type="button"
                id={index}
                data-testid="delete-filter"
              >
                <XMarkIcon className="pointer-events-none" />
              </button>
              <span>{`${filterColumn} ${operatorMap[filterOperator]} ${filterValue}`}</span>
            </div>
          );
        })}
        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={removeAllFilters}
        >
          Remove Filters
        </button>
      </section>
      </form>
    </section>
  );
}

export default Filters;
