import React, {useState, createContext} from 'react';
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

  const [posts, setPosts] = useState([]); 
  const [lastFiveComments, setLastFiveComments] = useState([]);

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
    setCategory();
  }


  const getLastFiveComments = (allComments) => {
    let comments = [];
    let slugs = [];
    let arrayOfCommentsSortedBySlug = [];
    
    allComments.forEach(comment => {
        slugs.push(comment.currentPostSlug)
    })

    const uniqueSlugs = [...new Set(slugs)]

    uniqueSlugs.forEach(slug => {
      let postComments = allComments.filter(comment => {
        return comment.currentPostSlug === slug
      });
      arrayOfCommentsSortedBySlug.push(postComments)
    })

    for (let i=0; i<arrayOfCommentsSortedBySlug.length; i++) {
      for (let j=0; j<arrayOfCommentsSortedBySlug[i].length; j++) {
        arrayOfCommentsSortedBySlug[i][j].scrollID = `${arrayOfCommentsSortedBySlug[i][j].currentPostSlug}-${j + 1}-comment`;
        comments.push(arrayOfCommentsSortedBySlug[i][j]);
        for (let k=0; k<arrayOfCommentsSortedBySlug[i][j].commentAnswers.length; k++) {
          arrayOfCommentsSortedBySlug[i][j].commentAnswers[k].scrollID = `${arrayOfCommentsSortedBySlug[i][j].commentAnswers[k].currentPostSlug}-${k + 1}-answer-of-${j + 1}-comment`;
          comments.push(arrayOfCommentsSortedBySlug[i][j].commentAnswers[k]);
        }
      }
    }

    let sortedByDateComments = comments.sort(function(a,b){
      return new Date(b.commentTime) - new Date(a.commentTime);
    }).slice(0, 5)
    setLastFiveComments(sortedByDateComments);
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
    
    Axios.post("http://localhost:3000/comments", comment)
    .then(res => {
        console.log("Wysłany komentarz", res.data);
        Axios.get("http://localhost:3000/comments")
        .then(res => {    
            const currentComments = res.data.filter(comment => {
                return comment.postID === postID
            });           
            setCurrentPostComments(currentComments);
            getCurrentPostCommentsQty(currentComments);
            getLastFiveComments(res.data);
            resetForm();
        })
        .catch(err => {
            console.log("Nie udało się pobrać komentarzy")
        })
    })
    .catch(err => {
        console.log("Nie udało się wysłać komentarza");
    })
  }

    // This function supports send parent comments answers
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
        currentPostSlug,
        commentTime: new Date(), 
        isCommentAnswerOn: false,
    }
    mainComment[0].commentAnswers.push(commentAnswer);
        let commentsData = {
        postID: mainComment[0].postID,
        name: mainComment[0].name, 
        email: mainComment[0].email,
        text: mainComment[0].text,
        currentPostSlug: mainComment[0].currentPostSlug,
        commentTime: mainComment[0].commentTime, 
        isCommentAnswerOn: false,
        commentAnswers: mainComment[0].commentAnswers
    }
          
    Axios.put(`http://localhost:3000/comments/${parentCommentID}`, commentsData)
    .then(res => {
        console.log("Wysłana odpowiedź do komentarza :", res.data)
        Axios.get("http://localhost:3000/comments")
        .then(res => {    
            const currentComments = res.data.filter(comment => {
                return comment.postID === postID
            });           
            setCurrentPostComments(currentComments);
            getCurrentPostCommentsQty(currentComments);
            getLastFiveComments(res.data);
            resetForm();
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
        lastFiveComments,
        setLastFiveComments,
        getLastFiveComments,
        category,
        currentPostTitle,
        currentPostSlug,
        secondHeaderMenu,
        getSecondHeaderMenu,
        clearCategory,
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
        //setCurrentPostSlug,
        //getCurrentPostSlug,
        getCurrentPostID,
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
