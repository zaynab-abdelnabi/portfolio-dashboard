import React, { Component } from "react";
import "../css/editinfo.css";
import client from "../img/client.jpeg";
import axios from "axios";
// import { AiFillThunderbolt } from "react-icons/ai";
// import { Link, Route, Redirect} from "react-router-dom";

class EditInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
      name: "",
      headline: "",
      about: "",
      selectedFile: null,
      photoUrl: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getAllInfo();
  }
  getAllInfo = () => {
    axios
      .get("/info")
      .then((res) => {
        console.log(res.data);
        this.setState({
          info: res.data.response[0],
          name: res.data.response[0].name,
          headline: res.data.response[0].headline,
          about: res.data.response[0].about,
          photoUrl: res.data.response[0].image,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleFileSelect = (e) => {
    this.setState({
      selectedFile: e.target.files[0],
      photoUrl: URL.createObjectURL(e.target.files[0]),
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", this.state.name);
    data.append("headline", this.state.headline);
    data.append("about", this.state.about);

    if (this.state.selectedFile) {
      data.append("image", this.state.selectedFile)
    }
    else {
      data.append("image", this.state.photoUrl)
    };
    
    axios
      .put("/info/6214bd7d96f5dd5dd2f562d9", data)
      .then((res) => {
        alert('Editing Succeeded');
        console.log(res);
      })
      .catch((err) => {
        alert('Editing Failed');
        console.log(err);
      });
  };

  src = () => {
    if (this.state.selectedFile) {
      return this.state.photoUrl;
    } else {
      return "/uploads/" + this.state.photoUrl;
    }
  };

  render() {
    return (
      <>
        <div className="header_info">
          <h1>Edit Personal Information</h1>
        </div>
        <form onSubmit={this.onSubmit} className="personal_info">
          <div className="form_info">
            <div className="form-img">
              <label for={"image"}>
                <img src={this.src()} alt="photo" />
              </label>

              <input type="file" id="image" required onChange={this.handleFileSelect} hidden />
            </div>

            <div className="second_form_info">
              <div className="name">
                <h2>Name</h2>
                <input
                  required
                  type="text"
                  name="name"
                  onChange={this.handleChange}
                  defaultValue={this.state.name}
                />
              </div>

              <div className="headline">
                <h2>Headline</h2>
                <input
                  required
                  type="text"
                  name="headline"
                  defaultValue={this.state.headline}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-about">
            <h2>About</h2>
            <textarea
              name="about"
              defaultValue={this.state.about}
              onChange={this.handleChange}
            ></textarea>
          </div>
          <div className="info-btn">
            <button className="btn submit-btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </>
    );
  }
}
export default EditInfo;
