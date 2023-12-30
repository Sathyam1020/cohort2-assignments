import React, {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from "recoil";
import {tokenState, userState} from "../recoil/recoilAtoms";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import TodoCard from "../components/TodoCard";

const HomePage = () => {

    const token = useRecoilValue(tokenState);
    const [todos, setTodos] = useState([]);
    const user = useRecoilValue(userState);
    const jsonUser = JSON.parse(user);
    const getTodos = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:4000/list/all-todos?userId=${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const todos = response.data.todos;
            setTodos(todos);
            console.log('Todos:', todos);
            // Set state or perform any other actions with the fetched todos
        } catch (error) {
            console.error('Error fetching todos:', error.response?.data.message || 'Unknown error');
            // Handle errors as needed
        }
    };
    useEffect(() => {
        getTodos(jsonUser?._id);
    }, []);

    const navigate = useNavigate();
    return (
        <div className="bg-blue-400 min-h-screen p-4">
            <div className="bg-white rounded-lg shadow-2xl mx-auto max-w-[1080px] min-h-screen flex items-center flex-col">
                <div>
                    {
                        token ? (
                            <div>
                                {
                                    todos.length === 0 ? (
                                        <div className='flex flex-col gap-2 '>
                                            <h1 className='text-center font-semibold text-2xl mb-2 p-2'>Make your first todo</h1>
                                            <button
                                                className='bg-blue-400 hover:bg-blue-500 rounded-md shadow-md px-4 py-2 mb-2 text-white'
                                                onClick={() => navigate('/create-todo')}
                                            >
                                                Make todo
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <h1 className='font-semibold text-xl p-2 m-1'>Hey👋🏻 {jsonUser.username},here are your tasks</h1>
                                            {
                                                todos.map((todo) => {
                                                    console.log(todo._id);
                                                    return (
                                                        <TodoCard
                                                            key={todo._id}
                                                            title={todo.title}
                                                            description={todo.description}
                                                            _id={todo._id}
                                                            getTodos={() => getTodos(jsonUser?._id)}
                                                            completed = {todo.completed}
                                                        />
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        ) : (
                            <div className='flex justify-between items-center flex-col gap-2'>
                                <h1 className="font-bold text-7xl flex items-center justify-center p-4">Manage all your
                                    tasks from one place!!!</h1>
                                <button
                                    className='bg-blue-400 hover:bg-blue-500 transition-all duration-200 rounded-lg py-2 px-4 mb-4 shadow-md text-white'>Create
                                    your first todo
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default HomePage;