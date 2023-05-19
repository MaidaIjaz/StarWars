import { render, screen } from "@testing-library/react";
import Sort from "../src/components/Sort";
import "@testing-library/jest-dom";
import Provider from "../src/context/PersonContext";
import userEvent from "@testing-library/user-event";

describe("Home", () => {
  beforeEach(() => {
    render(
      <Provider>
        <Sort />
      </Provider>
    );
  });
  it("Renders sort", () => {
    const id = screen.getByTestId("column-sort");

    expect(id).toBeInTheDocument();
  });

  it("Test correct sort option is selected", () => {
    const sortOption = screen.getByRole("combobox");
    userEvent.selectOptions(sortOption, "Height: Low to High");
    expect(
      screen.getByRole("option", { name: "Height: Low to High" }).selected
    ).toBe(true);
    expect(
      screen.getByRole("option", { name: "Height: High to Low" }).selected
    ).toBe(false);
  });
});
