import React, { useContext } from 'react';
import { PersonContext } from '../context/PersonContext';

function Table() {
  const { filteredPersons } = useContext(PersonContext);
  return (
    <table data-testid="persons-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>Url</th>
        </tr>
      </thead>
      <tbody>
        {
          filteredPersons.map((planet) => {
            const {
              name,
              rotation_period: rotationPeriod,
              orbital_period: orbitalPeriod,
              diameter,
              climate,
              gravity,
              terrain,
              surface_water: surfaceWater,
              population,
              films,
              created,
              edited,
              url,
            } = planet;
            return (
              <tr key={ name }>
                <td data-testid="planet-name">{name}</td>
                <td>{rotationPeriod}</td>
                <td>{orbitalPeriod}</td>
                <td>{diameter}</td>
                <td>{climate}</td>
                <td>{gravity}</td>
                <td>{terrain}</td>
                <td>{surfaceWater}</td>
                <td>{population}</td>
                <td>
                  {
                    films
                      .map((film, index) => <a href={ film } key={ index }>{film}</a>)
                  }
                </td>
                <td>{created}</td>
                <td>{edited}</td>
                <td>{url}</td>
              </tr>
            );
          })
        }
      </tbody>
    </table>

  );
}

export default Table;