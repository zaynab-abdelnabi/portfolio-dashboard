const User = require("../models/user");

class Controller {
  getAll(req, res) {
    User
      .find({})
      .then((response) => res.status(200).json({ success: true, response }))
      .catch((error) => res.status(500).json({ msg: error }));
  }

  getOne(req, res) {
    let {email, password} = req.body;
    User
      .findOne({ email: email, password:password })
      .then((response) => res.status(200).json({ success: true, response }))
      .catch((error) => res.status(500).json({ msg: error }));
  }

  create(req, res) {
    let body = req.body;
    let doc = new User(body);
    doc
      .save()
      .then((response) => res.status(200).json({ success: true, response }))
      .catch((error) => res.status(500).json({ msg: error }));
  }

//   update(req, res) {
//     let { id } = req.params;
//     let body = req.body;
//     User
//       .findOneAndUpdate(
//         { _id: id },
//         {
//           $set: body,
//         }
//       )
//       .then((response) => res.status(200).json({ success: true, response }))
//       .catch((error) => res.status(500).json({ msg: error }));
//   }

//   delete(req, res) {
//     let { id } = req.params;
//     User
//       .deleteOne({ _id: id })
//       .then((response) => res.status(200).json({ success: true, response }))
//       .catch((error) => res.status(500).json({ msg: error }));
//   }
}

const controller = new Controller();
module.exports = controller;
