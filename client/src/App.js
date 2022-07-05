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

import AppState from './utils/AppState';
import useLastFiveComments from './utils/GetLastFiveComments';

const AppContext = createContext();

const App = () => {
  const {        category, 
    setCategory, 
    postTitle, 
    setPostTitle, 
    currentPostSlug, 
    setCurrentPostSlug, 
    postID, 
    setPostID, 
    lastFiveComments, 
    setLastFiveComments} = AppState();
    
  const {getLastFiveComments} = useLastFiveComments();

  let allPosts = [];

  const [posts, setPosts] = useState([]); 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  //const [postID, setPostID] = useState("");
  const [currentPostComments, setCurrentPostComments] = useState([]);
  const [currentPostCommentsQty, setCurrentPostCommentsQty] = useState(0);

  const [mainCommentsFormVisibility, setmainCommentsFormVisibility] = useState(true);

  const {error, loading, data} = useQuery(ALLPOSTSQUERY, {onCompleted: (data) => {
    setPosts(data.blogPosts);
  }})
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  allPosts = data.blogPosts;

  const nameChange = (nameValue) => {
    setName(nameValue);
  };

  const emailChange = (emailValue) => {
    setEmail(emailValue);
  };

  const textChange = (textValue) => {
    setText(textValue);
};

  //const getCurrentPostID = (postID) => {
  //  setPostID(postID);
  //}

  // This function update state of current post comments
  const getCurrentPostComments = (currentComments) => {
    setCurrentPostComments(currentComments);
  }

  // This function update the counter for comments 
  const getCurrentPostCommentsQty = (currentComments) => {
    let result = 0;
    let parentCommentsQty = currentComments.length;
    currentComments.forEach(value => {
      result = value.commentAnswers.length + result;
    })
    setCurrentPostCommentsQty(result + parentCommentsQty);  
  };

  // This function supports clear of comment's form inputs
  const resetForm = () => {
    setName("");
    setEmail("");
    setText("");  
  } 
  
  // This function supports visibility of parent comment form
  const showSendAnswerForm = (id) => {
    const currentComments = currentPostComments.map(el => {
        if (el._id === id) {
            return {...el, isCommentAnswerOn: true}
        } else {
            return {...el, isCommentAnswerOn: false}
        }
        return {...el};
    })
  
    setmainCommentsFormVisibility(false);
    setCurrentPostComments(currentComments);
    resetForm();
  }

  // This function supports visibility of "SKOMENTUJ" button
  const showCommentButton = () => {
    const currentComments = currentPostComments.map(el => {
        return {...el, isCommentAnswerOn: false}
    })
    setmainCommentsFormVisibility(true);
    setCurrentPostComments(currentComments);
    resetForm();
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
      resetForm();
      
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
      resetForm();   
    })
    .catch(err => {
        console.log("Nie udało się wysłać odpowiedzi na komentarz", err);
    })

  }

    return(
      <AppContext.Provider value={{
        allPosts,
        posts,
        setPosts,
        name,
        nameChange,
        setName,
        email,
        emailChange,
        setEmail,
        text,
        textChange,
        setText,
        //getCurrentPostID,
        currentPostComments,
        setCurrentPostComments,
        getCurrentPostComments,
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