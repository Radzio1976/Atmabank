import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";
import './index.css';

import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Blog from './components/Blog';
import Contact from './components/Contact';
import BlogPost from './components/BlogPost';

const BLOGQUERY = gql`
query MyQuery {
  blogPosts {
    id
    title
    slug
    image {
      id
      url
    }
    text {
      text
    }
  }
}`

const App = () => {
  const {data, error, loading} = useQuery(BLOGQUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const posts = data.blogPosts;

    return(
      <div id="App">
        <BrowserRouter>
          <Header />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/o-mnie" component={() => <About />} />
                <Route path="/blog" component={() => <Blog posts={posts} />} />
                <Route path="/kontakt" component={Contact} />
                <Route path="/:slug" component={() => <BlogPost posts={posts} />} />
            </Switch>
        </BrowserRouter>
      </div>
    )
}

export default App;
