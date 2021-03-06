import Axios from "axios";

import AppState from "./AppState";
import useFormValidationHook from "./useFormValidationHook";

const useSendContactFormHook = () => {
    const {name, email, subject, text, setSendMessageSuccess} = AppState();
    const {getFormValidation} = useFormValidationHook();

    const sendContactForm = () => {
        if (getFormValidation({name, email, subject, text}) === true) {
            let message = {
                name,
                email,
                subject,
                text
            };
            Axios.post("/sendContactForm", message)
            .then(res => {
                console.log(res.data.sendMessageSuccess);
                setSendMessageSuccess(res.data.sendMessageSuccess);
            })
            .catch(err => {
                console.log("Nie udało się wysłać wiadomości", err)
            })
        }
    };

    return {sendContactForm};
};

export default useSendContactFormHook;