import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useRecoilState, useRecoilValue} from "recoil";
import {tokenState, userState} from "../recoil/recoilAtoms";

const Navbar = () => {

    const signinToken = useRecoilValue(tokenState);

    const [token, setToken] = useRecoilState(tokenState);
    const [user, setUser] = useRecoilState(userState);

    const navigate = useNavigate();
    const handleLogout = () => {
        // Clear global state
        setToken(null);
        setUser(null);

        // Optionally, clear localStorage
        localStorage.removeItem('token');

        // Redirect or perform any additional actions after logout
        navigate('/signin');
    };

    return (
        <div className="mx-auto max-w-[1080px] bg-white">
            <div className="flex justify-between items-center p-2">
                <Link to="/">
                    <h1 className="font-bold text-2xl">Todo App</h1>
                </Link>
                <div>
                    {
                        signinToken ? (
                            <div className="flex gap-2">
                                <Link to="/create-todo">
                                    <div className="bg-blue-400 hover:bg-blue-500 transition-all duration-200 rounded-md px-4 py-2 cursor-pointer shadow-md text-white">
                                        Create todo +
                                    </div>
                                </Link>
                                <Link to="/signup">
                                    <div
                                        className="bg-blue-400 hover:bg-blue-500 transition-all duration-200 rounded-md px-4 py-2 cursor-pointer shadow-md text-white"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </div>
                                </Link>
                            </div>
                        ) : (
                            <div className='flex gap-2'>
                                <Link to="/signin">
                                    <div
                                        className="bg-blue-400 hover:bg-blue-500 transition-all duration-200 rounded-md px-4 py-2 cursor-pointer shadow-md text-white">
                                        Sign in
                                    </div>
                                </Link>
                                <Link to="/signup">
                                    <div
                                        className="bg-blue-400 hover:bg-blue-500 transition-all duration-200 rounded-md px-4 py-2 cursor-pointer shadow-md text-white">
                                        Sign up
                                    </div>
                                </Link>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;