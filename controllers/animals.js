const Animal = require('../models/animals');
var bodyParser = require("body-parser");
var req = require('request');
var path = require('path');

/**
 * Returns status if any error.
 *
 * @param {ObjectId} animalid The id of animal document.
 * @return {}
 */
exports.updateadoptstatus = function(animalid) {
    try {
        Animal.updateOne({_id:animalid}, { $set: {reserved: true } },function (err, animals) {
                if (err)
                    res.status(500).send('Invalid data!');
                console.log("status updated");
            });
    } catch (e) {
        res.status(500).send('error ' + e);
    }
}

/**
 * Returns animal details that are saved in the collection.
 *
 * This method inserts a new document in the animal collection
 *
 * @param {object} req The request object.
 * @param {object} res The response object.
 * @return {object} res The response object with status and result
 */
exports.create = function (req, res) {

    var userData = req.body;

    try {
    var animal = new Animal({
        name: userData.animalname,
        type: userData.animaltype,
        location: userData.animallocation,
        description: userData.animaldescription,
        keywords: (userData.animalkeywords).trim().split(/\s*,\s*/),
        age: userData.animalage,
        gender: userData.animalgender,
        img: req.file.path
    });

    animal.save(function (err, results) {
        if (err)
            res.status(500).send('Invalid data!');
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(animal));
    });
    } catch (e) {
        res.status(500).send('error ' + e);
    }
};

/**
 * Returns animal details that are matched the search criteria.
 *
 * This method queries the animal collection for relevant search parameters and
 * send the animal details
 *
 * @param {object} req The request object with parameters.
 * @param {object} res The response object.
 * @return {object} res The response object with status and list of animals
 */
exports.list = function (req, res) {
    var userData = req.body;
    var tags = [];
    if (userData == null) {
        res.status(403).send('No data sent!')
    }/*else if(!(Object.keys(userData).length === 0)){
        tags = (userData.searchanimalkeywords).trim().split(/\s*,\s*!/);
        tags = tags.map(value => new RegExp("^" + value + "$", "i"));
    }*/

    Animal.find({ type: new RegExp("^"+userData.searchanimaltype+"$", 'i'),
                location: new RegExp("^"+userData.searchanimallocation+"$", 'i'), age: userData.searchanimalage,
                gender: userData.searchanimalgender},
        //keywords:{ $in: tags }
        'name type location description keywords age gender img reserved',
        function (err, animals) {
        if (err) {
            return res.send(500, err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(animals);
    });
};

/**
 * Returns animal details for the given animal id.
 *
 * This method queries the animal collection for the animal that matches with the id
 * and retrieves the animal details
 *
 * @param {object} req The request object with oid parameter.
 * @param {object} res The response object.
 * @return {object} res The response object with status and animal details
 */
exports.getindividualAnimal = function (req, res) {
    var userData = req.query;
    var tags = [];
    if (userData == null) {
        res.status(403).send('No data sent!')
    }
    Animal.find({ _id: userData.oid },
        'name type location description keywords age gender img reserved',
        function (err, animals) {
            if (err) {
                return res.send(500, err);
            }
            res.render('animal', {
                title: "Animal Page",
                data: animals,
                id:userData.oid
            });
        });
};

/**
 * Returns animal detail for the given animal id along with the similar animals.
 *
 * This method queries the animal collection for the animal that matches with the id
 * and also for the similar animals that matches the query and retrieves the animal details
 *
 * @param {object} req The request object with parameters.
 * @param {object} res The response object.
 * @return {object} res The response object with status and animal details
 */
exports.getAnimal = function (req, res) {
    var userData = req.query;
    var tags = [];
    if (userData == null) {
        res.status(403).send('No data sent!')
    }else if(!(Object.keys(userData).length === 0)){
        tags = (userData.keywords).trim().split(/\s*,\s*!/);
        tags = tags.map(value => new RegExp("^" + value + "$", "i"));
    }
    Animal.find({ $and: [
                { $or: [ { _id: userData.oid }, { type: new RegExp("^"+userData.animaltype+"$", 'i') }]},
                { $or: [ { location: new RegExp("^"+userData.location+"$", 'i') }, { keywords:{ $in: tags } } ] }
                ]},
        'name type location description keywords age gender img reserved',
        function (err, animals) {
            if (err) {
                return res.send(500, err);
            }
            res.render('animal', {
                title: "Animal Page",
                data: animals,
                id:userData.oid
            });
        });
};
