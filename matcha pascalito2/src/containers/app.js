//React
import React, {Component} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'


//Style
import '../style/bootstrap-4.1.3-dist/css/bootstrap.css'
import '../style/app.css'

//Component
import PageAccueil from '../components/pageAccueil'
import Inscription from '../components/inscription'
import Connexion from '../components/connexion'
import PageIntrouvable from '../components/pageIntrouvable'

class App extends Component{
    
    render(){
        return(
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' render={() => <PageAccueil />} />
                        <Route exact path='/inscription' render={() => <Inscription />} />
                        <Route exact path='/connexion' render={() => <Connexion />} />
                        <Route  render={() => <PageIntrouvable />} />
                    </Switch>
                </BrowserRouter>
            </div>

        );
    }
}

export default App;