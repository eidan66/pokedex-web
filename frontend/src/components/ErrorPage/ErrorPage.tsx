import {useRouteError} from "react-router-dom";

import './ErrorPage.css'

interface RouteError {
    statusText?: string,
    message?: string
}

export const ErrorPage = () => {
    const error = useRouteError() as RouteError;
    error && console.error(error);

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error?.statusText || error?.message}</i>
            </p>
        </div>
    );
}
