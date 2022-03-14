const Skill = require("../models/skill");

class Controller {
  getAllSkills(req, res, next) {
    Skill.find({}, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  }

  // getAllSkills(req, res) {
  //   Skill.find({})
  //     .then((response) => res.status(200).json({ success: true, response }))
  //     .catch((error) => res.status(500).json({ msg: error }));
  // }

  //get an skill by id
  getOneSkill(req, res) {
    let { id } = req.params;
    Skill.findOne({ _id: id })
      .then((response) => res.status(200).json({ success: true, response }))
      .catch((error) => res.status(500).json({ msg: error.message }));
  }

  // creating new skill
  addNewSkill(req, res) {
    let body = req.body;
    let doc = new Skill(body);
    doc
      .save()
      .then((response) => res.status(200).json({ success: true, response }))
      .catch((error) => res.status(500).json({ msg: error }));
  }

  //update a skill by _id
  editSkill(req, res) {
    let { id } = req.params;
    let body = req.body;
    Skill.updateOne(
      { _id: id },
      {
        $set: body,
      }
    )
      .then((response) => res.status(200).json({ success: true, response }))
      .catch((error) => res.status(500).json({ msg: error }));
  }

  //delete a skill by id
  deleteSkill(req, res) {
    let { id } = req.params;
    Skill.findByIdAndDelete({ _id: id })
      .then((response) => res.status(200).json({ success: true, response }))
      .catch((error) => res.status(500).json({ msg: error }));
  }
}

const controller = new Controller();
module.exports = controller;
