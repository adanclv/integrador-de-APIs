const express = require('express');
const { getTodos, createTodo, updateTodoItem, deleteTodoItem } = require('../controller/todoController');

const router = express.Router();

router.get('/todo', getTodos);
router.post('/todo', createTodo);
router.put('/todo/:id', updateTodoItem);
router.delete('/todo/:id', deleteTodoItem);

module.exports = router;
