let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let Animal = new Schema(
    {
        name: {type: String, required: true, max: 100},
        type: {type: String, required: true, max: 100},
        location: {type: String, required: true, max: 100},
        description: {type: String, max: 10000},
        keywords: {type: [String]},
        age: {type: String, required: true},
        gender: {type: String, required: true},
        reserved: {type: Boolean, default: false},
        img: {type: String}
    }
);

Animal.set('toObject', {getters: true, virtuals: true});


let animalModel = mongoose.model('Animal', Animal );

module.exports = animalModel;
