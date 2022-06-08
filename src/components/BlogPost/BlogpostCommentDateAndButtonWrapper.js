import React, { useContext } from "react";

import {BlogPostContext} from './BlogPost';

const BlogpostCommentDateAndButtonWrapper = (props) => {
    const BlogPostCtx = useContext(BlogPostContext);
    const comment = props.comment;

    return(
        <div className="blogpost-comment-date-and-button-wrapper">
        <div className="blogpost-comment-date">
            <p>{comment.commentTime}</p>
        </div>
        <div className="blogpost-comment-button">
            <button onClick={(e) => BlogPostCtx.showSendAnswerForm(comment.id)}>Odpowiedz</button>
        </div>
    </div>
    )
};

export default BlogpostCommentDateAndButtonWrapper;