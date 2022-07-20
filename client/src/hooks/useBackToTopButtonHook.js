import { useEffect, useState } from "react";

import AppState from "./AppState";

const useBackToTopButtonHook = () => {
    const {setBackToTopButton} = AppState();

    const ShowBackToTopButton = () => {
        useEffect(() => {
        const pageTotalHeight = document.body.scrollHeight;

        window.addEventListener("scroll", () => {
            if (window.scrollY > pageTotalHeight * 0.3) {
                setBackToTopButton(true);
            } else {
                setBackToTopButton(false);
            }
        })
    }, []);
    };

    return {ShowBackToTopButton};
};

export default useBackToTopButtonHook;