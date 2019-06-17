import React, { Component } from 'react';

export const UserContext = React.createContext()

class UserProvider extends Component {
    state = {
        username: "Lisouiw",
        firstname: "Lisa",
        lastname: "TRAN",
        email: "244316eaa8@himail.online",
        orientation: "male",
        gender: "femelle",
        location: "Paris",
        distance: 25,
        age: [ 18, 25 ],
        profil:"",
        token:""
    }

    render() {
        return <UserContext.Provider value={this.state}>
            {this.props.children}
        </UserContext.Provider>
    }
}

export default UserProvider;