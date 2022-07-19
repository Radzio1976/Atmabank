import AppState from "../../hooks/AppState";
import useFormChangeHook from "../../hooks/useFormChangeHook";
import useSendContactFormHook from "../../hooks/useSendContactFormHook";

import './Contact.css';

const Contact = () => {
    const {name, setName, nameError, email, setEmail, emailError, subject, setSubject, subjectError, text, setText, textError} = AppState();
    const {nameChange, emailChange, subjectChange, textChange} = useFormChangeHook();
    const {sendContactForm} = useSendContactFormHook();
    return(
        <div id="Contact">
            <div className="contact-container">
                <div className="contact-title">
                    <h5>Skontaktuj się ze mną</h5>
                </div>
                <form>
                    <input 
                    style={{color: name === nameError ? "red" : ""}}
                    type="text" 
                    id="name" 
                    name="name" 
                    value={name}
                    onChange={(e) => nameChange(e.target.value)} 
                    onFocus={() => name === nameError ? setName("") : ""} 
                    placeholder="Imię" 
                    />
                    <input 
                    style={{color: email === emailError ? "red" : ""}}
                    type="text" 
                    id="email" 
                    name="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => emailChange(e.target.value)} 
                    onFocus={() => email === emailError ? setEmail("") : ""} 
                    />
                    <input 
                    style={{color: subject === subjectError ? "red" : ""}}
                    type="text" 
                    id="subject" 
                    name="subject" 
                    value={subject} 
                    onChange={(e) => subjectChange(e.target.value)} 
                    onFocus={() => subject === subjectError ? setSubject("") : ""} 
                    placeholder="Temat" 
                    />
                    <textarea 
                    style={{color: text === textError ? "red" : ""}}
                    id="message" 
                    name="message" 
                    placeholder="Napisz coś..."
                    value={text} 
                    onChange={(e) => textChange(e.target.value)} 
                    onFocus={() => text === textError ? setText("") : ""} 
                    />
                    <p onClick={sendContactForm}>Wyślij</p>
                </form>
            </div>
        </div>
    )
};

export default Contact;