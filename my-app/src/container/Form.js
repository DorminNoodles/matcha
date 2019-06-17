import React, { Component } from 'react';
const AppContext = React.createContext()

class AppProvider extends Component {
    state = {
        number: 10
    }

    render() {
        return <AppContext.Provider value={this.state}>
            {this.props.children}
        </AppContext.Provider>
    }
}


const Green = ({number}) => (
    <div className="green">
        {nume}
    </div>
)
const Blue = () => (
    <div className="blue">

        <AppContext.Consumer>
            {(context) => <Green number={context.number} />}
        </AppContext.Consumer>

    </div>
)

class Form extends Component {
    render() {
        return <AppProvider>
            <div className="red">
                {/* <AppContext.Consumer>
                    {(context) => context.number}
                </AppContext.Consumer> */}
                <Blue />
            </div>
        </AppProvider>
    }
}

export default Form