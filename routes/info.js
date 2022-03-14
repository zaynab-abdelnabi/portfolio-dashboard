var express = require("express");
var router = express.Router();
var Info = require("../models/info");
var controller = require("../controllers/infoController");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.get("/:id", controller.get);
router.get("/", controller.getAll);
router.post("/", upload.single("image"), controller.post);
router.put("/:id",upload.single("image"), controller.put);

module.exports = router;
