import React, {useState} from 'react';
import {useRecoilValue} from "recoil";
import {tokenState} from "../recoil/recoilAtoms";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const CreateTodo = () => {

    const token = useRecoilValue(tokenState);

    const [userInput, setUserInput] = useState({
        title: "",
        description: "",
    });

    const navigate = useNavigate();
    const { todoId } = useParams();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInput((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async() => {
        try{
            const response = await axios.put(`http://localhost:4000/list/update-todo/${todoId}`,
                userInput,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success("Todo updated successfully");
            navigate('/');
        }catch(e){
            console.log(e);
            toast.error("Couldn't update todo")
        }
    }

    return (
        <div className='bg-blue-400 h-screen pt-5 px-2'>
            <div
                className='bg-white mx-auto max-w-[1080px] rounded-lg p-4 flex flex-col items-center justify-between shadow-2xl'>
                <h2 className='font-semibold text-xl '>Update your todo</h2>
                <label>
                    Title:
                    <input className='outline-none border border-blue-400 rounded-lg p-2 m-2' type="text" name="title"
                           value={userInput.title} onChange={handleInputChange}/>
                </label>
                <br/>
                <label>
                    Description:
                    <input className='outline-none border border-blue-400 rounded-lg p-2 m-2' type="text"
                           name="description" value={userInput.description} onChange={handleInputChange} />
                </label>
                <br/>
                <button type="button" onClick={handleSubmit}
                        className='bg-blue-400 text-white px-4 py-2 rounded-md transition-all duration-200 hover:bg-blue-500'>
                    Update
                </button>
            </div>
        </div>
    );
};

export default CreateTodo;