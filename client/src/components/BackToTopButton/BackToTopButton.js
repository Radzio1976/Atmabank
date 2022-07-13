import { useState } from "react";

import ArrowUpImage from "../../images/back-to-top-arrow.png";
import ArrowUpImageHover from "../../images/back-to-top-arrow-hover.png";

import AppState from "../../hooks/AppState";
import useBackToTopButtonHook from "../../hooks/useBackToTopButtonHook";

const BackToTopButton = () => {
    const [backToTopButtonHover, setBackToTopButtonHover] = useState(false);
    const {backToTopButton} = AppState();
    const {ShowBackToTopButton, scrollToTop} = useBackToTopButtonHook();

    ShowBackToTopButton();

    return(
        <div 
        onMouseEnter={() => setBackToTopButtonHover(true)}
        onMouseLeave={() => setBackToTopButtonHover(false)}
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
            backgroundImage: backToTopButtonHover === false ? `url(${ArrowUpImage})` : `url(${ArrowUpImageHover})`
        }}
        ></div>
    )
};

export default BackToTopButton;