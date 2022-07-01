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
        Axios.post("/getComments")
        .then(res => {
            console.log("Wszystkie komentarze:");
            console.log(res.data.comments);
            const currentComments = res.data.comments.filter(comment => {
                return comment.postID === postID
            }); 
            AppCtx.getSecondHeaderMenu(BlogPostCtx.currentPost.categories[0].name, BlogPostCtx.currentPost.title, BlogPostCtx.currentPost.slug)
            AppCtx.getCurrentPostID(postID);    
            AppCtx.getCurrentPostComments(currentComments);  
            AppCtx.getCurrentPostCommentsQty(currentComments);     
            AppCtx.getLastFiveComments(res.data.comments);   
        })
        .catch(err => {
            console.log("Nie udało się pobrać komentarzy")
        })
    }, [AppCtx.setCurrentPostComments, postID]);

    return(
        <div className="blogpost-comments-container">{children}</div>
    )
}

export {BlogpostCommentsContainerContext};
export default BlogpostCommentsContainer;