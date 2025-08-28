import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../../components/ui/Header";

const mockToggle = jest.fn();

jest.mock("../../context/DarkModeContext", () => ({
  useDarkMode: () => ({
    darkMode: false,
    toggleDarkMode: mockToggle,
  }),
}));

describe("Header Component", () => {
  beforeEach(() => {
    mockToggle.mockClear(); // reset before each test
  });

  it("renders logo and title", () => {
    render(<Header />);
    const logo = screen.getByAltText("Logo");
    const title = screen.getByText("Ethiopian Civil Service Commission");

    expect(logo).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  it("renders Moon icon when darkMode is false", () => {
    render(<Header />);
    const moonIcon = screen.getByRole("button").querySelector("svg");
    expect(moonIcon).toHaveClass("text-gray-700");
  });

  it("calls toggleDarkMode when button is clicked", () => {
    render(<Header />);
    const button = screen.getByLabelText("Toggle dark mode");

    fireEvent.click(button);
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });
});
