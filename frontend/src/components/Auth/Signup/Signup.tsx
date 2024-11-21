import React, {FunctionComponent} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {BackButton} from "../../BackButton";

import "./Signup.css";
import {Link} from "react-router-dom";

type RegistrationFormInputs = {
    email: string;
    password: string;
    confirmPassword: string;
};

export const Signup: FunctionComponent = () => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm<RegistrationFormInputs>();

    const password = watch("password");

    const onSubmit: SubmitHandler<RegistrationFormInputs> = (data) => {
        console.log("Registration data:", data);
        // Perform registration action (e.g., API call)
    };

    return (
        <div className="registration-page">
            <BackButton label='Homepage' navigateTo='/' className="custom-back-button"/>
            <div className="registration-container">
                <h1>Register</h1>
                <form className="registration-form" onSubmit={handleSubmit(onSubmit)} noValidate method="POST">
                    {/* Email Field */}
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

                    {/* Password Field */}
                    <div className="form-group">
                        <label htmlFor="password">
                            Password
                            <span className="tooltip-icon"
                                  data-tooltip="Password must:&#10;- Be at least 6 characters long.&#10;- Include one uppercase letter.&#10;- Include one lowercase letter.&#10;- Include one number.">
                <i className="fas fa-info-circle"></i>
              </span>
                        </label>
                        <input
                            type="password"
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
                        {errors.password && <p className="error-message">{errors.password.message}</p>}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (value) =>
                                    value === password || "Passwords do not match",
                            })}
                            className={errors.confirmPassword ? "input-error" : ""}
                            aria-invalid={errors.confirmPassword ? "true" : "false"}
                        />
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