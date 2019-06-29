import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Signin from './Signin'

class Main extends React.Component {
  state = {isAuth: false};
  render ()  {
    return (
      <Switch>
        <Route path='/signin' exact component={Signin} isAuth={this.state.isAuth} />
      </Switch>)
    }
  
}

export default Main