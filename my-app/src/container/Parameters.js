import React from 'react';
import { SliderAge, SliderLocation, Gender, SexualOrientation } from '../export'

class Parameters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        password: "",
        confirmation: "",
        firstname: "",
        lastname: "",
        email: "",
        orientation: "",
        gender: "",
        location: ""
      }
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange = (e) => {
    console.log(e)

  }

  render() {

    return (
      <div id="parameters" className="center">
        <Gender onChange={this.onChange} />
        <SexualOrientation />
        <SliderAge />
        <SliderLocation />
        <button className="button" style={{ margin: "10px" }}>Save</button>
      </div>
    );
  }
}

export { Parameters };   