import { render, screen } from "@testing-library/react";
import Home from "./Home";

test("Home renders", () => {
  render(<Home />);

  // Check the exact main heading
  expect(
    screen.getByRole("heading", { name: /my portfolio/i })
  ).toBeInTheDocument();

  // Check sections exist
  expect(screen.getByRole("heading", { name: /projects/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /qualifications/i })).toBeInTheDocument();
});

