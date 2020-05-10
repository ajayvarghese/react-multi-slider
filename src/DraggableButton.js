import React from "react";
import PropTypes from "prop-types";
import { normalizeOffset, isLengthTwo, toPerc } from "./utils";

import "./styles.css";

// CSS Modules Simulation
const styles = {
  sliderButton: "sliderButton"
};

const applyBoundaries = (value, range, step) => {
  switch (true) {
    case value <= 0 && range[0] === 0:
      return 0;
    case value >= 100 && range[1] === 100:
      return 100;
    case value <= range[0]:
      return range[0] + step;
    case value >= range[1]:
      return range[1] - step;
    default:
      return value;
  }
};

/*
::TODOS:
1. Remove fromInside State 
2. Convert to Stateless Component
*/

export default class DraggableButton extends React.Component {
  mouseDownPos = null;
  state = {
    clicked: false,
    positionX: this.props.left,
    fromInside: false
  };
  setClicked = clicked => this.setState({ clicked });
  setPositionX = positionX => {
    this.setState({ positionX, fromInside: true });
  };

  static getDerivedStateFromProps(props, state) {
    if (!state.fromInside && state.positionX !== props.left) {
      return {
        positionX: props.left
      };
    }
    return { fromInside: false };
  }

  mouseDownHandler = e => {
    if (!this.state.clicked) {
      this.mouseDownPos = e.pageX;
      this.setClicked(true);
    }
  };

  calculateNewX = mouseX => {
    const { range, width, step } = this.props;
    const percValue = toPerc(normalizeOffset(mouseX), width);
    const value = percValue - (percValue % step);
    return applyBoundaries(value, range, step);
  };

  mouseMoveHandler = e => {
    if (this.state.clicked) {
      this.setPositionX(this.calculateNewX(e.pageX));
    }
  };

  mouseUpHandler = e => {
    if (this.state.clicked) {
      this.props.onChange(this.state.positionX);
      this.setClicked(false);
    }
  };

  addListeners = () => {
    document.addEventListener("mousemove", this.mouseMoveHandler);
    document.addEventListener("mouseup", this.mouseUpHandler);
  };

  removeListeners = () => {
    document.removeEventListener("mousemove", this.mouseMoveHandler);
    document.removeEventListener("mouseup", this.mouseUpHandler);
  };

  componentDidMount() {
    this.addListeners();
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  render() {
    const { children } = this.props;
    return (
      <button
        onMouseDown={this.mouseDownHandler}
        className={styles.sliderButton}
        style={{ left: this.state.positionX + "%" }}
      >
        {children}
      </button>
    );
  }
}

DraggableButton.propTypes = {
  children: PropTypes.node,
  left: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  range: isLengthTwo,
  width: PropTypes.number.isRequired,
  step: PropTypes.number
};

DraggableButton.defaultProps = {
  children: null,
  left: 0,
  onChange: f => f
};
