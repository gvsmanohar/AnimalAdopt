let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let Comments = new Schema(
    {
        comment: {type: String, required: true},
        animal_id:{ type: Schema.Types.ObjectId, ref: 'Animal' }
    }
);

Comments.set('toObject', {getters: true, virtuals: true});

let commentsModel = mongoose.model('Comments', Comments );

module.exports = commentsModel;
