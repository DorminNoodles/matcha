import React from 'react';

// class Gender extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { distance: '25' };
//   }

//   render() {

function Gender(props) {
  return (
    <div className="field-param">
      <p style={{ margin: "10px 0px" }}>Gender</p>
      <div className="control">
        <label className="radio">
          <input type="radio" name="gender" style={{ marginRight: "5px" }} onClick={() => props.onChange({ gender: "male" })} />
          Male
        </label>
        <label className="radio">
          <input type="radio" name="gender" style={{ marginRight: "5px" }} onClick={() => props.onChange({ gender: "female" })}  />
          Female
        </label>
      </div>
    </div>
  );
}
// }

export { Gender };