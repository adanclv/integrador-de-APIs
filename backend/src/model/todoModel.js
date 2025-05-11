const db = require('../config/db');

const getAllTodos = (callback) => {
    db.query('CALL sp_getAllTodo()', (err, results) => {
        if (err) return callback(err, null);
        callback(null, results[0]); // El resultado está en la primera posición
    });
};

const addTodo = (title, callback) => {
    db.query('CALL sp_insertTodo(?)', [title], (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
    });
};

const updateTodo = (id, title, completed, callback) => {
    db.query('CALL sp_updateTodo(?, ?, ?)', [id, title, completed], (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
    });
};

const deleteTodo = (id, callback) => {
    db.query('CALL sp_deleteTodo(?)', [id], (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
    });
};

module.exports = { getAllTodos, addTodo, updateTodo, deleteTodo };
