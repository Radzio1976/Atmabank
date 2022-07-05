import AppState from "../../hooks/AppState";
import useAddCommentFormChangeHook from "../../hooks/GetAddCommentFormChangeHook";

const AddCommentForm = (props) => {
    const sendComment = props.sendComment;
    const {name, email, text} = AppState();
    const {nameChange, emailChange, textChange} = useAddCommentFormChangeHook();

    return(
        <div className="add-comment-form">
        <form>
            <input type="text" name="name" value={name} onChange={(e) => nameChange(e.target.value)} placeholder="Imię"/>
            <input type="text" name="email" value={email} onChange={(e) => emailChange(e.target.value)} placeholder="Email" />
            <textarea name="text" value={text} onChange={(e) => textChange(e.target.value)} placeholder="Twój komentarz" />
        </form>
        <p className="add-comment-form-button" onClick={sendComment}>Wyślij</p>
    </div>
    )
};

export default AddCommentForm;