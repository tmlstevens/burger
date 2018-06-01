const orm = require('../config/orm.js');

var burger = {
    all: function(callback) {
        orm.selectAll("burgers", function(results) {
            callback(results);
        })
    },
    create: function(columns, values, callback) {
        orm.insertOne("burgers", columns, values, function(results) {
            callback(results);
        })
    },
    update: function(objColVals, condition, callback) {
        orm.updateOne("burgers", objColVals, condition, function(results) {
            callback(results);
        })
    },
    delete: function(condition, callback) {
        orm.deleteOne("burgers", condition, function(results) {
            callback(results);
        })
    }
};
  
module.exports = burger;
  