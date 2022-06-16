import React, {useState, createContext, useEffect} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {useQuery, gql } from "@apollo/client";
import Axios from 'axios';
import './index.css';

import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Blog from './components/Blog';
import Contact from './components/Contact';
import BlogPost from './components/BlogPost';

const ALLPOSTSQUERY = gql`
query MyQuery {
  blogPosts {
    id
    title
    slug
    categories {
      id
      name
}
    image {
      id
      url
      fileName
    }
    text {
      text
      html
    }
  }
}`

const AppContext = createContext();

const App = (props) => {
  let allPosts = [];
  const [posts, setPosts] = useState([]); // ta zmienna musi być w App.js
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3000/comments")
    .then(res => {
      console.log(res.data)
        setAllComments(res.data);   
    })

    .catch(err => {
        console.log("Nie udało się pobrać komentarzy")
    })
  }, [])

  const {error, loading, data} = useQuery(ALLPOSTSQUERY, {onCompleted: (data) => {
    setPosts(data.blogPosts);
  }})
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  allPosts = data.blogPosts;

    return(
      <AppContext.Provider value={{
        allPosts,
        posts,
        setAllComments,
        setPosts,
        }}>
        <div id="App">
          <BrowserRouter>
            <Header />
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/o-mnie" component={About} />
                <Route path="/blog" component={Blog} />
                <Route path="/kontakt" component={Contact} />
                <Route path="/:slug" component={BlogPost}v />
              </Switch>
          </BrowserRouter>
        </div>
      </AppContext.Provider>
    )
}

export {AppContext};
export default App;
