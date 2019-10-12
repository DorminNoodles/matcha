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
         loading: true,
         header: "white-red",
         response: false,
         responses: false,
         endpoint: "http://localhost:3300"
      }
      this.logout = this.logout.bind(this)
      this.onChange = this.onChange.bind(this)

   }

   async componentDidMount() {
      let user = this.getObject("user");
      let header = this.getObject("header")

      header = header === null ? "white-red" : "red-white"
      
      try {
         var result = JSON.parse(document.cookie);
         this.setState({ ...this.state, header }, () => {
            if (result !== "")
               this.setState({ ...this.state, loading: false, user: result, header }, () => {
                  console.log("restore ", this.state)
               })
            else if (document.cookie === "")
               this.logout()
            else
               this.setState({ ...this.state, loading: false, user: { ...this.state.user, ...user }, header }, () => {
                  console.log("restore ", this.state)
               })
         })
      } catch (error) { }

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
        document.cookie = JSON.stringify({ token: this.state.user.token, ...this.state.user })
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
                  },
                  loading: false
               }, () => {
                  this.setObject("user", this.state)
               })
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
