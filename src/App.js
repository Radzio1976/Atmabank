import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './index.css';

import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Blog from './components/Blog';
import Contact from './components/Contact';
import BlogPost from './components/BlogPost';

const App = () => {
    return(
      <div id="App">
        <BrowserRouter>
          <Header />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/o-mnie" component={() => <About />} />
                <Route path="/blog" component={() => <Blog />} />
                <Route path="/kontakt" component={Contact} />
                <Route path="/:slug" component={() => <BlogPost />} />
            </Switch>
        </BrowserRouter>
      </div>
    )
}

export default App;
