import React from 'react';
import { SliderAgeRange, SliderLocation, Gender, SexualOrientation } from '../export'
import UserProvider from '../context/UserProvider';

class Parameters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        username: "sssss",
        password: "",
        confirmation: "",
        firstname: "",
        lastname: "",
        email: "",
        orientation: "",
        gender: "",
        location: "",
        distance: 25,
        age: 24,
        desired: { min: 18, max: 25 },
    }
    this.onChange = this.onChange.bind(this)
  }
  static contextType = UserProvider;

  componentWillReceiveProps() {
    if (this.context.header !== "white-red")
      this.context.onChange("header", "white-red")
  }

  componentDidMount() {
    if (this.context.header !== "white-red")
      this.context.onChange("header", "white-red")
  }


  onChange = (e) => {
    this.setState({ ...this.state, ...e }, () => {})
  }

  render() {

    return (
      <div id="parameters" className="center">
        <Gender onChange={this.onChange} />
        <SexualOrientation onChange={this.onChange} />
        <SliderAgeRange onChange={this.onChange} age={this.state.desired} />
        <SliderLocation onChange={this.onChange} distance={this.state.distance} />
        <button className="button" style={{ margin: "10px" }}>Save</button>
      </div>
    );
  }
}

export { Parameters };   