import Axios from "axios";

import AppState from "./AppState";
import useFormChangeHook from "./useFormChangeHook";

const useSendContactFormHook = () => {
    const {name, nameError, email, emailError, subject, subjectError, text, textError} = AppState();
    const {nameErrorChange, emailErrorChange, subjectErrorChange, textErrorChange} = useFormChangeHook();

    const sendContactForm = () => {
        let isValid = true;
    
        if (name.length < 5 || name === nameError) {
          isValid = false;
          nameErrorChange();
        }
        if (email.length < 5 || email.includes("@") === false || email === emailError) {
          isValid = false;
          emailErrorChange();
        }
        if (subject.length < 5 || subject === subjectError) {
            isValid = false;
            subjectErrorChange();
        }
        if (text.length < 20 || text === textError) {
          isValid = false;
          textErrorChange();
        }
        if (isValid) {
            let message = {
                name,
                email,
                subject,
                text
            };
            Axios.post("/sendContactForm", message)
            .then(res => {
                console.log(res.data.info);
            })
            .catch(err => {
                console.log("Nie udało się wysłać wiadomości", err)
            })
        }
    };

    return {sendContactForm};
};

export default useSendContactFormHook;