import React, {useState} from 'react';
import {useRecoilState} from "recoil";
import {tokenState, userState} from "../recoil/recoilAtoms";
import toast from "react-hot-toast";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const SignInPage = () => {

    const [userInput, setUserInput] = useState({
        username: "",
        password: "",
    });
    const [token, setToken] = useRecoilState(tokenState);
    const [currentUser, setCurrentUser] = useRecoilState(userState);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInput((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSignIn = async() => {
        try{
            const response = await axios.post('http://localhost:4000/user/signin', userInput);
            const fetchedToken = response.data.token;
            setToken(fetchedToken);
            setCurrentUser(response.data.user);
            localStorage.setItem('token', fetchedToken);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            toast.success('Signed in successfully');
            navigate('/create-todo')
        }catch(e){
            toast.error("Couldn't sign-in");
        }
    }

    return (
        <div className='bg-blue-400 h-screen pt-5 px-2'>
            <div
                className='bg-white mx-auto max-w-[1080px] rounded-lg p-4 flex flex-col items-center justify-between shadow-2xl'>
                <h2 className='font-semibold text-xl '>Welcome back!!!</h2>
                <label>
                    Email:
                    <input className='outline-none border border-blue-400 rounded-lg p-2 m-2' type="email" name="email"
                           value={userInput.email} onChange={handleInputChange}/>
                </label>
                <br/>
                <label>
                    Password:
                    <input className='outline-none border border-blue-400 rounded-lg p-2 m-2' type="password"
                           name="password" value={userInput.password} onChange={handleInputChange}/>
                </label>
                <br/>
                <button type="button" onClick={handleSignIn}
                        className='bg-blue-400 text-white px-4 py-2 rounded-md transition-all duration-200 hover:bg-blue-500'>
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default SignInPage;