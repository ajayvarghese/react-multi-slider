import React from "react";
import ReactDOM from "react-dom";

import Slider from "./Slider";

const rootElement = document.getElementById("root");

const initialSliderData = [50, 10, 10];

const App = () => {
  const [values, setValues] = React.useState(initialSliderData);

  return (
    <>
      <Slider values={values} onChange={setValues} width={500} />
      <button onClick={() => setValues(values.concat(10))}>+</button>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
