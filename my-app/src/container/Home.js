import React from 'react';
import UserProvider from '../context/UserProvider';

class Home extends React.Component {
  static contextType = UserProvider;

  componentWillReceiveProps() {
    if (this.context.header !== "white-red")
      this.context.onChange("header", "white-red")
  }

  componentDidMount() {
    if (this.context.header !== "white-red")
      this.context.onChange("header", "white-red")
  }

  render(){
    return ( <React.Fragment>home</React.Fragment>);
  }
}

export default Home ;
