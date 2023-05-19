import React from "react";
import { screen, render } from "@testing-library/react";
import fetchMockData from "../utils/fetchMockData";
import PersonFeed from "../src/components/PersonFeed";

describe("Test person feed", () => {
  beforeEach(async () => {
    const data = fetchMockData;
    render(<PersonFeed starWarsPeople={data.results} />);
  });

  it("All person tiles are rendered", () => {
    const rows = screen.getAllByTestId("person-name");
    const images = screen.getAllByRole("img");
    expect(rows).toHaveLength(10);
    expect(images).toHaveLength(10);
  });
});
