import React, {useState, FunctionComponent} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {BackButton} from "../../BackButton";

import "./Signup.css";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../../context/AuthContext";

type RegistrationFormInputs = {
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
};

export const Signup: FunctionComponent = () => {
    const {signup} = useAuth();
    const navigate = useNavigate();
    const {register, handleSubmit, watch, formState: {errors}} = useForm<RegistrationFormInputs>();

    const password = watch("password");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const onSubmit: SubmitHandler<RegistrationFormInputs> = async (data) => {
        console.log("Registration data:", data);
        try {
            await signup(data)
            navigate("/pokemons");
        } catch (error) {
            console.log(error)
            return;
        }
    };

    return (
        <div className="registration-page">
            <BackButton label="Homepage" navigateTo="/" className="custom-back-button"/>
            <div className="registration-container">
                <h1>Register</h1>
                <form className="registration-form" onSubmit={handleSubmit(onSubmit)} noValidate method="POST">
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
                                },
                            })}
                            className={errors.email ? "input-error" : ""}
                            aria-invalid={errors.email ? "true" : "false"}
                        />
                        {errors.email && <p className="error-message">{errors.email.message}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            {...register("fullName", {required: "Full Name is required"})}
                            className={errors.fullName ? "input-error" : ""}
                        />
                        {errors.fullName && <p className="error-message">{errors.fullName.message}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-wrapper">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                id="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
                                        message: "Password must meet the specified rules",
                                    },
                                })}
                                className={errors.password ? "input-error" : ""}
                                aria-invalid={errors.password ? "true" : "false"}
                            />
                            <i
                                className={`fas ${passwordVisible ? "fa-eye-slash" : "fa-eye"}`}
                                onClick={() => setPasswordVisible((prev) => !prev)}
                            />
                        </div>
                        {errors.password && <p className="error-message">{errors.password.message}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div className="password-wrapper">
                            <input
                                type={confirmPasswordVisible ? "text" : "password"}
                                id="confirmPassword"
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (value) =>
                                        value === password || "Passwords do not match",
                                })}
                                className={errors.confirmPassword ? "input-error" : ""}
                                aria-invalid={errors.confirmPassword ? "true" : "false"}
                            />
                            <i
                                className={`fas ${confirmPasswordVisible ? "fa-eye-slash" : "fa-eye"}`}
                                onClick={() => setConfirmPasswordVisible((prev) => !prev)}
                            />
                        </div>
                        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
                    </div>

                    <button type="submit" className="btn-submit">Register</button>
                </form>
                <p className="redirect-link">
                    Already signed up? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};