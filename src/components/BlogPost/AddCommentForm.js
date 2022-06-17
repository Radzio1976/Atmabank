import { useContext } from "react";

import { AppContext } from "../../App";

const AddCommentForm = (props) => {
    const sendComment = props.sendComment;
    const AppCtx = useContext(AppContext);

    return(
        <div className="add-comment-form">
        <form>
            <input type="text" name="name" value={AppCtx.name} onChange={(e) => AppCtx.nameChange(e.target.value)} placeholder="Imię"/>
            <input type="text" name="email" value={AppCtx.email} onChange={(e) => AppCtx.emailChange(e.target.value)} placeholder="Email" />
            <textarea name="text" value={AppCtx.text} onChange={(e) => AppCtx.textChange(e.target.value)} placeholder="Twój komentarz" />
        </form>
        <p className="add-comment-form-button" onClick={sendComment}>Wyślij</p>
    </div>
    )
};

export default AddCommentForm;