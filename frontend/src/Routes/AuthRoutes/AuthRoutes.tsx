import {Signup, Login} from "../../components/Auth";

export const AuthRoutes = [{
    path: "/login",
    element: <Login/>,
}, {
    path: "/signup",
    element: <Signup/>,
}]