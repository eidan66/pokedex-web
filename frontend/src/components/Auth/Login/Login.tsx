import React, {FunctionComponent, useState} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";

import "./Login.css";
import {BackButton} from "../../BackButton";
import {useAuth} from "../../../context/AuthContext";

type LoginFormInputs = {
    email: string;
    password: string;
};

export const Login: FunctionComponent = () => {
    const {login} = useAuth();
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormInputs>();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        try {
            setErrorMessage("")
            await login(data)
            navigate("/pokemons");
        } catch (error) {
            setErrorMessage((error as Error).message || "An error occurred. Please try again.");

        }
    };

    return (
        <div className="login-page">
            <div className='login-container'>
                <BackButton label='Homepage' navigateTo='/' className="login-back-button"/>
                <h1>Login</h1>
                <form className="login-form" onSubmit={handleSubmit(onSubmit)} noValidate method="POST">
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Please enter a valid email address",
                                }
                            })}
                            className={errors.email ? "input-error" : ""}
                            aria-invalid={errors.email ? "true" : "false"}
                        />
                        {errors.email && <p className="error-message">{errors.email.message}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-wrapper">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                id="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {value: 6, message: "Password must be at least 6 characters"},
                                })}
                                className={errors.password ? "input-error" : ""}
                            />
                            <i
                                className={`fas ${passwordVisible ? "fa-eye-slash" : "fa-eye"}`}
                                onClick={() => setPasswordVisible((prev) => !prev)}
                            />
                        </div>
                        {errors.password && <p className="error-message">{errors.password.message}</p>}
                    </div>
                    <button type="submit" className="btn-submit">Login</button>
                </form>
                <p className="redirect-link">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </div>
        </div>
    );
};