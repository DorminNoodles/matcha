import React from 'react';

function SexualOrientation({ onChange, orientation }) {

  const info = ["heterosexual", "homosexual", "bisexual"]

  return (
    <div className="field-param">
      <p style={{ margin: "10px 0px" }}>Sexual Orientaion</p>
      <div className="control" style={{ display: "table" }}>
        {
          info.map((value, key) => {
            return (
              <label className="radio" key={key}>
                <input type="radio" name="sexual" style={{ marginRight: "5px" }} onClick={() => onChange({ orientation: value })} defaultChecked={orientation === value} />
                {value}
              </label>
            )
          })
        }
      </div>
    </div>
  );
}

export { SexualOrientation };