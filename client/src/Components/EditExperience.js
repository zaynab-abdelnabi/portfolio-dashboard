import axios from "axios";
import React, { Component } from "react";

import '../css/NewExperience.css';


class EditExperience extends Component {
  constructor(props){
    super(props);
    this.state={
      addNewMode: false,
      experience: {},
    }
  }

  componentDidMount(){
    this.getExperience();
  }

  
  getExperience = () =>{
    axios.get(`/experiences/`+ this.props.idProp)
    .then(res=>{
      console.log(res.data.response);

      this.setState({
        experience: res.data.response
      })
    }).catch((err)=>{
      console.log(err);
    })
  }

  handleChange = e=>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e =>{
    e.preventDefault();

    let inpt = {
      jobTitle: this.state.jobTitle,
      companyName: this.state.companyName,
      location: this.state.location,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      description: this.state.description
    }

    axios.put('/experiences/'+this.props.idProp, inpt)
    .then(res=>{
      alert('Editing Succeeded');
      window.location.reload();
    })
    .catch(err=>{
      alert('Editing Failed');
      console.log(err);
    })
  }


  render() {
    return (
      <div>
          <div className="experiences">
            <div className="experiences-header">
              <div className="experiences-header-text">
                <div className="experiences-header-text-title">
                  <h1>Edit Experience</h1>
                </div>
              </div>
            </div>
            <form className="experiences-form" onSubmit={this.handleSubmit} >
              <div className="jobTitle">
                <label htmlFor="jobTitle">Job Title</label>
                <input type={"text"} id="jobTitle" name="jobTitle" defaultValue={this.state.experience.jobTitle} onChange={this.handleChange}></input>
              </div>
              <div className="companyName">
                <label htmlFor="companyName">Company Name</label>
                <input type={"text"} id="companyName" name="companyName" defaultValue={this.state.experience.companyName} onChange={this.handleChange}></input>
              </div>
              <div className="location">
                <label htmlFor="location">Location</label>
                <input type={"text"} id="location" name="location"defaultValue={this.state.experience.location} onChange={this.handleChange}></input>
              </div>
              <div className="startDate">
                <label htmlFor="startDate">Start Date</label>
                <input type={"text"} id="startDate" name="startDate" defaultValue={this.state.experience.startDate} onChange={this.handleChange}></input>
              </div>
              <div className="endDate">
                <label htmlFor="endDate">End Date</label>
                <input type={"text"} id="endDate" name="endDate" defaultValue={this.state.experience.endDate} onChange={this.handleChange}></input>
              </div>
              <div className="description">
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" defaultValue={this.state.experience.description} onChange={this.handleChange}></textarea>
              </div>
              <div>
                <button className="add-new-button" type="submit">Edit</button>
              </div>
            </form>
          </div>   
      </div>
    );
  }
}

export default EditExperience;
