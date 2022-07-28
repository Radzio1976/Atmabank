import CommentatorAvatar from '../../images/commentatorAvatar.png';

import useCommentTimeInPolishHook from '../../hooks/useCommentTimeInPolishHook';

const BlogpostCommentsAnswerWrapper = (props) => {
    const {getCommentTimeInPolish} = useCommentTimeInPolishHook();
    const answer = props.answer;
    const index = props.index;
    console.log(answer._id);
    const parentCommentIndex = props.parentCommentIndex;
    const currentPostSlug = props.currentPostSlug;
    
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
                <p className="add-comment-form-button comment-button" onClick={() => removeCommentsAnswer(answer._id)}>Usuń</p>
            </div>
        </div>
    </div>
    )
};

export default BlogpostCommentsAnswerWrapper;