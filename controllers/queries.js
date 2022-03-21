const Queries = require('../models/queries');
var bodyParser = require("body-parser");
var req = require('request');
var path = require('path');

/**
 * Returns the query details submitted.
 *
 * This method adds the new user Query into the queries collection.
 *
 * @param {object} req The request object with user query details.
 * @param {object} res The response object.
 * @return {object} res The response object with status and query details
 */
exports.insert = function (req, res) {
    let userData = req.body;
    if (userData == null) {
        res.status(403).send('No data sent!')
    }
    try {
        let query = new Queries({
            name: userData.name,
            email: userData.email,
            query:userData.query
        });
        console.log('received: ' + query);

        query.save(function (err, results) {
            if (err)
                res.status(500).send('Invalid data!');
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(query));
        });
    } catch (e) {
        res.status(500).send('error ' + e);
    }
}