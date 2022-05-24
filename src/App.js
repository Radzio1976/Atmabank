import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Blog from './components/Blog';

class App extends React.Component {
  render() {
    return(
      <div id="App">
        <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/blog" component={Blog} />
        </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
