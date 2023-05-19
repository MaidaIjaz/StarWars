import React from "react";
import { screen, render } from "@testing-library/react";
import fetchMockData, { planet } from "../utils/fetchMockData";
import PeopleDescription from "../src/components/PeopleDescription";

describe("Test person description", () => {
  beforeEach(async () => {
    const data = fetchMockData;
    render(
      <PeopleDescription
        people={data.results[0]}
        id={0}
        planet={planet}
        residents={[data.results[0], data.results[1]]}
      />
    );
  });

  it("Person is rendered", () => {
    const person = screen.getAllByTestId("name-heading");
    expect(person).toHaveLength(1);
  });

  it("Person description is rendered", () => {
    const rows = screen.getAllByTestId("row-title");
    expect(rows).toHaveLength(11);
  });

  it("Residents are rendered", () => {
    const residents = screen.getAllByTestId("person-name");
    expect(residents).toHaveLength(2);
  });
});
