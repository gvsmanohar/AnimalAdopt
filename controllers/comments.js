const Comments = require('../models/comments');
var bodyParser = require("body-parser");
var req = require('request');
var path = require('path');

/**
 * Returns comment and animal id details that are saved in the comments collection.
 *
 * This method stores the user comment for the specific animal object.
 *
 * @param {object} req The request object with comment and animal id parameters.
 * @param {object} res The response object.
 * @return {object} res The response object with status and submitted details
 */
exports.insert = function (req, res) {
    let userData = req.body;
    if (userData == null) {
        res.status(403).send('No data sent!')
    }
    try {
        let comments = new Comments({
            comment:userData.usercmnt,
            animal_id:userData.animal_id
        });
        console.log('received: ' + comments);

        comments.save(function (err, results) {
            if (err)
                res.status(500).send('Invalid data!');
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(results));
        });
    } catch (e) {
        res.status(500).send('error ' + e);
    }
}

/**
 * Returns comments and animal id details that are retrieved from the comments collection.
 *
 * This method retrieves the user comments for the specific animal object.
 *
 * @param {object} req The request object with animal id parameter.
 * @param {object} res The response object.
 * @return {object} res The response object with status and comment details
 */
exports.getcomment = function (req, res) {
    var userData = req.body;
    var tags = [];
    if (userData == null) {
        res.status(403).send('No data sent!')
    }
    Comments.find( {animal_id:userData.animal_id},
        'comment',
        function (err, usercomments) {
            if (err) {
                return res.send(500, err);
            }
            res.setHeader('Content-Type', 'application/json');
            res.send(usercomments);
        });
};