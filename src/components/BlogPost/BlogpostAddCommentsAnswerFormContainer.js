import { useContext } from "react";

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
        <div className="blogpost-add-comments-answer-form-wrapper comment-form">
            <form>
            <input type="text" name="name" value={BlogPostCtx.name} onChange={(e) => BlogPostCtx.nameChange(e.target.value)} placeholder="Imię"/>
                <input type="text" name="email" value={BlogPostCtx.email} onChange={(e) => BlogPostCtx.emailChange(e.target.value)} placeholder="Email" />
                <textarea name="text" value={BlogPostCtx.text} onChange={(e) => BlogPostCtx.textChange(e.target.value)} placeholder="Twój komentarz" />
            </form>
            <button onClick={() => BlogPostCtx.sendCommentsAnswer(comment.id)}>Wyślij</button>
        </div>
    </div> : ""}
    </>
    )
};

export default BlogpostAddCommentsAnswerFormContainer;