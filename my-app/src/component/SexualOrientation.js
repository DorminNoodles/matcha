import React from 'react';

function SexualOrientation(props) {
  return (
    <div className="field-param">
      <p style={{ margin: "10px 0px" }}>Sexual Orientaion</p>
      <div className="control" style={{ display: "table" }}>
        <label className="radio">
          <input type="radio" name="heterosexual" style={{ marginRight: "5px" }} onClick={() => props.onChange({ sexuality: "heterosexual" })} />
          heterosexual
            </label>
        <label className="radio">
          <input type="radio" name="homosexual" style={{ marginRight: "5px" }} onClick={() => props.onChange({ sexuality: "homosexual" })} />
          homosexual
            </label>
        <label className="radio">
          <input type="radio" name="bisexual" style={{ marginRight: "5px" }} onClick={() => props.onChange({ sexuality: "bisexual" })} />
          bisexual
            </label>
      </div>
    </div>
  );
}



export { SexualOrientation };