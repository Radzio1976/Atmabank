import { useContext } from "react";

import {BlogpostCommentsContainerContext} from './BlogpostCommentsContainer';

const AddCommentForm = (props) => {
    const sendComment = props.sendComment;
    const BlogpostCommentsContainerCtx = useContext(BlogpostCommentsContainerContext);

    return(
        <div className="add-comment-form">
        <form>
            <input type="text" name="name" value={BlogpostCommentsContainerCtx.name} onChange={(e) => BlogpostCommentsContainerCtx.nameChange(e.target.value)} placeholder="Imię"/>
            <input type="text" name="email" value={BlogpostCommentsContainerCtx.email} onChange={(e) => BlogpostCommentsContainerCtx.emailChange(e.target.value)} placeholder="Email" />
            <textarea name="text" value={BlogpostCommentsContainerCtx.text} onChange={(e) => BlogpostCommentsContainerCtx.textChange(e.target.value)} placeholder="Twój komentarz" />
        </form>
        <p className="add-comment-form-button" onClick={sendComment}>Wyślij</p>
    </div>
    )
};

export default AddCommentForm;