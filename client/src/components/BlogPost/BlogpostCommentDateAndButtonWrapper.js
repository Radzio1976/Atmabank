import React, { useContext } from "react";

import { AppContext } from "../../App";

const BlogpostCommentDateAndButtonWrapper = (props) => {
    const AppCtx = useContext(AppContext);
    const comment = props.comment;

    return(
        <div className="blogpost-comment-date-and-button-wrapper">
        <div className="blogpost-comment-date">
            <p>{AppCtx.getCommentTimeInPolish(new Date(comment.commentTime))}</p>
        </div>
        <div className="blogpost-comment-button">
            <p className="add-comment-form-button" onClick={(e) => AppCtx.showSendAnswerForm(comment._id)}>Odpowiedz</p>
        </div>
    </div>
    )
};

export default BlogpostCommentDateAndButtonWrapper;