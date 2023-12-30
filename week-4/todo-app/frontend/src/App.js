// App.js

import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import Navbar from './components/Navbar';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import HomePage from "./pages/HomePage";
import CreateTodo from "./pages/CreateTodo";
import UpdateTodo from "./pages/UpdateTodo";

const App = () => {
    return (
        <div>
            <div className="">
                <div className="border-b shadow-2xl">
                    <Navbar/>
                </div>
                <div className="">
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/signup" element={<SignUpPage/>} />
                        <Route path="/signin" element={<SignInPage/>} />
                        <Route path="/create-todo" element={<CreateTodo/>} />
                        <Route path='/update-todo/:todoId' element={<UpdateTodo/>} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default App;
