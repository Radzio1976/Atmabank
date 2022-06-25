import { useContext } from 'react';
import CommentatorAvatar from '../../images/commentatorAvatar.png';

import { AppContext } from '../../App';

const BlogpostCommentsAnswerWrapper = (props) => {
    const AppCtx = useContext(AppContext);
    const answer = props.answer;
    const index = props.index;
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
                <p>{AppCtx.getCommentTimeInPolish(new Date(answer.commentTime))}</p>
            </div>
        </div>
    </div>
    )
};

export default BlogpostCommentsAnswerWrapper;