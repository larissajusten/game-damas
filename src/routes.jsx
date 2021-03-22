import { BrowserRouter as Router, Switch, Route } from 'react-router-dom/'
import { MenuScreen, MatchScreen, OptionsScreen } from './screens'

export const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={MenuScreen} />
      <Route path="/play" component={MatchScreen} />
      <Route path="/options" component={OptionsScreen} />
    </Switch>
  </Router>
)
