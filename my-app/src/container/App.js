import React from 'react';
import Routers from './Routers';
import 'bulma/css/bulma.css'
import '../index.css'
import { BrowserRouter } from "react-router-dom";
import UserProvider from "../context/UserProvider"
import { logout } from '../function/post'
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3300');

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

   async componentDidUpdate (){
      if (this.state.user && this.state.user.id ){
         socket.emit('notif_subscribe', this.state.user.id + "_notif")
      }
   }

   async UNSAFE_componentWillMount() {
      let header = await this.getObject("header")
      let user = await this.getObject("user");

      header = header === null ? "white-red" : "red-white"

      try {
         var result = user

         this.setState({ ...this.state, header }, () => {
            if (result !== "")
               this.setState({ ...this.state, loading: false, user, header }, () => { })
            else if (document.cookie === "")
               this.logout()
            else{
               this.setState({ ...this.state, loading: false, user: { ...this.state.user, ...user }, header }, () => { })
               socket.emit('notif_subscribe', user.id + "_notif");
            }
         })
      }
      catch (err) {
         result = this.state.user
         const regex = RegExp(/{?.*?}/);
         var reg = document.cookie.match(regex)

         if (reg && reg[0] && reg[0].token)
            result = JSON.parse(reg[0])
      }
   }

   setObject = (key, value) => {
      window.sessionStorage.removeItem(key);
      window.sessionStorage.setItem(key, JSON.stringify(value));
   }

   getObject = (key) => {
      var retrievedObject = window.sessionStorage.getItem(key);
      return JSON.parse(retrievedObject);
   }

   onChange = (index, e) => {
      this.setState({ ...this.state, [index]: e }, () => {
         this.setObject(index, e)
         let token = (this.state.user) ? this.state.user.token : ""
         document.cookie = JSON.stringify({ token, ...this.state.user })
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
      if (this.state.loading === true)
         return (<div>loading</div>)
      else
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
