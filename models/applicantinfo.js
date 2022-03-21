let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let Applicantinfo = new Schema(
    {
        name: {type: String, required: true, max: 100},
        user_age:{type:Number},
        user_gender:{type:String},
        address:{type:String, required: true, max: 100},
        city:{type:String, required: true, max: 100},
        zipcode:{type:String, required: true, max: 100},
        mobile:{type:String},
        email:{type:String, required: true, max: 100},
        reason:{type:String, required: true, max: 1000},
        pets_count:{type:Number},
        housing_type:{type:String},
        animal_id:{type: Schema.Types.ObjectId, ref: 'Animal'}
    }
);

Applicantinfo.set('toObject', {getters: true, virtuals: true});

let applicantinfoModel = mongoose.model('Applicantinfo', Applicantinfo );

module.exports = applicantinfoModel;
