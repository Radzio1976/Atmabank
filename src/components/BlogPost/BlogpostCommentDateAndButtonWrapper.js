import React, { useContext } from "react";

import {BlogPostContext} from './BlogPost';
import {BlogpostCommentsContainerContext} from './BlogpostCommentsContainer';

const BlogpostCommentDateAndButtonWrapper = (props) => {
    const BlogPostCtx = useContext(BlogPostContext);
    const BlogpostCommentsContainerCtx = useContext(BlogpostCommentsContainerContext);
    const comment = props.comment;

    const showSendAnswerForm = (id) => {
        const currentComments = BlogPostCtx.currentPostComments.map(el => {
            if (el.id === id) {
                return {...el, isCommentAnswerOn: true}
            } else {
                return {...el, isCommentAnswerOn: false}
            }
            return {...el};
        })
      
        BlogpostCommentsContainerCtx.setmainCommentsFormVisibility(false);
        BlogPostCtx.setCurrentPostComments(currentComments);
        BlogpostCommentsContainerCtx.resetForm();
      }

    return(
        <div className="blogpost-comment-date-and-button-wrapper">
        <div className="blogpost-comment-date">
            <p>{comment.commentTime}</p>
        </div>
        <div className="blogpost-comment-button">
            <p className="add-comment-form-button" onClick={(e) => showSendAnswerForm(comment.id)}>Odpowiedz</p>
        </div>
    </div>
    )
};

export default BlogpostCommentDateAndButtonWrapper;