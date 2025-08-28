import { render, screen } from "@testing-library/react";
import WelcomePage from "../../../pages/Service_Selection/WelcomePage";


test("renders WelcomePage component", () => {
  render(<WelcomePage />);

  // Check if the text "WelcomePage" is in the document
  const textElement = screen.getByText(/WelcomePage/i);
  expect(textElement).toBeInTheDocument();
});
