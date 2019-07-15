import React from 'react';

class SexualOrientation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { distance: '25' };
  }

  render() {

    return (
      <div className="field-param">
        <p style={{ margin: "10px 0px" }}>Sexual Orientaion</p>
        <div className="control" style={{ display: "table" }}>
          <label className="radio">
            <input type="radio" name="heterosexual" style={{ marginRight: "5px" }} />
            heterosexual
            </label>
          <label className="radio">
            <input type="radio" name="homosexual" style={{ marginRight: "5px" }} />
            homosexual
            </label>
          <label className="radio">
            <input type="radio" name="bisexual" style={{ marginRight: "5px" }} />
            bisexual
            </label>
        </div>
      </div>
    );
  }
}



export { SexualOrientation };