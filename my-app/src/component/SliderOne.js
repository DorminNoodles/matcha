import React from 'react';

function SliderOne(props) {
  let { min, max, unite, i, val } = props

  return (
    <div className="field-param" style={{ position: "relative" }}>
      <br />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>{i} :</div>
        <div>{val} {unite}</div>
      </div>
      <input type="range" min={min} max={max} value={val} className="slider"
        onChange={(e) => { props.onChange({ [i.toLowerCase()]: e.target.value }) }}
      />
    </div>
  );
}

export { SliderOne };