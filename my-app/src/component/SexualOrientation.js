import React from 'react';

function SexualOrientation(props) {
  return (
    <div className="field-param">
      <p style={{ margin: "10px 0px" }}>Sexual Orientaion</p>
      <div className="control" style={{ display: "table" }}>
        <label className="radio">
          <input type="radio" name="sexual" style={{ marginRight: "5px" }} onClick={() => props.onChange({ orientation: "heterosexual" })} />
          heterosexual
            </label>
        <label className="radio">
          <input type="radio" name="sexual" style={{ marginRight: "5px" }} onClick={() => props.onChange({ orientation: "homosexual" })} />
          homosexual
            </label>
        <label className="radio">
          <input type="radio" name="sexual" style={{ marginRight: "5px" }} onClick={() => props.onChange({ orientation: "bisexual" })} />
          bisexual
            </label>
      </div>
    </div>
  );
}



export { SexualOrientation };