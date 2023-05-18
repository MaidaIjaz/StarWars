import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Fuse from "fuse.js";

// import getPlanets from '../helpers÷/planetsApi';

export const PersonContext = createContext();
function Provider({ children }) {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState(undefined);

  const settingPersons = (receivedPersons) => {
    setPersons(receivedPersons);
    setFilteredPersons(receivedPersons);
  };

  // fuzzy search
  const fuse = new Fuse(persons, {
    keys: ["name"],
  });
  const filterPersonsByName = useCallback(
    (name) => {
      // Fuzzy search returns the dictionary with key item
      const filteredPersonsByName = !name
        ? persons
        : fuse.search(name).map((result) => result.item);

      setFilteredPersons(filteredPersonsByName);
    },
    [persons]
  );

  const extractFloat = (str) => {
    return parseFloat(str.replace(/,/g, ""));
  };

  const filterPersonsByColumn = useCallback(
    (filtersDone, remove = false) => {
      if (filtersDone.length > 0) {
        const personsToFilter = remove ? persons : filteredPersons;
        filtersDone.forEach((filter) => {
          const { column, operator, value } = filter;
          const filteredPersonsByColumn = personsToFilter.filter((persons) => {
            const columnValueToCompare = extractFloat(persons[column]);
            const valueToCompare = extractFloat(value);
            switch (operator) {
              case "Greater than":
                return columnValueToCompare > valueToCompare;
              case "Less than":
                return columnValueToCompare < valueToCompare;
              default:
                return columnValueToCompare === valueToCompare;
            }
          });

          setFilteredPersons(filteredPersonsByColumn);
        });
      } else {
        setFilteredPersons(persons);
      }
    },
    [persons, filteredPersons]
  );

  const sortPersons = useCallback(
    (order) => {
      const { column: columnString } = order;
      const sort = columnString.split(":")[1];
      const column = columnString.split(":")[0].toLowerCase().replace(" ", "_");
      const filteredPersonsCopy = [...filteredPersons];
      const POSITIVE_NUMBER = 1;
      const NEGATIVE_NUMBER = -1;
      const NEUTRAL_NUMBER = 0;
      const UNKNOWN_CASE = "unknown";
      filteredPersonsCopy.sort((a, b) => {
        if (a[column] === UNKNOWN_CASE && b[column] === UNKNOWN_CASE) {
          return NEUTRAL_NUMBER;
        }
        if (a[column] === UNKNOWN_CASE) {
          return POSITIVE_NUMBER;
        }
        if (b[column] === UNKNOWN_CASE) {
          return NEGATIVE_NUMBER;
        }
        switch (sort) {
          case " Low to High":
            return extractFloat(a[column]) - extractFloat(b[column]);

          default:
            return extractFloat(b[column]) - extractFloat(a[column]);
        }
      });
      setFilteredPersons(filteredPersonsCopy);
    },
    [filteredPersons]
  );

  const contextValue = useMemo(
    () => ({
      persons,
      filteredPersons,
      filterPersonsByName,
      filterPersonsByColumn,
      sortPersons,
      settingPersons,
    }),
    [
      persons,
      filteredPersons,
      filterPersonsByName,
      filterPersonsByColumn,
      sortPersons,
      settingPersons,
    ]
  );

  return (
    <PersonContext.Provider value={contextValue}>
      {children}
    </PersonContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
