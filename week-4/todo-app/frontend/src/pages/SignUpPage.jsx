// SignInForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { signinSchema } from '../validation/authValidation';
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

const SignUpPage = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSignUp = async () => {
        try {
            // Validate the input using the Zod schema
            signinSchema.parse(user);

            // Make sure to send the correct fields to the backend
            const response = await axios.post('http://localhost:4000/user/signup', user);

            toast.success("User created successfully!");
            navigate('/signin');
            // Handle successful sign up, maybe redirect to another page
        } catch (error) {
            // Handle Zod validation errors
            console.log(error)
            toast.error("User couldn't be created");
        }
    };

    return (
        <div className='bg-blue-400 h-screen pt-5 px-2'>
            <div className='bg-white mx-auto max-w-[1080px] rounded-lg p-4 flex flex-col items-center justify-between shadow-2xl'>
                <h2 className='font-semibold text-xl '>Sign Up!</h2>
                <label>
                    Username:
                    <input className='outline-none border border-blue-400 rounded-lg p-2 m-2' type="text" name="username" value={user.username} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Email:
                    <input className='outline-none border border-blue-400 rounded-lg p-2 m-2' type="email" name="email" value={user.email} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input className='outline-none border border-blue-400 rounded-lg p-2 m-2' type="password" name="password" value={user.password} onChange={handleInputChange} />
                </label>
                <br />
                <button type="button" onClick={handleSignUp} className='bg-blue-400 text-white px-4 py-2 rounded-md transition-all duration-200 hover:bg-blue-500'>
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default SignUpPage;
