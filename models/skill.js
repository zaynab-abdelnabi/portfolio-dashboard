const { Schema, model } = require("mongoose");

const SkillSchema = new Schema(
  {
    skillname: {
      type: String,
      required: [true, "Please add the name of the skill"],
    },
    rating: {
      type: Number,
      min: [0, "Rating can't be less than 0%"],
      max: [100, "Rating can't be more than 100%"],
      required: [true, "Please add rating to the skill"],
    },
  },
  { collection: "skills" }
);

const Skill = model("Skill", SkillSchema);
module.exports = Skill;
