import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';

class App extends React.Component {
  render() {
    return(
      <div id="App">
        <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
        </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
