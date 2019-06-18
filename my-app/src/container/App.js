import React from 'react';
import Routers from './Routers';
import 'bulma/css/bulma.css'
import '../index.css'
import { BrowserRouter } from "react-router-dom";
import UserProvider from "../context/UserProvider"

class App extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         username: "",
         firstname: "",
         lastname: "",
         email: "",
         orientation: "",
         gender: "",
         location: "",
         distance: "",
         age: "",
         profil: "",
         token: ""
      }
      this.logout = this.logout.bind(this)

   }

   async componentWillMount() {
      let data = this.getObject("user");
      this.setState({ ...data }, () => {
         console.log("restore ", this.state)
      })
   }

   setObject = (key, value) => {
      window.sessionStorage.setItem(key, JSON.stringify(value));
   }

   getObject = (key) => {
      var retrievedObject = window.sessionStorage.getItem(key);

      return JSON.parse(retrievedObject);
   }

   onChange = (e) => {
      this.setState({ ...this.state, ...e }, () => {
         this.setObject("user", this.state)
      })
   }

   logout = () => {
      this.setState({
         username: "",
         firstname: "",
         lastname: "",
         email: "",
         orientation: "",
         gender: "",
         location: "",
         distance: "",
         age: "",
         profil: "",
         token: ""
      }, () => {
         this.setObject("user", this.state)
      })
   }

   render() {

      return (
         <BrowserRouter>

            <UserProvider.Provider value={{
               ...this.state,
               onChange: this.onChange,
               logout: this.logout,
            }}>
               <Routers />
            </UserProvider.Provider>
         </BrowserRouter>
      );
   }
}

export default App;
