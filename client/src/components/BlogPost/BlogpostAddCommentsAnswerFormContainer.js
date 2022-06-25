import { useContext } from "react";

import AddCommentForm from './AddCommentForm';

import { AppContext } from "../../App";

const BlogpostAddCommentsAnswerFormContainer = (props) => {
    const AppCtx = useContext(AppContext);
    const comment = props.comment;

    return(
        <>
        {comment.isCommentAnswerOn === true ? <div className="blogpost-add-comments-answer-form-container">
        <div className="blogpost-add-comments-answer-form">
            <h4>Odpowiedz użytkownikowi {comment.name}</h4>
        </div>
            <AddCommentForm sendComment={() => AppCtx.sendCommentsAnswer(comment._id)} />
        </div> : ""}
    </>
    )
};

export default BlogpostAddCommentsAnswerFormContainer;
