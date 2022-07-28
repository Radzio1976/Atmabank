import AppState from "../../hooks/AppState";
import useShowSendAnswerFormHook from "../../hooks/useShowSendAnswerFormHook";
import useCommentTimeInPolishHook from "../../hooks/useCommentTimeInPolishHook";
import useRemoveCommentHook from "../../hooks/useRemoveCommentHook";

const BlogpostCommentDateAndButtonWrapper = (props) => {
    const {isLoggedIn} = AppState();
    const {showSendAnswerForm} = useShowSendAnswerFormHook();
    const {getCommentTimeInPolish} = useCommentTimeInPolishHook();
    const {removeComment} = useRemoveCommentHook();
    const comment = props.comment;

    return(
        <div className="blogpost-comment-date-and-button-wrapper">
        <div className="blogpost-comment-date">
            <p>{getCommentTimeInPolish(new Date(comment.commentTime))}</p>
        </div>
        <div className="blogpost-comment-button">
            <p className="add-comment-form-button comment-button" onClick={(e) => showSendAnswerForm(comment._id)}>Odpowiedz</p>
            {isLoggedIn ? <p className="add-comment-form-button comment-button" onClick={() => removeComment(comment._id)}>Usuń</p> : null}
        </div>
    </div>
    )
};

export default BlogpostCommentDateAndButtonWrapper;