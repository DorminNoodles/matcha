import React from 'react';


function age({ ageMin, ageMax, onChangeAge }, { value, id }) {

  value = parseInt(value, 10)

  if (id === "min" && value !== ageMax && value < ageMax)
    onChangeAge(value, ageMax)
  else if (id === "max" && value !== ageMin && value > ageMin)
    onChangeAge(ageMin, value)

}

function SliderAgeRange(props) {
  let { ageMin, ageMax } = props

  return (

    <div className="field-param">
      <br />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>Show Ages:</div>
        <div>{ageMin} - {ageMax}</div>
      </div>
      <div style={{ position: "relative" }}>
        <input type="range" min={18} max={100} value={ageMin} className="slider_dual" id="min"
          onChange={(e) => { age(props, e.target) }}
        />
        <input type="range" min={18} max={100} value={ageMax} className="slider_dual" id="max"
          onChange={(e) => { age(props, e.target) }}
        />
      </div>
    </div>
  )
}

export { SliderAgeRange };