import React, { Component } from 'react';

// initialize Context with default value
export const UserContext = React.createContext();



const withUser = (ComposedComponent) => {
    class UserProvider extends Component {
        constructor(props) {
            super(props);
            this.state = {
                username: null,
                firstname: null,
                lastname: null,
                email: null,
                orientation: null,
                gender: null,
                location: null,
                distance: null,
                age: null,
                profil: null,
                token: null,
                function: {
                    onChange: this.onChange
                }
            }
            this.onChange = this.onChange.bind(this)
        }

        componentDidMount(e) {
            console.log(this)
        }
        componentDidUpdate(e) {
            console.log(this)
        }
        onChange = (e) => {
            console.log(e)

            this.setState({ ...this.state, ...e }, () => { console.log(this.state) })
        }

        render() {
            console.log(this)
            return (
                <UserContext.Provider value={this.state}>
                    {/* <UserContext.Consumer>
                        {value => (
                            <ComposedComponent context={value} />
                        )}
                    </UserContext.Consumer> */}
                </UserContext.Provider>
            );
        }
    }
    return UserProvider;
};

export default withUser;