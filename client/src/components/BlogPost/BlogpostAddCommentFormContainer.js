import AddCommentForm from './AddCommentForm';

import AppState from "../../hooks/AppState";
import useShowCommentButtonHook from "../../hooks/useShowCommentButtonHook";
import useSendCommentHook from "../../hooks/useSendCommentHook";

const BlogpostAddCommentFormContainer= () => {
    const {mainCommentsFormVisibility} = AppState();
    const {showCommentButton} = useShowCommentButtonHook();
    const {sendComment} = useSendCommentHook();

    return(
        <div className="blogpost-add-comment-form-container">
            <div className="blogpost-add-comment-form-title">
                <h5>Skomentuj artykuł</h5>
                {mainCommentsFormVisibility === false ? <p className="add-comment-form-button" onClick={showCommentButton}>Skomentuj</p> : ""}
            </div>
            {mainCommentsFormVisibility === true ? 
            <AddCommentForm sendComment={sendComment} />
            : ""}
        </div>
    )
};

export default BlogpostAddCommentFormContainer;