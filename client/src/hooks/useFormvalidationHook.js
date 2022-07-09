import AppState from "./AppState";

const useFormValidationHook = () => {
    const {name, setName, email, setEmail, text, setText} = AppState();

    const getFormValidation = () => {
        let isValid = true;
    
        if (name.length < 5 || name === "Pole imię musi zawierać conajmniej 5 znaków") {
          isValid = false;
          setName("Pole imię musi zawierać conajmniej 5 znaków");
        };
        if (email.length < 5 || email.includes("@") === false || email === "Pole email musi zawierać conajmniej 5 znaków oraz @") {
          isValid = false;
          setEmail("Pole email musi zawierać conajmniej 5 znaków oraz @")
        };
        if (text.length < 20 || text === "Pole text musi zawierać conajmniej 20 znaków") {
          isValid = false;
          setText("Pole text musi zawierać conajmniej 20 znaków")
        };
        if (isValid) {
            return true;
        };
    };

    return {getFormValidation};
};

export default useFormValidationHook;