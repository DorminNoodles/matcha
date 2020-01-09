import React from 'react';
import UserProvider from '../context/UserProvider';

class NotFound extends React.Component {

  static contextType = UserProvider;

  UNSAFE_componentWillMount() {
    if (this.context.header === "red-white")
      this.context.onChange("header", "white-red")
  }

  render() {
    return (<React.Fragment>NOT FOUND</React.Fragment>);
  }
}

export default NotFound;
