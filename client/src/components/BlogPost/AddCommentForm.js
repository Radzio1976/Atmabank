import AppState from "../../hooks/AppState";
import useFormChangeHook from "../../hooks/useFormChangeHook";

const AddCommentForm = (props) => {
    const sendComment = props.sendComment;
    const nameError = "Pole imię musi zawierać conajmniej 5 znaków";
    const emailError = "Pole email musi zawierać conajmniej 5 znaków oraz @";
    const textError = "Pole text musi zawierać conajmniej 20 znaków";
    const {name, setName, email, setEmail, text, setText} = AppState();
    const {nameChange, emailChange, textChange} = useFormChangeHook();

    return(
        <div className="add-comment-form">
        <form>
            <input 
            style={{color: nameError !== "" ? "red" : ""}}
            type="text" 
            name="name" 
            value={name} 
            onChange={(e) => nameChange(e.target.value)} 
            onFocus={() => setName("")} 
            placeholder="Imię"
            />
            <input 
            style={{color: emailError !== "" ? "red" : ""}}
            type="text" 
            name="email" 
            value={email} 
            onChange={(e) => emailChange(e.target.value)} 
            onFocus={() => setEmail("")} 
            placeholder="Email"
             />
            <textarea 
            style={{color: textError !== "" ? "red" : ""}}
            name="text" 
            value={text} 
            onChange={(e) => textChange(e.target.value)} 
            onFocus={() => setText("")} 
            placeholder="Twój komentarz" 
            />
        </form>
        <p className="add-comment-form-button" onClick={sendComment}>Wyślij</p>
    </div>
    )
};

export default AddCommentForm;