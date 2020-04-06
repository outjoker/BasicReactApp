const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid')
const eventSchema = new Schema({
    id : {type: String, required:true},
    data: {}
})
const createModelForEvent = () => {
    return mongoose.model('myapp', eventSchema);
}
module.exports.createModelForEvent = createModelForEvent;
