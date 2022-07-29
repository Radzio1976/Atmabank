import "./Login.css";

import AppState from "../../hooks/AppState";
import useFormChangeHook from "../../hooks/useFormChangeHook";
import useSendLoginDataHook from "../../hooks/useSendLoginDataHook";

const Login = () => {
    const {login, password, ascii, googleToken, isAuthFirstStep, isAuthSecondStep} = AppState();
    const {loginChange, passwordChange, googleTokenChange} = useFormChangeHook();
    const {sendLoginData, sendGoogleToken} = useSendLoginDataHook();

    return(
        <div id="Login">
            <div className="login-container">
                {!isAuthFirstStep ? <form className="name-and-password-form">
                    <h5>Logowanie</h5>
                    <input type="text" name="login" value={login} onChange={(e) => loginChange(e.target.value)} placeholder="Login" />
                    <input type="password" name="password" value={password} onChange={(e) => passwordChange(e.target.value)} placeholder="Hasło" />
                    <p onClick={sendLoginData}>Wyślij</p>
                </form> : null}
                    {isAuthFirstStep && !isAuthSecondStep ? <form className="google-token-form">
                        <h5>Google Authentificator</h5>
                    <input type="text" name="googleToken" value={googleToken} onChange={(e) => googleTokenChange(e.target.value)} />
                    <p onClick={sendGoogleToken}>Wyślij</p>
                </form> : null} 
                {isAuthFirstStep && isAuthSecondStep ? <h5>Zalogowano pomyślnie</h5> : null}            
            </div>
        </div>
    )
};

export default Login;