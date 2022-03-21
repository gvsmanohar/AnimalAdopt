let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let Queries = new Schema(
    {
        name: {type: String, required: true, max: 100},
        email:{type: String, required: true, max: 100},
        query: {type: String, required: true}
    }
);

Queries.set('toObject', {getters: true, virtuals: true});

let queryModel = mongoose.model('Queries', Queries );

module.exports = queryModel;
