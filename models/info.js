const {Schema,model} = require('mongoose');
const InfoSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    headline:{
        type: String,
        required: true,
    },
    about:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    }},
    {
        collection: 'info'
});
const Info = model("Info",InfoSchema);
module.exports = Info;
