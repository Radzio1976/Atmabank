import React, {useState, createContext} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {useQuery, gql } from "@apollo/client";
import Axios from 'axios';
import './index.css';

import ALLPOSTSQUERY from '../src/queries/AllPostsQuery';

import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Blog from './components/Blog';
import Contact from './components/Contact';
import BlogPost from './components/BlogPost';

import AppState from './hooks/AppState';
import useLastFiveCommentsHook from './hooks/GetLastFiveCommentsHook';
import usePostsHook from './hooks/GetPostsHook';
import useCurrentPostCommentsHook from './hooks/GetCurrentPostCommentsHook';
import useCurrentPostCommentsQtyHook from './hooks/GetCurrentPostCommentsQtyHook';
import useResetCommentFormHook from './hooks/GetResetCommentFormHook';

const AppContext = createContext();

const App = () => {
  const {
    category, 
    setCategory, 
    postTitle, 
    setPostTitle, 
    currentPostSlug, 
    setCurrentPostSlug, 
    postID, 
    setPostID, 
    lastFiveComments, 
    setLastFiveComments,
    currentPostComments,
    name,
    email,
    text
        } = AppState();
    
  const {getLastFiveComments} = useLastFiveCommentsHook(); 
  const {getPosts} = usePostsHook();
  const {getCurrentPostComments} = useCurrentPostCommentsHook();
  const {getCurrentPostCommentsQty} = useCurrentPostCommentsQtyHook();
  const {resetCommentForm} = useResetCommentFormHook();

  const [postsMainBase, setPostsMainBase] = useState([]); 
  const [posts, setPosts] = useState([]); 

  const [currentPostCommentsQty, setCurrentPostCommentsQty] = useState(0);

  const [mainCommentsFormVisibility, setmainCommentsFormVisibility] = useState(true);

  const {error, loading} = useQuery(ALLPOSTSQUERY, {onCompleted: (data) => {
    getPosts(data.blogPosts);
  }});
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // This function supports visibility of "SKOMENTUJ" button
  const showCommentButton = () => {
    const currentComments = currentPostComments.map(el => {
        return {...el, isCommentAnswerOn: false}
    })
    setmainCommentsFormVisibility(true);
    getCurrentPostComments(currentComments);
    resetCommentForm();
  }

  // This function return current time used to add comments
  const getCommentTimeInPolish = (time) => {
    const currentTime = `${time.getHours()}:${time.getMinutes()}` /// tutaj dokończyć
    let dateInPolish = new Intl.DateTimeFormat( 'pl-PL', { dateStyle: 'full' }).format(time);    
    return `${dateInPolish} o ${currentTime}`;
  }

  // This function supports send parent comments
  const sendComment = () => {
    let comment = {
        postID, 
        name, 
        email, 
        text, 
        currentPostSlug,
        commentTime: new Date(), 
        isCommentAnswerOn: false,
        commentAnswers: []
    }
    
    Axios.post("/addComment", comment)
    .then(res => {
        console.log(res.data.info);
        console.log("Wszystkie komentarze", res.data.comments);

        const currentComments = res.data.comments.filter(comment => {
          return comment.postID === postID
      });           
      getCurrentPostComments(currentComments);
      getCurrentPostCommentsQty(currentComments);
      getLastFiveComments(res.data.comments);
      resetCommentForm();
      
    })
    .catch(err => {
        console.log("Nie udało się wysłać komentarza");
    })
  }

    // This function supports send parent comments answers
  const sendCommentsAnswer = (parentCommentID) => {
    //console.log(parentCommentID)
    let mainComment = currentPostComments.filter(comment => {
      return comment._id === parentCommentID;
  })
  console.log(mainComment[0]._id)
  let commentAnswer = {
      parentCommentID,
      postID, 
      name, 
      email, 
      text, 
      currentPostSlug,
      commentTime: new Date(), 
      isCommentAnswerOn: false,
  }

    Axios.post("/addCommentsAnswer", commentAnswer)
    .then(res => {
        console.log(res.data.info);
        console.log("Wszystkie komentarze:", res.data.comments);
        const currentComments = res.data.comments.filter(comment => {
          return comment.postID === postID
      });           
      getCurrentPostComments(currentComments);
      getCurrentPostCommentsQty(currentComments);
      getLastFiveComments(res.data.comments);
      resetCommentForm();   
    })
    .catch(err => {
        console.log("Nie udało się wysłać odpowiedzi na komentarz", err);
    });
  }

    return(
      <AppContext.Provider value={{
        postsMainBase,
        posts,
        setPosts,
        currentPostCommentsQty,
        getCurrentPostCommentsQty,
        showSendAnswerForm,
        mainCommentsFormVisibility,
        showCommentButton,
        getCommentTimeInPolish,
        sendComment,
        sendCommentsAnswer
        }}>
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
      </AppContext.Provider>
    )
}

export {AppContext};
export default App;