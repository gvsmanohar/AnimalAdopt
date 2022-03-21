const Applicantinfo = require('../models/applicantinfo');
var bodyParser = require("body-parser");
var req = require('request');
var path = require('path');

/**
 * Returns application details that are saved in the applicantinfo collection.
 *
 * This method stores the applicant details submitted to adopt the animal in the applicantinfo collection
 *
 * @param {object} req The request object with all the application form data.
 * @param {object} res The response object.
 * @return {object} res The response object with status and submitted details
 */
exports.insert = function (req, res) {
    let userData = req.body;
    if (userData == null) {
        res.status(403).send('No data sent!')
    }
    try {
        let applicantinfo = new Applicantinfo({
            name: userData.fullname,
            user_age:userData.age,
            user_gender:userData.gender,
            city:userData.town,
            zipcode:userData.postcode,
            mobile:userData.phone,
            address:userData.address1,
            email:userData.email,
            reason:userData.why,
            pets_count:userData.number,
            housing_type:userData.housing,
            animal_id:userData.animalid
        });
        console.log('received: ' + applicantinfo);

        applicantinfo.save(function (err, results) {
            const animal = require('../controllers/animals');
            animal.updateadoptstatus(userData.animalid);
            if (err)
                res.status(500).send('Invalid data!');
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(applicantinfo));
        });
    } catch (e) {
        res.status(500).send('error ' + e);
    }
}