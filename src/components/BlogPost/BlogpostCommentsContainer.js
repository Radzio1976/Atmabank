import React, { useEffect, useContext } from "react";
import Axios from 'axios';

import BlogpostAddCommentFormContainer from './BlogpostAddCommentFormContainer';
import BlogpostCommentsWrapper from './BlogpostCommentsWrapper';
import {BlogPostContext} from './BlogPost';

const BlogpostCommentsContainer = (props) => {
    const BlogPostCtx = useContext(BlogPostContext);
    const postID = BlogPostCtx.postID;

    useEffect(() => {
        Axios.get("http://localhost:3000/comments")
        .then(res => {
            const currentComments = res.data.filter(comment => {
                return comment.postID === postID
            });        
            BlogPostCtx.setCurrentPostComments(currentComments);

        })
        .catch(err => {
            console.log("Nie udało się pobrać komentarzy")
        })
    }, []);

    return(
        <div className="blogpost-comments-container">
            <BlogpostAddCommentFormContainer />
            <BlogpostCommentsWrapper />            
        </div>
    )
}

export default BlogpostCommentsContainer;