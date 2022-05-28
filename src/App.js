import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Blog from './components/Blog';
import Contact from './components/Contact';

class App extends React.Component {
  render() {
    return(
      <div id="App">
        <BrowserRouter>
          <Header />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" component={About} />
                <Route path="/blog" component={Blog} />
                <Route path="/contact" component={Contact} />
            </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
