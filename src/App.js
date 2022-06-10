import React, {useState, createContext} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {useQuery, gql } from "@apollo/client";
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
  const [posts, setPosts] = useState([]);
  const {error, loading, data} = useQuery(ALLPOSTSQUERY, {onCompleted: (data) => {
    setPosts(data.blogPosts);
  }})
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  allPosts = data.blogPosts;

  // Funkcja poniżej jest wywoływana w komponencie PostsCategories i sortuje posty pod kątem kategorii w komponencie Blog
  const getPostsByCategory = (categoryName) => {
    //props.history.push("/blog");

    let postsByCategory = allPosts.filter(post => {
        return post.categories[0].name === categoryName;
    })
    setPosts(postsByCategory);
  }

  // Funkcja poniżej dotyczy komponentu PostsCategories i wyszukuje unikalne kategorie ze wszystkich obiektów z postami (prawa kolumna Kategorie)
  const uniqueCategories = () => {
    const mainBaseOfCategories = allPosts;
    let categoriesNames = [];

    mainBaseOfCategories.forEach(category => {
        categoriesNames.push(category.categories[0].name)
    })

    const uniqueCategories = [...new Set(categoriesNames)]
    return uniqueCategories.sort();
  }

    return(
      <AppContext.Provider value={{
        allPosts,
        posts,
        setPosts,
        getPostsByCategory,
        uniqueCategories
        }}>
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
      </AppContext.Provider>
    )
}

export {AppContext};
export default App;
