import React from "react";
import PropTypes from "prop-types";
import DraggableButton from "./DraggableButton";
import "./styles.css";
import { replaceIndex, sumArr, formatter, toPerc, toValue } from "./utils";

const styles = {
  sliderButton: "sliderButton",
  wrapper: "wrapper",
  track: "track"
};

const LeanSlider = ({ widths, width, onChange, step = 10 }) => {
  const elWidth = width;
  const [divisions, setDivisions] = React.useState(formatter(widths));
  if (divisions.length !== widths.length) {
    setDivisions(formatter(widths));
  }

  const onDrag = React.useCallback(
    (newWidth, elIndex) => {
      const newWidths = replaceIndex(divisions, elIndex, newWidth);
      setDivisions(newWidths);
      onChange(
        newWidths.map(
          (div, index) => (index === 0 ? div : div - newWidths[index - 1]),
          elIndex,
          elIndex === 0
            ? newWidths[elIndex]
            : newWidths[elIndex] - newWidths[elIndex - 1]
        )
      );
    },
    [divisions, onChange]
  );

  const getRange = React.useCallback(
    index => {
      const minLimit = index === 0 ? 0 : divisions[index - 1];
      const maxLimit =
        index === divisions.length - 1 ? 100 : divisions[index + 1];
      return [minLimit, maxLimit];
    },
    [divisions]
  );

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.track}
        id="track"
        style={{ width: elWidth + "px" }}
      >
        {divisions.map((division, index) => (
          <DraggableButton
            key={`DraggableButton-${index}`}
            left={division - (division % step)}
            onChange={width => onDrag(width, index)}
            range={getRange(index)}
            width={elWidth}
            step={step}
            index={index}
          >
            {index}
          </DraggableButton>
        ))}
      </div>
    </div>
  );
};

LeanSlider.propTypes = {
  width: PropTypes.number,
  widths: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func
};

LeanSlider.defaultProps = {
  width: 600,
  widths: [60, 50],
  onChange: f => f
};

/* ::TODO
1. Fix step: 10 issue
2. Add Responsive Width Support 
*/

const Slider = ({ values, onChange, width }) => {
  const sum = sumArr(values);
  const percentageWidths = values.map(i => Math.round(toPerc(i, sum)));
  return (
    <LeanSlider
      width={width}
      widths={percentageWidths.slice(0, -1)}
      step={1}
      onChange={value => {
        const newValues = value.map(i => toValue(i, sum));
        onChange([...newValues, sum - sumArr(newValues)]);
      }}
    />
  );
};

export default Slider;

Slider.propTypes = {
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
  width: PropTypes.number
};

Slider.defaultProps = {
  values: [10, 25],
  onChange: f => f,
  width: 500
};
