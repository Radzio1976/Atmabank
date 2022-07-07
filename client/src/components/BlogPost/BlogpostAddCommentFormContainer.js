import { useContext } from "react";
import AddCommentForm from './AddCommentForm';

import { AppContext } from "../../App";
import AppState from "../../hooks/AppState";
import useShowCommentButtonHook from "../../hooks/useShowCommentButtonHook";

const BlogpostAddCommentFormContainer= () => {
    const AppCtx = useContext(AppContext);
    const {mainCommentsFormVisibility} = AppState();
    const {showCommentButton} = useShowCommentButtonHook();

    return(
        <div className="blogpost-add-comment-form-container">
            <div className="blogpost-add-comment-form-title">
                <h1>Skomentuj artykuł</h1>
                {mainCommentsFormVisibility === false ? <p className="add-comment-form-button" onClick={showCommentButton}>Skomentuj</p> : ""}
            </div>
            {mainCommentsFormVisibility === true ? 
            <AddCommentForm sendComment={AppCtx.sendComment} />
            : ""}
        </div>
    )
};

export default BlogpostAddCommentFormContainer;