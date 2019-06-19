import React from 'react';
import Routers from './Routers';
import 'bulma/css/bulma.css'
import '../index.css'
import { BrowserRouter } from "react-router-dom";
import { withRouter } from "react-router";
import UserProvider from "../context/UserProvider"

class App extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         user: {
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
         },
         header: "white-red"
      }
      this.logout = this.logout.bind(this)
      this.onChange = this.onChange.bind(this)

   }

   async componentWillMount() {
      let user = this.getObject("user");
      let header = this.getObject("header");
      this.setState({ ...this.state, user, header }, () => {
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

   onChange = (index, e) => {
      this.setState({ ...this.state, [index]: e }, () => {
         this.setObject(index, e)
      })
   }

   logout = () => {
      this.setState({
         ...this.state,
         user: {
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

export default (App);
