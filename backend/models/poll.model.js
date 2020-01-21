const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OptionSchema = new Schema({
    name: String,
    count: Number,
})

const pollSchema = new Schema({
    username : {type: String, required: true},
    description : {type: String, required: true},
    voterCount  : {type: Number},
    options : [OptionSchema],
    date : {type: Date},
    isAnonymous : {type: Boolean},

}, {
    timestamps: true
});

const Poll = mongoose.model('Poll', pollSchema);
module.exports = Poll;