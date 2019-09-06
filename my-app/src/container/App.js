import React from 'react';
import Routers from './Routers';
import 'bulma/css/bulma.css'
import '../index.css'
import { BrowserRouter } from "react-router-dom";
import UserProvider from "../context/UserProvider"
import socketIOClient from "socket.io-client";

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
         header: "white-red",
         response: false,
         responses: false,
         endpoint: "http://localhost:3300"
      }
      this.logout = this.logout.bind(this)
      this.onChange = this.onChange.bind(this)

   }

   async componentWillMount() {
      let user = this.getObject("user");
      let header = this.getObject("header")

      header = header === null ? "white-red" : "red-white"
      this.setState({ ...this.state, user: { ...this.state.user, ...user }, header }, () => {
         console.log("restore ", this.state)
      })

      const { endpoint } = this.state;
      const socket = socketIOClient(endpoint);
      socket.on("chats", data => this.setState({ responses: data }, () => {
         
         console.log(this.state)
      }));
      socket.on("chat", data => this.setState({ response: data }, () => {
         
         console.log(this.state)
      }));

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
