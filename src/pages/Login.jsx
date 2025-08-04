import React, { useState } from 'react';
import inputFields from "../data/signInInputFields.js";
import { NavLink, useNavigate } from "react-router-dom";
import classnames from "classnames";
import Input from "../components/Input/Input.jsx";

const Login = () => {
    const [formData, setFormdata] = useState({
        username: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState({});
    const [userError, setUserError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        let hasErrors = false;
        let errors = {};

        inputFields.forEach(({ name }) => {
            if (!formData[name].trim()) {
                errors[name] = `${name} is required`;
                hasErrors = true;
            }
        });

        setFormErrors(errors);

        if (!hasErrors) {
            const userStr = localStorage.getItem('user');
            if (userStr) {
                const user = JSON.parse(userStr);

                if (formData.username !== user.username || formData.password !== user.password) {
                    setUserError('Invalid username or password');
                } else {
                    setUserError('');
                    console.log("Login successful");
                    navigate('/user-home');
                }
            } else {
                setUserError('User not found. Please sign up.');
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormdata({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: '' });
        setUserError('');
    };

    return (
        <div className='signin__container'>
            <form
                className='signin__form'
                onSubmit={handleSubmit}
            >
                <h1 className='signin__container__title'>Sign In</h1>

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
                    Sign In
                </button>

                <span>Not a member ? <NavLink to='/sign-up'>Sign Up</NavLink></span>
            </form>
        </div>
    );
};

export default Login;
