import { useState } from "react";

import ArrowUpImage from "../../images/back-to-top-arrow.png";
import ArrowUpImageHover from "../../images/back-to-top-arrow-hover.png";

import AppState from "../../hooks/AppState";
import useBackToTopButtonHook from "../../hooks/useBackToTopButtonHook";
import useScreenWidth from "../../hooks/useScreenWidthHook";

const BackToTopButton = () => {
    const [backToTopButtonHover, setBackToTopButtonHover] = useState(false);
    const {backToTopButton, screenWidth} = AppState();
    const {ShowBackToTopButton, scrollToTop} = useBackToTopButtonHook();
    const {GetScreenWidth} = useScreenWidth();

    ShowBackToTopButton();
    GetScreenWidth();

    return(
        <div 
        className="back-to-top-button"
        onMouseEnter={() => setBackToTopButtonHover(true)}
        onMouseLeave={() => setBackToTopButtonHover(false)}
        onClick={scrollToTop} 
        style={{ 
            display: backToTopButton === true ? "block" : "none", 
            position: "fixed", 
            height:  "60px", 
            width: "60px", 
            backgroundSize: "100% 100%", 
            cursor: "pointer", 
            right: screenWidth < 549 ? "30px" : "60px", 
            bottom: screenWidth < 549 ? "30px" : "60px", 
            backgroundImage: backToTopButtonHover === false ? `url(${ArrowUpImage})` : `url(${ArrowUpImageHover})`
        }}
        ></div>
    )
};

export default BackToTopButton;