import { useEffect, useState } from "react";

import AppState from "./AppState";

const useBackToTopButtonHook = () => {
    const {setBackToTopButton} = AppState();

    const ShowBackToTopButton = () => {
        useEffect(() => {
        const pageTotalHeight = document.body.scrollHeight;

        window.addEventListener("scroll", () => {
            console.log(window.scrollY)
            if (window.scrollY > pageTotalHeight * 0.3) {
                setBackToTopButton(true);
            } else {
                setBackToTopButton(false);
            }
        })
    }, []);
    };

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return {ShowBackToTopButton, scrollToTop};
};

export default useBackToTopButtonHook;