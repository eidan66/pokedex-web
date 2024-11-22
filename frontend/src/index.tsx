import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider,} from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

import './index.css';
import reportWebVitals from './reportWebVitals';
import {router} from "./Routes/routes";
import {Providers} from "./Providers";
import {ErrorBoundary} from "./components/ErrorBoundary/ErrorBoundary";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <ErrorBoundary>
            <Providers>
                <RouterProvider router={router}/>
            </Providers>
        </ErrorBoundary>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
