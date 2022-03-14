import React, { Component } from "react";
import axios from "axios";
import { ImPlus } from "react-icons/im";
import { AiOutlineEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import "../css/skills.css";

class Skills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addNewMode: false,
      skills: [],
      skillname: "",
      rating: "",
      skill_id: "",
    };
  }

  componentDidMount() {
    this.getSkills();
  }

  getSkills = () => {
    axios
      .get("/skills")
      .then((res) => {
        this.setState({
          skills: res.data.response,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  onSubmit = (e) => {
    e.preventDefault();
    const data = {
      skillname: this.state.skillname,
      rating: this.state.rating,
    };
    if (!this.state.skill_id) {
      axios
        .post("/skills", data)
        .then((res) => {
          this.getSkills();
          this.setState({
            addNewMode: false,
            skillname: "",
            rating: "",
            skill_id: "",
          });
          alert('Adding Succeeded');
        })
        .catch((err) => {
          alert('Adding Failed');
          console.log(err);
        });
    } else {
      axios
        .put("/skills/" + this.state.skill_id, data)
        .then((res) => {
          this.getSkills();
          this.setState({
            addNewMode: false,
            skillname: "",
            rating: "",
            skill_id: "",
          });
          alert('Editing Succeeded');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  editSkill = (id) => {
    axios
      .get("/skills/" + id)
      .then((res) => {
        this.setState({
          skillname: res.data.response.skillname,
          rating: res.data.response.rating,
          skill_id: res.data.response._id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({
      addNewMode: true,
    });
  };

  deleteSkill = (id) => {
    axios
      .delete("/skills/" + id)
      .then((res) => {
        this.getSkills();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <>
        <h1>Skills</h1>
        <button
          className={
            this.state.addNewMode ? "btn add-new-btn hidden" : "btn add-new-btn"
          }
          onClick={() => this.setState({ addNewMode: true })}
        >
          <ImPlus /> New Skill
        </button>
        <form
          className={this.state.addNewMode ? "skill-form" : "skill-form hidden"}
          onSubmit={this.onSubmit}
        >
          <label>
            Skill Name
            <input
              type="text"
              value={this.state.skillname}
              name="skillname"
              required
              onChange={this.onChange}
            />
          </label>
          <label>
            Rating
            <input
              type="number"
              value={this.state.rating}
              name="rating"
              required
              onChange={this.onChange}
            />
          </label>
          <button className="btn submit-btn" type="submit">
            Submit
          </button>
        </form>
        <table className="table">
          <tr className="table-head">
            <th>Skills</th>
            <th>Rating</th>
            <th></th>
          </tr>
          {this.state.skills.map((skill) => {
            return (
              <tr className="table-row" key={skill._id}>
                <td>{skill.skillname}</td>
                <td>{skill.rating}%</td>
                <td className="btns">
                  <button
                    className="btn edit-btn"
                    onClick={() => {
                      this.editSkill(skill._id);
                    }}
                    type="button"
                  >
                    <AiOutlineEdit /> <span className="btn-title">Edit</span>
                  </button>
                  <button
                    className="btn delete-btn"
                    onClick={() => {
                      this.deleteSkill(skill._id);
                    }}
                  >
                    <BiTrash />
                    <span className="btn-title">Delete</span>
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </>
    );
  }
}

export default Skills;
