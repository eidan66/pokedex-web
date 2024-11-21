import React, {FunctionComponent} from "react";
import {useNavigate} from "react-router-dom";

import "./BackButton.css";

type BackButtonProps = {
    label?: string;
    className?: string;
    navigateTo?: string | number; // Can accept a string route or a number
};

export const BackButton: FunctionComponent<BackButtonProps> = ({
                                                                   label = "Go Back",
                                                                   className = "",
                                                                   navigateTo = -1
                                                               }) => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        if (typeof navigateTo === "string") {
            navigate(navigateTo); // Navigate to a specific route
        } else {
            navigate(navigateTo); // Navigate to a specific history step
        }
    };

    return (
        <button onClick={handleBackClick} className={`back-button ${className}`}>
            {label || "Back"}
        </button>
    );
};