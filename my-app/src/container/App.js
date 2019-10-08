import React from 'react';
import Routers from './Routers';
import 'bulma/css/bulma.css'
import '../index.css'
import { BrowserRouter } from "react-router-dom";
import UserProvider from "../context/UserProvider"
import { logout } from '../function/post'

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
            age: "",
            profil: "",
            token: "",
            ageMin: "",
            ageMax: "",
            distance: "",
            identity: ""
         },
         header: "white-red",
         response: false,
         responses: false,
         endpoint: "http://localhost:3300"
      }
      this.logout = this.logout.bind(this)
      this.onChange = this.onChange.bind(this)

   }

   async UNSAFE_componentWillMount() {
      let user = this.getObject("user");
      let header = this.getObject("header")

      header = header === null ? "white-red" : "red-white"
      if (!document.cookie === false && document.cookie !== "")
         this.setState({ ...this.state, user: JSON.parse(document.cookie), header }, () => {
            console.log("restore ", this.state)
         })
      else if (!document.cookie === false && document.cookie === "")
         this.logout()
      else
         this.setState({ ...this.state, user: { ...this.state.user, ...user }, header }, () => {
            console.log("restore ", this.state)
         })
   }

   componentWillUnmount() { }

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

      if (this.state.user.token)
         logout(this.state.user.token).then(({ data }) => {
            if (data && data.status === "success") {
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
                     age: "",
                     profil: "",
                     token: "",
                     ageMin: "",
                     ageMax: "",
                     distance: "",
                     identity: ""
                  }
               }, () => { this.setObject("user", this.state) })
            }
         })
   }

   render() {

      return (
         <BrowserRouter>
            <div>{this.state.response}</div>
            <div>{this.state.responses}</div>
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
