import React from "react";
import App from "../App";
import Weather from "../components/Weather";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("App component", () => {
  it("Should render App", () => {
    render(<App />);
    const inputElement = screen.getByTestId("cityName");
    fireEvent.change(inputElement, { target: { value: "Opole" } });
    expect(inputElement.value).toBe("Opole");
  });
});

describe("Weather component", () => {
  it("Should render Weather", () => {
    render(<Weather />);
    const imgElement = screen.getByRole("img");
    expect(imgElement).toHaveAttribute("src", "");
  });
});
