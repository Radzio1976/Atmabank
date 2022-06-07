import React, { useContext } from "react";

import BlogpostCommentsAnswerContainer from './BlogpostCommentsAnswerContainer';
import BlogpostAddCommentsAnswerFormContainer from './BlogpostAddCommentsAnswerFormContainer';

import {BlogPostContext} from './BlogPost';

const BlogpostCommentsWrapper = () => {
    const BlogPostCtx = useContext(BlogPostContext);

    return(
        <div className="blogpost-comments-wrapper">
            {
                BlogPostCtx.currentPostComments.map(comment => {
                    return(
                        <div className="blogpost-comment-wrapper" key={comment.id}>
                            <div className="blogpost-comment-name-and-text-wrapper">
                                <div className="blogpost-comment-name">
                                    <p>{comment.name}</p>
                                </div>
                                <div className="blogpost-comment-text">
                                    <p>{comment.text}</p>
                                </div>
                            </div>

                            <div className="blogpost-comment-date-and-button-wrapper">
                                <div className="blogpost-comment-date">
                                    <p>{comment.commentTime}</p>
                                </div>
                                <div className="blogpost-comment-button">
                                    <button onClick={(e) => BlogPostCtx.showSendAnswerForm(comment.id)}>Odpowiedz</button>
                                </div>
                            </div>

                            <BlogpostAddCommentsAnswerFormContainer comment={comment} />
                            <BlogpostCommentsAnswerContainer comment={comment} />
                        </div>
                    )
                })
            }
            </div>
    )
}

export default BlogpostCommentsWrapper;