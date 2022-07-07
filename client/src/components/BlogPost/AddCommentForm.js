import AppState from "../../hooks/AppState";
import useFormChangeHook from "../../hooks/useFormChangeHook";

const AddCommentForm = (props) => {
    const sendComment = props.sendComment;
    const {name, nameError, setNameError, email, emailError, setEmailError, text, textError, setTextError} = AppState();
    const {nameChange, emailChange, textChange} = useFormChangeHook();

    return(
        <div className="add-comment-form">
        <form>
            <input 
            style={{color: nameError !== "" ? "red" : ""}}
            type="text" 
            name="name" 
            value={nameError === "" ? name : nameError} 
            onChange={(e) => nameChange(e.target.value)} 
            onFocus={() => setNameError("")} 
            placeholder="Imię"
            />
            <input 
            style={{color: emailError !== "" ? "red" : ""}}
            type="text" 
            name="email" 
            value={emailError === "" ? email : emailError} 
            onChange={(e) => emailChange(e.target.value)} 
            onFocus={() => setEmailError("")} 
            placeholder="Email"
             />
            <textarea 
            style={{color: textError !== "" ? "red" : ""}}
            name="text" 
            value={textError === "" ? text : textError} 
            onChange={(e) => textChange(e.target.value)} 
            onFocus={() => setTextError("")} 
            placeholder="Twój komentarz" 
            />
        </form>
        <p className="add-comment-form-button" onClick={sendComment}>Wyślij</p>
    </div>
    )
};

export default AddCommentForm;