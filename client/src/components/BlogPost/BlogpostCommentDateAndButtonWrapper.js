import React, { useContext } from "react";

import { AppContext } from "../../App";
import useShowSendAnswerFormHook from "../../hooks/useShowSendAnswerFormHook";

const BlogpostCommentDateAndButtonWrapper = (props) => {
    const AppCtx = useContext(AppContext);
    const {showSendAnswerForm} = useShowSendAnswerFormHook();
    const comment = props.comment;

    return(
        <div className="blogpost-comment-date-and-button-wrapper">
        <div className="blogpost-comment-date">
            <p>{AppCtx.getCommentTimeInPolish(new Date(comment.commentTime))}</p>
        </div>
        <div className="blogpost-comment-button">
            <p className="add-comment-form-button" onClick={(e) => showSendAnswerForm(comment._id)}>Odpowiedz</p>
        </div>
    </div>
    )
};

export default BlogpostCommentDateAndButtonWrapper;