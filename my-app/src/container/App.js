import React from 'react';
import { Routers } from './Routers';
import 'bulma/css/bulma.css'
import '../index.css'
import { BrowserRouter } from "react-router-dom";
import{ Provider} from "./MyContext"

const UserContext = React.createContext('light');


class App extends React.Component {
   state = {
      greeting: "sdsd",
      setGreeting: ({ value }) => this.setState({ greeting: value })
   };

   render() {
      return (
         <BrowserRouter>
            <Provider value={this.state}>
               <Routers />
            </Provider>
         </BrowserRouter>

      );
   }
}

export default App;
