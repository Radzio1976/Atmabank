import ArrowUpImage from "../../images/back-to-top-arrow.png";

import AppState from "../../hooks/AppState";
import useBackToTopButtonHook from "../../hooks/useBackToTopButtonHook";

const BackToTopButton = () => {
    const {backToTopButton} = AppState();
    const {ShowBackToTopButton, scrollToTop} = useBackToTopButtonHook();

    ShowBackToTopButton();

    return(
        <div 
        onClick={scrollToTop} 
        style={{ 
            display: backToTopButton === true ? "block" : "none", 
            position: "fixed", 
            height: "60px", 
            width: "60px", 
            backgroundSize: "100% 100%", 
            cursor: "pointer", 
            right: "60px", 
            bottom: "60px", 
            backgroundImage: `url(${ArrowUpImage})`
        }}
        ></div>
    )
};

export default BackToTopButton;