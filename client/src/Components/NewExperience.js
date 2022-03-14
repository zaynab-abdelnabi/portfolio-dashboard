import axios from "axios";
import React, { Component } from "react";
import '../css/NewExperience.css';

class NewExperience extends Component {
  constructor(props){
    super(props);
    this.state={
      addNewMode: false,
      jobTitle: '',
      companyName: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      experience_id: '',
    }
  }

  handleChange = e =>{
    this.setState({
      [e.target.name] : e.target.value,
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
      description: this.state.description,
    }

    if(!this.state.experience_id){
      axios.post('/experiences', inpt)
      .then(res =>{
        alert('Adding Succeeded');
        console.log(res);
        console.log(res.data);
        window.location.reload();
      })
      .catch(err=>{
        alert('Adding Failed');
        console.log(err);
      })
    }
  }

  render() {
    return (
      <div>
          <div className="experiences">
            <div className="experiences-header">
              <div className="experiences-header-text">
                <div className="experiences-header-text-title">
                  <h1>New Experience</h1>
                </div>
              </div>
            </div>
            <form className="experiences-form" onSubmit={this.handleSubmit }>
              <div className="jobTitle">
                <label htmlFor="jobTitle">Job Title</label>
                <input type={"text"} id="jobTitle" name="jobTitle" onChange={this.handleChange} required></input>
              </div>
              <div className="companyName">
                <label htmlFor="companyName">Company Name</label>
                <input type={"text"} id="companyName" name="companyName" onChange={this.handleChange} required></input>
              </div>
              <div className="location">
                <label htmlFor="location">Location</label>
                <input type={"text"} id="location" name="location" onChange={this.handleChange} required></input>
              </div>
              <div className="startDate">
                <label htmlFor="startDate">Start Date</label>
                <input type={"date"} id="startDate" name="startDate" onChange={this.handleChange} required></input>
              </div>
              <div className="endDate">
                <label htmlFor="endDate">End Date</label>
                <input type={"date"} id="endDate" name="endDate" onChange={this.handleChange} required></input>
              </div>
              <div className="description">
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" onChange={this.handleChange} required></textarea>
              </div>
              <div>
                <button className="add-new-button" type="submit" >Add</button>
              </div>
            </form>
          </div>   
      </div>
    );
  }
}

export default NewExperience;
