import React from 'react';

class Gender extends React.Component {
  constructor(props) {
    super(props);
    this.state = { distance: '25' };
  }

  render() {

    return (
      <div className="field-param">
        <p style={{ margin: "10px 0px" }}>Gender</p>
        <div className="control">
          <label className="radio">
            <input type="radio" name="gender" style={{ marginRight: "5px" }} />
            Male
            </label>
          <label className="radio">
            <input type="radio" name="gender" style={{ marginRight: "5px" }} />
            Female
            </label>
        </div>
      </div>
    );
  }
}

export { Gender };