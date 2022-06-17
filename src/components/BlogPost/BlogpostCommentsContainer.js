import React, { useEffect, useContext, createContext } from "react";
import Axios from 'axios';

import { AppContext } from "../../App";
import { BlogPostContext } from "./BlogPost";

const BlogpostCommentsContainerContext = createContext();

const BlogpostCommentsContainer = ({children}) => {
    const AppCtx = useContext(AppContext);
    const BlogPostCtx = useContext(BlogPostContext);
    const postID = BlogPostCtx.postID;

    useEffect(() => {
        Axios.get("http://localhost:3000/comments")
        .then(res => {
            const currentComments = res.data.filter(comment => {
                return comment.postID === postID
            }); 
            //console.log(currentComments)   
            AppCtx.getSecondHeaderMenu(BlogPostCtx.currentPost.categories[0].name, BlogPostCtx.currentPost.title, BlogPostCtx.currentPost.slug)
            AppCtx.getCurrentPostID(postID);    
            AppCtx.getCurrentPostComments(currentComments);  
            AppCtx.getCurrentPostCommentsQty(currentComments);        
        })
        .catch(err => {
            console.log("Nie udało się pobrać komentarzy")
        })
    }, [AppCtx.setCurrentPostComments, AppCtx.setSecondHeaderMenu, postID]);

    return(
        <div className="blogpost-comments-container">{children}</div>
    )
}

export {BlogpostCommentsContainerContext};
export default BlogpostCommentsContainer;

//    }, [BlogPostCtx.setCurrentPostComments, postID]);