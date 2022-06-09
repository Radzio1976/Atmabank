import { useContext } from "react";

import AddCommentForm from './AddCommentForm';

import {BlogPostContext} from './BlogPost';

const BlogpostAddCommentFormContainer= () => {
    const BlogPostCtx = useContext(BlogPostContext);
    
    return(
        <div className="blogpost-add-comment-form-container">
            <div className="blogpost-add-comment-form-title">
                <h1>Skomentuj artykuł</h1>
                {BlogPostCtx.mainCommentsFormVisibility === false ? <p className="add-comment-form-button" onClick={BlogPostCtx.showCommentButton}>Skomentuj</p> : ""}
            </div>
            {BlogPostCtx.mainCommentsFormVisibility === true ? 
            <AddCommentForm BlogPostCtx={BlogPostCtx} sendComment={BlogPostCtx.sendComment} />
            : ""}
        </div>
    )
};

export default BlogpostAddCommentFormContainer;