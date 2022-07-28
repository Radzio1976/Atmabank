import Axios from "axios";

import AppState from "./AppState";
import useResetFormHook from "./useResetFormHook";

const useSendLoginDataHook = () => {
    const {login, password, setIsAuthFirstStep, setIsAuthSecondStep, ascii, setAscii, googleToken, setIsLoggedIn} = AppState();
    const {resetForm} = useResetFormHook();

    const sendLoginData = () => {
        let loginData = {
            login,
            password
        };

        Axios.post("/sendLoginData", loginData)
        .then(res => {
            console.log(res.data.info);
            setIsAuthFirstStep(res.data.isAuthFirstStep);
            setAscii(res.data.ascii);
        })
        .catch(err => {
            console.log("Nie udało się wysłać danych użytkownika", err)
        })
    }

    const sendGoogleToken = () => {
        let tokenData = {
            ascii,
            googleToken
        }

        Axios.post("/sendGoogleToken", tokenData)
        .then(res => {
            console.log(res.data.info);
            setIsAuthSecondStep(res.data.isAuthSecondStep);
            setIsLoggedIn(res.data.isAuthSecondStep);
            if (res.data.isAuthSecondStep) {
                let count = 0;

                let interval = setInterval(() => {
                    count++;

                    if (count === 300) {
                        setIsAuthFirstStep(false);
                        setIsAuthSecondStep(false);
                        setIsLoggedIn(false);
                        resetForm();
                        clearInterval(interval);
                    }
                }, 1000)
            }
        })
        .catch(err => {
            console.log("Nie udało się wysłać danych googleToken", err)
        })
    }

    return {sendLoginData, sendGoogleToken};
};

export default useSendLoginDataHook;