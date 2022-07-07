import useShowSendAnswerFormHook from "../../hooks/useShowSendAnswerFormHook";
import useCommentTimeInPolishHook from "../../hooks/useCommentTimeInPolishHook";

const BlogpostCommentDateAndButtonWrapper = (props) => {
    const {showSendAnswerForm} = useShowSendAnswerFormHook();
    const {getCommentTimeInPolish} = useCommentTimeInPolishHook();
    const comment = props.comment;

    return(
        <div className="blogpost-comment-date-and-button-wrapper">
        <div className="blogpost-comment-date">
            <p>{getCommentTimeInPolish(new Date(comment.commentTime))}</p>
        </div>
        <div className="blogpost-comment-button">
            <p className="add-comment-form-button" onClick={(e) => showSendAnswerForm(comment._id)}>Odpowiedz</p>
        </div>
    </div>
    )
};

export default BlogpostCommentDateAndButtonWrapper;