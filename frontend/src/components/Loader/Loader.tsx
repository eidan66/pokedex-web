import React, {FunctionComponent} from "react";

import "./Loader.css";

export const Loader: FunctionComponent = () => {
    return (
        <div className="loader-container">
            <div className="pokeball"></div>
            <p className="loading-text">Loading...</p>
        </div>
    );
};