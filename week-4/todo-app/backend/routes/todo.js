const express = require("express")
const router = express.Router()

const { createTodo, allTodos, deleteTodo, updateTodo, updateTodoCompletionStatus } = require('../controllers/todo');
const { userMiddleware } = require('../middleware/auth');

router.post('/create-todo',userMiddleware, createTodo);
router.get('/all-todos/', userMiddleware, allTodos);
router.put('/update-todo/:id', userMiddleware, updateTodo);
router.put('/update-todo-completion-status/:id', userMiddleware, updateTodoCompletionStatus);
router.delete('/delete-todo/:id', userMiddleware, deleteTodo);

module.exports = router;