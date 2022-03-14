const { response } = require('../app');
const experiences = require('../models/experiences');

class Controller {
  getAll (req, res, next){
    experiences.find({}, (err, response)=>{
      if (err) return next(err);
      res.status(200).send({success: true, response});
    })
  }

  getOne (req, res, next) {
    let {id}  = req.params;
    experiences.findOne({ _id: id }, (err, response)=>{
      if (err) return next(err);
      res.status(200).send({success: true, response});
    })
  }

  create (req, res, next) {
    let body = req.body;
    let doc = new experiences(body);
    doc.save((err, response) =>{
      if (err) return next(err);
      res.status(200).send({success: true, response});
    })
  }

  update (req, res, next){
    let {id} = req.params;
    let body = req.body;
    experiences.findOneAndUpdate({_id : id}, {
      $set : body
    }, (err, response) =>{
      if (err) return next(err);
      res.status(200).send({success: true, response});
    })
  }

  delete(req, res, next){
    let {id} = req.params;
    experiences.deleteOne({_id : id}, (err, response) =>{
      if (err) return next(err);
      res.status(200).send({success: true, response});
    })
  }
}

const controller = new Controller();
module.exports = controller;