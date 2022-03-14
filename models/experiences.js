const  {Schema, model} = require('mongoose');

const experiencesSchema = new Schema({
  jobTitle: {
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  companyName:{
    type: String,
    required: true
  },
  startDate:{
    type: Date,
    required: true
  },
  endDate:{
    type: Date,
    required: true
  },
  location:{
    type: String,
    required: true
  }, 
}, {collection: 'Experiences'})

const experiences = model('experiences', experiencesSchema);
module.exports = experiences;