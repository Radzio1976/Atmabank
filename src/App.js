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

const App = () => {
  let allPosts = [];
  const [posts, setPosts] = useState([]); // ta zmienna musi być w App.js
  const [allComments, setAllComments] = useState([]);

  const [category, setCategory] = useState("");
  const [currentPostTitle, setCurrentPostTitle] = useState("");
  const [currentPostSlug, setCurrentPostSlug] = useState("");

  const [secondHeaderMenu, setSecondHeaderMenu] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  const [postID, setPostID] = useState("");
  const [currentPostComments, setCurrentPostComments] = useState([]);
  const [currentPostCommentsQty, setCurrentPostCommentsQty] = useState(0);

  const [mainCommentsFormVisibility, setmainCommentsFormVisibility] = useState(true);

  useEffect(() => {
    Axios.get("http://localhost:3000/comments")
    .then(res => {
      //console.log(res.data)
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

  const getSecondHeaderMenu = (category, currentPostTitle, currentPostSlug) => {
    setCategory(category);
    setCurrentPostTitle(currentPostTitle);
    setCurrentPostSlug(currentPostSlug);
  }

  const clearCategory = () => {
    setCategory("");
  }

  const nameChange = (nameValue) => {
    setName(nameValue);
  };

  const emailChange = (emailValue) => {
    setEmail(emailValue);
  };

  const textChange = (textValue) => {
    setText(textValue);
};

  const getCurrentPostID = (postID) => {
    setPostID(postID);
  }

  const getCurrentPostComments = (currentComments) => {
    setCurrentPostComments(currentComments);
  }

  const getCurrentPostCommentsQty = (currentComments) => {
    let result = 0;
    let parentCommentsQty = currentComments.length;
    currentComments.forEach(value => {
      result = value.commentAnswers.length + result;
    })
    setCurrentPostCommentsQty(result + parentCommentsQty);  
  };

  
  const resetForm = () => {
    setName("");
    setEmail("");
    setText("");  
  } 
  
  const showSendAnswerForm = (id) => {
    const currentComments = currentPostComments.map(el => {
        if (el.id === id) {
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

  const showCommentButton = () => {
    const currentComments = currentPostComments.map(el => {
        return {...el, isCommentAnswerOn: false}
    })
    setmainCommentsFormVisibility(true);
    setCurrentPostComments(currentComments);
    resetForm();
  }

  const getCommentTime = () => {
    const time = new Date();
    const currentTime = `${time.getHours()}:${time.getMinutes()}` /// tutaj dokończyć

    let dateInPolish = new Intl.DateTimeFormat( 'pl', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    } );
    dateInPolish.format( new Date() );

    return `${dateInPolish.format( new Date() )} o ${currentTime}`;
  }

  const sendComment = () => {
    let comment = {
        postID, 
        name, 
        email, 
        text, 
        commentTime: getCommentTime(), 
        isCommentAnswerOn: false,
        commentAnswers: []
    }
    
    Axios.post("http://localhost:3000/comments", comment)
    .then(res => {
        console.log("Wysłany komentarz", res.data);
        resetForm();
        Axios.get("http://localhost:3000/comments")
        .then(res => {    
            const currentComments = res.data.filter(comment => {
                return comment.postID === postID
            });           
            setCurrentPostComments(currentComments);
            getCurrentPostCommentsQty(currentComments);
        })
        .catch(err => {
            console.log("Nie udało się pobrać komentarzy")
        })
    })
    .catch(err => {
        console.log("Nie udało się wysłać komentarza");
    })
  }

  const sendCommentsAnswer = (parentCommentID) => {
    let mainComment = currentPostComments.filter(comment => {
        return comment.id === parentCommentID;
    })
    let commentAnswer = {
        parentCommentID,
        postID, 
        name, 
        email, 
        text, 
        commentTime: getCommentTime(), 
        isCommentAnswerOn: false,
    }
    mainComment[0].commentAnswers.push(commentAnswer);
        let commentsData = {
        postID: mainComment[0].postID,
        name: mainComment[0].name, 
        email: mainComment[0].email,
        text: mainComment[0].text,
        commentTime: mainComment[0].commentTime, 
        isCommentAnswerOn: false,
        commentAnswers: mainComment[0].commentAnswers
    }
          
    Axios.put(`http://localhost:3000/comments/${parentCommentID}`, commentsData)
    .then(res => {
        console.log("Wysłana odpowiedź do komentarza :", res.data)
        resetForm();
        Axios.get("http://localhost:3000/comments")
        .then(res => {    
            const currentComments = res.data.filter(comment => {
                return comment.postID === postID
            });           
            setCurrentPostComments(currentComments);
            getCurrentPostCommentsQty(currentComments);
        })
        .catch(err => {
            console.log("Nie udało się pobrać komentarzy")
        })        
    })
    .catch(err => {
        console.log("Nie udało się wysłać odpowiedzi na komentarz", err);
    })
  
  }

    return(
      <AppContext.Provider value={{
        category,
        currentPostTitle,
        currentPostSlug,
        secondHeaderMenu,
        getSecondHeaderMenu,
        clearCategory,
        allPosts,
        posts,
        setAllComments,
        setPosts,
        nameChange,
        setName,
        emailChange,
        setEmail,
        textChange,
        setText,
        getCurrentPostID,
        currentPostComments,
        setCurrentPostComments,
        getCurrentPostComments,
        currentPostCommentsQty,
        getCurrentPostCommentsQty,
        showSendAnswerForm,
        mainCommentsFormVisibility,
        showCommentButton,
        sendComment,
        sendCommentsAnswer
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
