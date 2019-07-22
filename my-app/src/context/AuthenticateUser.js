import React, { Component } from 'react';
 
// initialize Context with default value
export const UserContext = React.createContext(null);
 
const withUser = (ComposedComponent) => {
  class UserProvider extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username: "Lisouiw",
        password: "COuocou",
        function:{
          onChange: this.onChange
        }
      }
      this.onChange = this.onChange.bind(this)
    }
  
    onChange = (e) => {
      let index = e.target.placeholder.toLowerCase();
      
      console.log(index)
      console.log( e.target.value )
      console.log(this.state)

      // this.setState({ ...this.state, [index]: e.target.value })
    }
 
    render() {
      // console.log(this)
      return(
        <UserContext.Provider value={this.state}>
          <ComposedComponent value={this.state} />
        </UserContext.Provider>
      );
    }
  }
  return UserProvider;
};
 
export default withUser;