import React from "react";
import { render, screen } from "@testing-library/react";

import Slider from "./Slider";

describe("Slider ", () => {
  it("should render right number of buttons", () => {
    const props = {
      values: [10, 10, 10]
    };
    render(<Slider {...props} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(props.values.length - 1);
  });
});
