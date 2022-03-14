var express = require("express");
var router = express.Router();
const controller = require("../controllers/skillsController")

router.get("/", controller.getAllSkills);
router.get("/:id", controller.getOneSkill);
router.post("/", controller.addNewSkill);
router.put("/:id", controller.editSkill);
router.delete("/:id", controller.deleteSkill);

module.exports = router;
