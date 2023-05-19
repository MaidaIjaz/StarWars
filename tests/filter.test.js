import { render, screen } from "@testing-library/react";
import Sort from "../src/components/Sort";
import "@testing-library/jest-dom";
import Provider from "../src/context/PersonContext";
import userEvent from "@testing-library/user-event";
import Filter from "../src/components/filter";

describe("Home", () => {
  beforeEach(() => {
    render(
      <Provider>
        <Filter />
      </Provider>
    );
  });
  it("Renders filter", () => {
    const id = screen.getByTestId("column-filter");

    expect(id).toBeInTheDocument();
  });

  it("Test filter property is set properly", () => {
    const sortOption = screen.getAllByRole("combobox");
    userEvent.selectOptions(sortOption[0], "height");
    expect(screen.getByRole("option", { name: "height" }).selected).toBe(true);
    expect(screen.getByRole("option", { name: "mass" }).selected).toBe(false);
  });

  it("Test operator is set properly", () => {
    const sortOption = screen.getAllByRole("combobox");
    userEvent.selectOptions(sortOption[1], ">");
    expect(screen.getByRole("option", { name: ">" }).selected).toBe(true);
    expect(screen.getByRole("option", { name: "<" }).selected).toBe(false);
  });
});
