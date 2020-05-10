import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import {
  sumArr,
  toPerc,
  toValue,
  replaceIndex,
  formatter,
  normalizeOffset,
  isLengthTwo
} from "./utils";

describe("Common Utils test", () => {
  it("should calculate the sum of array", () => {
    const input = [1, 2, 3];
    expect(sumArr(input)).toBe(1 + 2 + 3);
  });

  it("should convert value to percentage", () => {
    expect(toPerc(5, 10)).toBe(50);
  });

  it("should convert percentage to value", () => {
    expect(toValue(50, 10)).toBe(5);
  });

  it("should replace array value by index", () => {
    const input = [1, 2, 3];
    const index = 2;
    const newValue = 5;
    const newArr = replaceIndex(input, index, newValue);
    expect(newArr[index]).toBe(newValue);
  });
});

describe("Slider Utils test", () => {
  it("should format the array in slider format", () => {
    // [ 60, 10, 10] => [ 60, 70, 80]
    const input = [60, 10, 5];
    const output = [60, 70, 75];
    formatter(input).forEach((item, index) => {
      expect(item).toBe(output[index]);
    });
  });

  it("should normalise the left position of a dom element", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const Slider = () => <div id="track">Slider Here</div>;
    act(() => {
      ReactDOM.render(<Slider />, container);
    });
    expect(normalizeOffset(200)).toBe(200);
  });

  it("should throw error if array length is not 2", () => {
    const props = {
      range: [0, 1]
    };
    const errorProps = {
      range: 1
    };
    const propName = "range";
    expect(isLengthTwo(props)).toBe(null);
    const errorCase = isLengthTwo(errorProps, propName);
    expect(errorCase.message).toBe(
      `${propName} needs to be an array of two numbers`
    );
  });
});
