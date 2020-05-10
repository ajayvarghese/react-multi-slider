// #### Common Utils

const isArray = arr => {
  if (!Array.isArray(arr)) {
    throw new Error("sumArr Input is not an array");
  }
  return true;
};

// Finds Sum of an Array
export const sumArr = arr => {
  if (isArray(arr)) {
    return arr.reduce((a, c) => a + c, 0);
  }
};

// Converts fixed values to percentage based on Sum
export const toPerc = (value, sum) => (value * 100) / sum;

// Converts percentage to values based on Sum
export const toValue = (perc, sum) => (perc * sum) / 100;

// Replace Array entry based on Index
export const replaceIndex = (array, indexToReplace, item) => {
  if (indexToReplace > array.length - 1) {
    throw new Error("Index out of range");
  }
  return array.map((cur, index) => {
    if (indexToReplace === index) {
      return item;
    }
    return cur;
  });
};

// #### Slider Utils

// Formats array to Slider Format: [60, 10, 10] => [60, 70, 80]
export const formatter = widths =>
  widths.reduce(
    (a, i, index) => (index === 0 ? [i] : [...a, a[index - 1] + i]),
    []
  );

// Normalise Button left value based on Slider position
export const normalizeOffset = value => {
  const slider = document.getElementById("track");
  return slider ? value - slider.getBoundingClientRect().left : value;
};

// Validotor for Range [min, max]
export const isLengthTwo = function(props, propName) {
  if (
    !Array.isArray(props.range) ||
    props.range.length !== 2 ||
    !props.range.every(Number.isInteger)
  ) {
    return new Error(`${propName} needs to be an array of two numbers`);
  }

  return null;
};
