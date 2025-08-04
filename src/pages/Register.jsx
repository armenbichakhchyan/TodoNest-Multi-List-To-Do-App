import React, { useState } from 'react';
import inputFields from "../data/signUpInputFields.js";
import {NavLink, useNavigate} from "react-router-dom";
import classnames from "classnames";
import Input from "../components/Input/Input.jsx";


const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirm__password: "",
    });
    const navigate = useNavigate();

    const [formErrors, setFormErrors] = useState({});
    const [userError, setUserError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        let hasErrors = false;
        let errors = {};

        const valUsRegex = /^.{8,}$/;

        inputFields.forEach(({ name }) => {
            if (!formData[name].trim()) {
                errors[name] = `${name} is required`;
                hasErrors = true;
            }
        });

        if (formData.password !== formData.confirm__password) {
            errors.confirm__password = "Passwords do not match";
            hasErrors = true;
        }

        if(!valUsRegex.test(formData.password)) {
            errors.password = "Password must be at least 8 characters long";
            hasErrors = true;
        }

        setFormErrors(errors);

        if (!hasErrors) {
            localStorage.setItem('user', JSON.stringify(formData));
            navigate('/sign-in');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: '' });
        setUserError('');
    };

    return (
        <div className='signin__container'>
            <form className='signin__form' onSubmit={handleSubmit}>
                <h1 className='signin__container__title'>Sign Up</h1>

                <div className='inputs__container'>
                    {inputFields.map((field) => (
                        <div className='form-group' key={field.id}>
                            <label>{field.label}</label>

                            <div className='input-field'>
                                <Input
                                    type={field.type}
                                    value={formData[field.name]}
                                    name={field.name}
                                    id={field.id}
                                    classname='input'
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className={classnames('error__div', { active__error: formErrors[field.name] })}>
                                {formErrors[field.name]}
                            </div>
                        </div>
                    ))}

                    {userError && (
                        <div className="error__div active__error">
                            {userError}
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className='signin__container-button'
                >
                    Sign Up
                </button>

                <span>You have an account?<NavLink to='/sign-in'>Sign In</NavLink></span>
            </form>
        </div>
    );
};

export default Login;
