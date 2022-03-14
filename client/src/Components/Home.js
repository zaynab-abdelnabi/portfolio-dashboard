import React, { Component } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import "../css/home.css";
import { Link } from "react-router-dom";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
    };
  }

  componentDidMount(){
    this.getAllInfo();
  }
   getAllInfo = () => {
    axios
      .get("/info")
      .then((res) => {
        this.setState({info:res.data.response[0]})
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
render() {
  
    return (
      <>
        <div className="header_info">
          <h1>Personal Information</h1>
           <Link to={"/edit"}>
          <button className="btn edit-btn">
            <AiOutlineEdit />
            <span className="btn-title">Edit</span>
          </button>
          </Link>
        </div>
        <div className="personal_info">
          <div className="section_info">
            <div className="section-img">
              <img src={"/uploads/"+this.state.info.image} alt="photo" />
            </div>

            <div className="second_section_info">
              <div className="name">
                <h2>Name</h2>
                <p>{this.state.info.name}</p>
              </div>

              <div className="headline">
                <h2>Headline</h2>
                <p>{this.state.info.headline}</p>
              </div>
            </div>
          </div>

          <div className="section-about">
            <h2>About</h2>
            <p>
              {this.state.info.about}
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default Home;