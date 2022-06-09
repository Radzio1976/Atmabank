import { useContext } from "react";

import AddCommentForm from './AddCommentForm';

import {BlogPostContext} from './BlogPost';

const BlogpostAddCommentsAnswerFormContainer = (props) => {
    const BlogPostCtx = useContext(BlogPostContext);
    const comment = props.comment;
    return(
        <>
        {comment.isCommentAnswerOn === true ? <div className="blogpost-add-comments-answer-form-container">
        <div className="blogpost-add-comments-answer-form">
            <h1>Zostaw komentarz</h1>
        </div>
        <AddCommentForm BlogPostCtx={BlogPostCtx} sendComment={() => BlogPostCtx.sendCommentsAnswer(comment.id)} />
    </div> : ""}
    </>
    )
};

export default BlogpostAddCommentsAnswerFormContainer;