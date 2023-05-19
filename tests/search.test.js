import { render, screen, fireEvent } from "@testing-library/react";
import Search from "../src/components/Search";
import "@testing-library/jest-dom";
import Provider from "../src/context/PersonContext";

describe("Home", () => {
  beforeEach(() => {
    render(<Provider>{<Search />}</Provider>);
  });
  it("renders a search bar", () => {
    const id = screen.getByTestId("name-filter");

    expect(id).toBeInTheDocument();
  });

  it("Test data in search field", () => {
    const id = screen.getByTestId("name-filter");

    fireEvent.change(id, { target: { value: "Luke" } });
    expect(id.value).toBe("Luke");
  });
});
