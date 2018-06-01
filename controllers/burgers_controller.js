const express = require('express');
const router = express.Router();
const burger = require('../models/burger.js');

router.get("/", function(request, response) {
    burger.all(function(data) {
        var hbsObject = {
            burgers: data
        };
        response.render("index", hbsObject)
    })
});

router.post("/api/burgers", function(request, response) {
    burger.create(
        ["sandwich","devoured"],
        [request.body.sandwich,request.body.devoured],
        function(result) {
            response.json({ id: result.insertId })
        }
    )
});

router.put("/api/burgers/:id", function(request, response) {
    var condition = "id = " + request.params.id;
    burger.update(
        { devoured: request.body.devoured },
        condition,
        function(result) {
            if (result.changedRows === 0) {
                return response.status(404).end();
            }
            response.status(200).end()
        }
    )
});

router.delete("/api/burgers/:id", function(request, response) {
    var condition = "id = " + request.params.id;
    burger.delete(condition, function(result) {
        if (result.affectedRows == 0) {
            return response.status(404).end();
        } else {
            response.status(200).end()
        }
    })
});

module.exports = router;