import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom/'
import { MenuScreen, boardScreen, optionsScreen } from './screen/index';
import { Provider } from "react-redux";
import store from './redux/store';
import './App.scss';

class App extends Component {

  render() {
    return (
      <Provider store={store()}>
        <Switch>
          <Route path="/" component={MenuScreen} exact/>
          <Route path="/board" component={boardScreen}/>
          <Route path="/options" component={optionsScreen}/>
        </Switch>
      </Provider>
    );
  }
}

export default App;
