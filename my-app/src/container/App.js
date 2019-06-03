import React from 'react';
import { Routers } from './Routers';
import 'bulma/css/bulma.css'
import '../index.css'
import { BrowserRouter } from "react-router-dom";


function App() {
   return (
      <BrowserRouter>
         <Routers />
      </BrowserRouter>
   );
}

export default App;
