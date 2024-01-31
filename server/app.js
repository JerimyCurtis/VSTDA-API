//require dependencies 
const express = require('express');
const morgan = require('morgan');
//create server
const app = express();
app.use(express.json());
app.use(morgan('dev'));

//array of items
let todoItems = [
    { todoItemId: 0, name: 'an item', priority: 3, completed: false },
    { todoItemId: 1, name: 'another item', priority: 2, completed: false },
    { todoItemId: 2, name: 'a done item', priority: 1, completed: true }
];
//get route /
app.get('/', (req, res) => {
    res.json({ status: 'ok' });
});
//get route api/todo-items:all
app.get('/api/TodoItems', (req, res) => {
    res.json(todoItems);
});
//get route specific item
app.get('/api/TodoItems/:number', (req, res) => {
    const id = parseInt(req.params.number);
    const item = todoItems.find(item => item.todoItemId === id);
    if (item) {
        res.json(item);
    } else {
        res.status(404).send('Item not found');
    }
});
//post route
app.post('/api/TodoItems', (req, res) => {
    const newItem = req.body;
    const existingItem = todoItems.find(item => item.todoItemId === newItem.todoItemId);

    if (existingItem) {
        Object.assign(existingItem, newItem);
        res.json(existingItem);
    } else {
        // Add a new item
        todoItems.push(newItem);
        res.status(201).json(newItem);
    }
});
//delete route
app.delete('/api/TodoItems/:number', (req, res) => {
    const id = parseInt(req.params.number);
    const itemIndex = todoItems.findIndex(item => item.todoItemId === id);
    if (itemIndex > -1) {
        const deletedItem = todoItems.splice(itemIndex, 1);
        res.json(deletedItem[0]);
    } else {
        res.status(404).send('Item not found');
    }
});


// Export the app
module.exports = app;