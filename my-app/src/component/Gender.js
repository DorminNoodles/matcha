import React from 'react';

function Gender({ onChange, gender }) {
  return (
    <div className="field-param">
      <p style={{ margin: "10px 0px" }}>Gender</p>
      <div className="control">
        <label className="radio">
          <input type="radio" name="gender" style={{ marginRight: "5px" }} onClick={() => onChange({ gender: "male" })} defaultChecked={gender === "male"} />
          Male
        </label>
        <label className="radio">
          <input type="radio" name="gender" style={{ marginRight: "5px" }} onClick={() => onChange({ gender: "female" })} defaultChecked={gender === "female"} />
          Female
        </label>
      </div>
    </div>
  );
}

export { Gender };