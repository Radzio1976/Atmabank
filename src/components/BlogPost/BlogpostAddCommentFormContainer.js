import { useContext } from "react";

import AddCommentForm from './AddCommentForm';

import {BlogPostContext} from './BlogPost';

const BlogpostAddCommentFormContainer= () => {
    const BlogPostCtx = useContext(BlogPostContext);
    
    return(
        <div className="blogpost-add-comment-form-container">
            <div className="blogpost-add-comment-form-title">
                <h1>Zostaw komentarz</h1>
                {BlogPostCtx.mainCommentsFormVisibility === false ? <button onClick={BlogPostCtx.showCommentButton}>Zostaw komentarz</button> : ""}
            </div>
            {BlogPostCtx.mainCommentsFormVisibility === true ? 
            <AddCommentForm BlogPostCtx={BlogPostCtx} sendComment={BlogPostCtx.sendComment} />
            : ""}
        </div>
    )
};

export default BlogpostAddCommentFormContainer;