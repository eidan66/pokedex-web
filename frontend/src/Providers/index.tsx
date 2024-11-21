import {FunctionComponent, PropsWithChildren} from "react";
import {AuthProvider} from "../context/AuthContext";

export const Providers: FunctionComponent<PropsWithChildren> = ({children}) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}