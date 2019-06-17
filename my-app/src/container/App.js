import React from 'react';
import Routers from './Routers';
import 'bulma/css/bulma.css'
import '../index.css'
import { BrowserRouter } from "react-router-dom";

class App extends React.Component {

   render() {
      return (
         <BrowserRouter>
               <Routers />
         </BrowserRouter>

      );
   }
}

export default App;
