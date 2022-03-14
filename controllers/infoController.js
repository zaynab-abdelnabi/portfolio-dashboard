const { response } = require("../app");
const Info = require("../models/info");

class Controller {
  //get one info
  get(req, res, next) {
    let { id } = req.params;
    Info.findOne({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  }
  // get all info
  getAll(req, res, next) {
    Info.find({}, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  }
  // edit info
  put(req, res, next) {
    let { id } = req.params;
    let image = req.file.filename || req.body.image;
    let { name, headline, about } = req.body;
    Info.updateOne(
      { _id: id },
      {
        name: name,
        headline: headline,
        about: about,
        image: image,
      }
    )
      .then((response) => res.status(200).json({ success: true, response }))
      .catch((error) => res.status(500).json({ msg: error }));
  }

  post(req, res, next) {
    console.log(req.file);
    let { name, headline, about } = req.body;
    let doc = new Info({
      name: name,
      headline: headline,
      about: about,
      image: req.file.filename,
    });
    doc
      .save()
      .then((response) => res.status(200).json({ success: true, response }))
      .catch((error) => res.status(500).json({ msg: error }));
  }
}

const infocontroller = new Controller();
module.exports = infocontroller;
