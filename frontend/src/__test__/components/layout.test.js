// src/components/__tests__/Layout.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import Layout from "../../components/Layout";

// Mock the Header component
jest.mock("../../components/ui/Header", () => () => (
  <div data-testid="header">Header</div>
));

describe("Layout Component", () => {
  it("renders Header and children", () => {
    render(
      <Layout>
        <div data-testid="child">Child Content</div>
      </Layout>
    );

    // Check that the Header is rendered
    expect(screen.getByTestId("header")).toBeInTheDocument();

    // Check that children are rendered
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("has the correct container class", () => {
    const { container } = render(
      <Layout>
        <div>Test</div>
      </Layout>
    );

    expect(container.firstChild).toHaveClass("min-h-screen flex flex-col");
  });
});
