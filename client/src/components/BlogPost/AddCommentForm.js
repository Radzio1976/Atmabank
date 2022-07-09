import AppState from "../../hooks/AppState";
import useFormChangeHook from "../../hooks/useFormChangeHook";

const AddCommentForm = (props) => {
    const sendComment = props.sendComment;
    const {name, setName, nameError, email, emailError, setEmail, text, textError, setText} = AppState();
    const {nameChange, emailChange, textChange} = useFormChangeHook();

    return(
        <div className="add-comment-form">
        <form>
            <input 
            style={{color: name === nameError ? "red" : ""}}
            type="text" 
            name="name" 
            value={name} 
            onChange={(e) => nameChange(e.target.value)} 
            onFocus={() => name === nameError ? setName("") : ""} 
            placeholder="Imię"
            />
            <input 
            style={{color: email === emailError ? "red" : ""}}
            type="text" 
            name="email" 
            value={email} 
            onChange={(e) => emailChange(e.target.value)} 
            onFocus={() => email === emailError ? setEmail("") : ""} 
            placeholder="Email"
             />
            <textarea 
            style={{color: text === textError ? "red" : ""}}
            name="text" 
            value={text} 
            onChange={(e) => textChange(e.target.value)} 
            onFocus={() => text === textError ? setText("") : ""} 
            placeholder="Twój komentarz" 
            />
        </form>
        <p className="add-comment-form-button" onClick={sendComment}>Wyślij</p>
    </div>
    )
};

export default AddCommentForm;