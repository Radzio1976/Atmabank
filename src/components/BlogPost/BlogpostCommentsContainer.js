import React, { useEffect, useState, useContext, createContext } from "react";
import Axios from 'axios';

import { BlogPostContext } from "./BlogPost";

const BlogpostCommentsContainerContext = createContext();

const BlogpostCommentsContainer = ({children}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [text, setText] = useState("");

    const [mainCommentsFormVisibility, setmainCommentsFormVisibility] = useState(true);

    const time = new Date();
    const currentTime = `${time.getHours()}:${time.getMinutes()}` /// tutaj dokończyć

    let dateInPolish = new Intl.DateTimeFormat( 'pl', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    } );
    dateInPolish.format( new Date() );

    const commentTime = `${dateInPolish.format( new Date() )} o ${currentTime}`;

    const BlogPostCtx = useContext(BlogPostContext);
    const postID = BlogPostCtx.postID;

    useEffect(() => {
        Axios.get("http://localhost:3000/comments")
        .then(res => {
            const currentComments = res.data.filter(comment => {
                return comment.postID === postID
            }); 
            console.log(currentComments)       
            BlogPostCtx.setCurrentPostComments(currentComments);  
            BlogPostCtx.getCurrentPostCommentsQty(currentComments);        
        })
        .catch(err => {
            console.log("Nie udało się pobrać komentarzy")
        })
    }, [BlogPostCtx.setCurrentPostComments, postID]);

    const nameChange = (nameValue) => {
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

    return(
        <BlogpostCommentsContainerContext.Provider value={{
            name,
            nameChange,
            email,
            emailChange,
            text,
            textChange,
            commentTime,
            resetForm,
            mainCommentsFormVisibility,
            setmainCommentsFormVisibility
        }}>
            <div className="blogpost-comments-container">{children}</div>
        </BlogpostCommentsContainerContext.Provider>
    )
}

export {BlogpostCommentsContainerContext};
export default BlogpostCommentsContainer;