import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DraggableButton from "./DraggableButton";

describe("DraggableButton", () => {
  it("should render a button", () => {
    const props = {
      left: 10,
      range: [10, 90],
      width: 300
    };
    render(<DraggableButton {...props} />);
    const draggableButton = screen.getByRole("button");
    expect(draggableButton).toBeInTheDocument();
    expect(draggableButton.style.left).toBe("10%");
  });
});
