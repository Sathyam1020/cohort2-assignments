const Todo = require("../models/todo");
const User = require('../models/user');
const { z} = require("zod");

const todoSchema = z.object({
    title: z.string().min(3).max(15),
    description: z.string().min(3).max(100),
    userId: z.string()
});

exports.createTodo = async(req, res) => {
    try{
        //Fetch the data from the body:
        const { title, description, userId } = todoSchema.parse(req.body);
        //Validate the request:
        if(!title || !description){
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        //Create the todo
        const todo = await Todo.create({
            title: title,
            description: description,
            user: userId
        });

        const user = await User.findById(userId);
        user.todos.push(todo._id);
        await user.save();

        //Return success response
        return res.status(201).json({
            success: true,
            todo,
            message: "Successfully created"
        })
    }catch (e) {
        if (e instanceof z.ZodError) {
            return res.status(403).json({
                success: false,
                message: "Validation error",
                details: e.errors,
            });
        }
        console.error(e);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

exports.allTodos = async(req, res) => {
    try {
        const userId = req.query.userId;

        // Fetch todos for the specified user
        const todos = await Todo.find({ user: userId });

        res.status(200).json({ success: true, todos });
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete the todo
        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }
        const user = await User.findOne({ todos: id });

        if (user) {
            // Remove the deleted todo from the user's todos array
            user.todos = user.todos.filter(todoId => todoId.toString() !== id);
            await user.save(); // Save the updated user
        }

        // Return success response
        return res.status(200).json({
            success: true,
            message: "Todo successfully deleted",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body

        // Validate the request:
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Check if the todo exists
        const existingTodo = await Todo.findById(id);

        if (!existingTodo) {
            return res.status(404).json({
                success: false,
                message: "No todo found",
            });
        }

        // Update the todo
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { title, description },
            { new: true } // Return the updated todo
        );

        // Return success response
        return res.status(200).json({
            success: true,
            todo: updatedTodo,
            message: "Todo successfully updated",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Update todo completion status
exports.updateTodoCompletionStatus = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the todo exists
        const existingTodo = await Todo.findById(id);

        if (!existingTodo) {
            return res.status(404).json({
                success: false,
                message: "No todo found",
            });
        }

        // Update the todo completion status
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { completed: true }, // Set completed to true
            { new: true } // Return the updated todo
        );

        // Return success response
        return res.status(200).json({
            success: true,
            todo: updatedTodo,
            message: "Todo successfully marked as done",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
