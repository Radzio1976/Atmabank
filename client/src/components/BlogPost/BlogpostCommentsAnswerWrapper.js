import CommentatorAvatar from '../../images/commentatorAvatar.png';

import AppState from "../../hooks/AppState";
import useCommentTimeInPolishHook from '../../hooks/useCommentTimeInPolishHook';
import useRemoveCommentsAnswerHook from '../../hooks/useRemoveCommentsAnswerHook';

const BlogpostCommentsAnswerWrapper = (props) => {
    const {isLoggedIn} = AppState();
    const {getCommentTimeInPolish} = useCommentTimeInPolishHook();
    const {removeCommentsAnswer} = useRemoveCommentsAnswerHook();
    const comment = props.comment;
    const answer = props.answer;
    const index = props.index;
    const parentCommentIndex = props.parentCommentIndex;
    const currentPostSlug = props.currentPostSlug;
    console.log(comment._id);
    
    return(
        <div id={`${currentPostSlug}-${index + 1}-answer-of-${parentCommentIndex + 1}-comment`} className="blogpost-comments-answer-wrapper" key={index}>
        <div className="blogpost-comment-name-and-text-wrapper">
            <div className="blogpost-comment-name">
                <img src={CommentatorAvatar}></img>
                <p>{answer.name}</p>
            </div>
            <div className="blogpost-comment-text">
                <p>{answer.text}</p>
            </div>
        </div>

        <div className="blogpost-comment-date-wrapper">
            <div className="blogpost-comment-date">
                <p>{getCommentTimeInPolish(new Date(answer.commentTime))}</p>
                {isLoggedIn ? <p className="add-comment-form-button comment-button" onClick={() => removeCommentsAnswer(comment._id, answer._id)}>Usuń</p> : null}
            </div>
        </div>
    </div>
    )
};

export default BlogpostCommentsAnswerWrapper;