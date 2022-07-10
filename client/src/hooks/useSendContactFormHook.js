import Axios from "axios";

import AppState from "./AppState";

const useSendContactFormHook = () => {
    const {name, email, subject, text} = AppState();

    const sendContactForm = () => {
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
    };

    return {sendContactForm};
};

export default useSendContactFormHook;