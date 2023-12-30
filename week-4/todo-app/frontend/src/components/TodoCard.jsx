import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {tokenState} from "../recoil/recoilAtoms";
import axios from "axios";
import toast from "react-hot-toast";

const TodoCard = ({
    title,
    description,
    _id,
    completed: initialCompleted,
    getTodos
}) => {

    const token = useRecoilValue(tokenState);
    const [completed, setCompleted] = useState(initialCompleted);
    const handleDelete = async () => {
        try {
            // Make a DELETE request to delete the todo with the given _id
            await axios.delete(`http://localhost:4000/list/delete-todo/${_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Call the onDelete callback to remove the todo from the UI
            // onDelete(_id);
            toast.success("Todo deleted successfully");
            getTodos();
        } catch (error) {
            toast.error("Couldn't delete")
            console.error('Error deleting todo:', error.response?.data.message || 'Unknown error');
        }
    };

    const handleToggleCompletion = async () => {
        try {
            // Make a PUT request to toggle the completion status
            await axios.put(
                `http://localhost:4000/list/update-todo-completion-status/${_id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // Fetch updated todos
            setCompleted(!completed); // Toggle the completion status locally
            toast.success(completed ? 'Marked as incomplete' : 'Marked as done');
            getTodos();
        } catch (error) {
            toast.error(`Couldn't ${completed ? 'unmark' : 'mark'} it as done`);
            console.error('Error toggling completion status:', error.response?.data.message || 'Unknown error');
        }
    };

    return (
        <div className={completed ? (`bg-green-100 flex flex-col gap-2 shadow-lg rounded-lg mb-4 p-2`) : (`bg-blue-100 flex flex-col gap-2 shadow-lg rounded-lg mb-4 p-2`)}>
            <div className='font-bold text-2xl '>{title}</div>
            <div>{description}</div>
            <div>{
                completed ? (<div className='text-xs font-light underline'>Completed</div>) : (<div className='text-xs font-light underline'>Not completed</div>)
            }</div>
            <div className='flex justify-around'>
                <div
                    className='text-sm bg-red-500 rounded-md shadow-md px-3 py-2 text-white cursor-pointer hover:bg-red-600 transition-all duration-200'
                    onClick={handleDelete}
                >
                    Delete
                </div>
                <div
                    className='text-sm bg-green-500 rounded-md shadow-md px-3 py-2 text-white cursor-pointer hover:bg-green-600 transition-all duration-200'
                    onClick={handleToggleCompletion}
                >
                    {
                        completed ? ("Mark as Incomplete") : ("Mark as done")
                    }
                </div>
                <Link to={`/update-todo/${_id}`}
                    className='text-sm bg-blue-500 rounded-md shadow-md px-3 py-2 text-white cursor-pointer hover:bg-blue-600 transition-all duration-200'
                >
                    Edit
                </Link>
            </div>
        </div>
    );
};

export default TodoCard;