import { useState, createContext } from 'react';
import { useParams } from "react-router-dom";
import {useQuery, gql } from "@apollo/client";
import Axios from 'axios';

import BlogpostPostContainer from "./BlogpostPostContainer";
import BlogpostCommentsContainer from "./BlogpostCommentsContainer";

import "./BlogPost.css";

const ALLPOSTSQUERY = gql`
query MyQuery {
  blogPosts {
    id
    title
    slug
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

const BlogPostContext = createContext();

const BlogPost = () => {
  let { slug } = useParams();

  const [mainCommentsFormVisibility, setmainCommentsFormVisibility] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const date = new Date();
  const commentTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} | ${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
  const [currentPostComments, setCurrentPostComments] = useState([]);
  const [currentPostCommentsQty, setCurrentPostCommentsQty] = useState(0);

  let {data, error, loading} = useQuery(ALLPOSTSQUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const posts = data.blogPosts;

  const getCurrentPost = (slug) => {
    const currentPost = posts.filter(post => {
      return post.slug === slug;
    });
    return currentPost[0];
  }

  const currentPost = getCurrentPost(slug);
  const postID = currentPost.id;



  const getCurrentPostCommentsQty = (currentComments) => {
    let result = 0;
    let parentCommentsQty = currentComments.length;
    currentComments.forEach(value => {
      result = value.commentAnswers.length + result;
    })
    setCurrentPostCommentsQty(result + parentCommentsQty);
  
  };

  const nameChange = (nameValue) => {
    console.log(nameValue)
    setName(nameValue);
  };
  const emailChange = (emailValue) => {
    setEmail(emailValue);
  };
  const textChange = (textValue) => {
      setText(textValue);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setText("");  
}  

const sendComment = () => {
  let comment = {
      postID, 
      name, 
      email, 
      text, 
      commentTime, 
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
          resetForm();
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

const sendCommentsAnswer = (parentCommentID) => {
  console.log(parentCommentID);
  console.log(currentPostComments);
  let mainComment = currentPostComments.filter(comment => {
      return comment.id === parentCommentID;
  })
  console.log(mainComment);
  let commentAnswer = {
      parentCommentID,
      postID, 
      name, 
      email, 
      text, 
      commentTime, 
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
      Axios.get("http://localhost:3000/comments")
      .then(res => {    
          const currentComments = res.data.filter(comment => {
              return comment.postID === postID
          });           
          setCurrentPostComments(currentComments);
          resetForm();  
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
    <BlogPostContext.Provider value={{
      postID,
      getCurrentPostCommentsQty,
      currentPostCommentsQty,
      nameChange,
      name,
      emailChange,
      email,
      textChange,
      text,
      sendComment,
      setCurrentPostComments,
      currentPostComments,
      showSendAnswerForm,
      mainCommentsFormVisibility,
      showCommentButton,
      sendCommentsAnswer
    }}>
      <div id="BlogPost">
          <div className="blogpost-container">
          <div className="blogpost-container-left-column">
            <BlogpostPostContainer currentPost={currentPost} />
            <BlogpostCommentsContainer />
          </div>
          <div className="blogpost-container-right-column">

          </div>
          </div>
      </div>
    </BlogPostContext.Provider>
  )
}

export {BlogPostContext};
export default BlogPost;  