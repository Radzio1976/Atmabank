import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {useQuery } from "@apollo/client";
import './index.css';

import ALLPOSTSQUERY from '../src/queries/AllPostsQuery';

import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Blog from './components/Blog';
import Contact from './components/Contact';
import BlogPost from './components/BlogPost';

import usePostsHook from './hooks/usePostsHook';

const App = () => {    
  const {getPosts} = usePostsHook();

  const {error, loading} = useQuery(ALLPOSTSQUERY, {onCompleted: (data) => {
    getPosts(data.blogPosts);
  }});
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

    return(
        <div id="App">
          <BrowserRouter>
            <Header />
              <Switch>
              <Route path="/" exact component={Home} />
                <Route path="/o-mnie" component={About} />
                <Route path="/blog" exact component={Blog} />
                <Route path="/kontakt" component={Contact} />
                <Route path="/blog/:slug" component={BlogPost} />
              </Switch>
          </BrowserRouter>
        </div>
    )
}

export default App;