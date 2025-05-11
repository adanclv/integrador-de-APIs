const { getAllTodos, addTodo, updateTodo, deleteTodo } = require('../model/todoModel');

const getTodos = (req, res) => {
    getAllTodos((err, data) => {
        if (err) return res.status(500).json({ error: 'Error al obtener todos' });
        res.json(data);
    });
};

const createTodo = (req, res) => {
    const { title } = req.body;
    addTodo(title, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al agregar todo' });
        res.json({ message: 'Todo agregado' });
    });
};

const updateTodoItem = (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    updateTodo(id, title, completed, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al actualizar todo' });
        res.json({ message: 'Todo actualizada' });
    });
};

const deleteTodoItem = (req, res) => {
    const { id } = req.params;
    deleteTodo(id, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al eliminar todo' });
        res.json({ message: 'Todo eliminada' });
    });
};

module.exports = { getTodos, createTodo, updateTodoItem, deleteTodoItem };
