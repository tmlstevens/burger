const connection = require('./connection.js');

function printQuestionMarks(num) {
    var array = [];
    for (var i = 0; i < num; i++) {
      array.push("?");
    }
    return array.toString();
}
function objToSql(obj) {
    var array = [];
    for (var key in obj) {
        var value = obj[key];
        if (Object.hasOwnProperty.call(obj, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            array.push(key + "=" + value);
        }
    }
    return array.toString();
}
var orm = {
    selectAll: function(table, callback) {
        var queryString = "SELECT * FROM " + table + ";";
        connection.query(queryString, function(error, results) {
            if (error) {
                throw error;
            }
            callback(results);
        });
    },
    insertOne: function(table, columns, values, callback) {
        var queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += columns.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(values.length);
        queryString += ") ";  
        connection.query(queryString, values, function(error, results) {
            if (error) {
                throw error;
            }
            callback(results);
        });
    },
    updateOne: function(table, objColVals, condition, callback) {
        var queryString = "UPDATE " + table;
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
        connection.query(queryString, function(error, results) {
            if (error) {
                throw error;
            }
            callback(results);
        });
    },
    deleteOne: function(table, condition, callback) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;
        connection.query(queryString, function(error, results) {
            if (error) {
                throw error;
            }
            callback(results);
        });
    }
};
  
module.exports = orm;