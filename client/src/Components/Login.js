import React, { Component } from "react";
import axios from "axios";
import "../css/login.css";
import { BsFillPersonFill } from "react-icons/bs";
import { BsEnvelope } from "react-icons/bs";
import { GiPadlockOpen } from "react-icons/gi";
import {useNavigate} from "react-router-dom";

const withRouter = (WrappedComponent) => (props) => {
  const navigate = useNavigate();
  return (
    <WrappedComponent
      {...props}
      navigate={navigate}
    />
  );
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  onChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  onSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .get("/users/user", data)
      .then((res) => {
        this.setState({
          email: "",
          password: "",
        });
        this.props.login(true)
        this.props.navigate("/");
      })
      .catch((err) => {
        alert('Login Failed!');
        console.log(err);
      });
  };

  render() {
    return (
      <>
        <div className="background"></div>
        <div className="login-page">
          <div className="login-welcome">
            <div className="welcome">
              Welcome to <br /> Abdallah Badra's <br /> Dashboard
            </div>
            {/* <button className="login-btns portfolio-btn">Portfolio</button> */}
          </div>

          <div className="login-form">
            <div className="login-title">
              <BsFillPersonFill className="log-icon" />
              <h1>
                Login to enter <br /> the Dashboard
              </h1>
            </div>

            <form className="login-input" onSubmit={this.onSubmit}>
              <label>
                <BsEnvelope className="msg-icon" />
                <span className="line">|</span>
                <input
                  className="username-input"
                  type="text"
                  required
                  placeholder="Enter your email"
                  value={this.state.email}
                  name="email"
                  onChange={this.onChange}
                />
              </label>
              <label>
                <GiPadlockOpen className="pass-icon" />
                <span className="line">|</span>
                <input
                  className="password-input"
                  type="password"
                  required
                  placeholder="Enter your password"
                  value={this.state.password}
                  name="password"
                  onChange={this.onChange}
                />
              </label>
              <button className="login-btns login-btn">Login</button>
            </form>

            <footer>Copyright © 2022 By Codi team</footer>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Login);