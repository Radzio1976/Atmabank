import { useContext } from "react";
import AddCommentForm from './AddCommentForm';

import { AppContext } from "../../App";

const BlogpostAddCommentFormContainer= () => {
    const AppCtx = useContext(AppContext);

    return(
        <div className="blogpost-add-comment-form-container">
            <div className="blogpost-add-comment-form-title">
                <h1>Skomentuj artykuł</h1>
                {AppCtx.mainCommentsFormVisibility === false ? <p className="add-comment-form-button" onClick={AppCtx.showCommentButton}>Skomentuj</p> : ""}
            </div>
            {AppCtx.mainCommentsFormVisibility === true ? 
            <AddCommentForm sendComment={AppCtx.sendComment} />
            : ""}
        </div>
    )
};

export default BlogpostAddCommentFormContainer;