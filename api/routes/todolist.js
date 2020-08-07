const express = require('express');
const router = express.Router();
const ToDoList = require('../models/todolist');

router.get('/', function(req, res, next) {
    ToDoList.find({})
        .then((records) => {
            res.send(records)
        })
});

router.post('/', function(req, res, next) {
    ToDoList.create(req.body)
        .then(function(record) {
            res.send(record);
        })
        .catch(next);

});

router.put('/:id', function(req, res, next) {
    ToDoList.findByIdAndUpdate({ _id: req.params.id }, { completed: true } )
        .then(function() {
            ToDoList.findOne({ _id: req.params.id })
                .then(function(record) {
                    res.send(record);
                })
        });
});

router.delete('/:id', function(req, res, next) {
    ToDoList.findByIdAndRemove({ _id: req.params.id })
        .then(function() {
            ToDoList.findOne({ _id: req.params.id })
                .then(function(record) {
                    res.send(record)
                })
        })
});

module.exports = router;