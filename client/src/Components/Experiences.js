import React, { Component } from "react";
import '../css/Experiences.css';
import { Link } from "react-router-dom";
import { ImPlus } from "react-icons/im";
import { AiOutlineEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import axios from 'axios';

class Experiences extends Component {
  constructor(props){
    super(props);
    this.state = {
      experiences: [],
      experience_id: '',
    };
  }

  componentDidMount(){
    this.getExperiences();
  }

  getExperiences = () =>{
    axios.get('/experiences')
    .then(res=>{
      this.setState({
        experiences: res.data.response
      })
      .catch(err=>{
        console.log(err);
      })
    })
  }

  deleteExp = id =>{    
    axios.delete(`/experiences/${id}`)
    .then(res =>{
      this.getExperiences();  
    })
    .catch(err=>{
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
                  <h1>Experience</h1>
                </div>
              </div>
            </div>
            <Link to="/new-experience">
              <button className="btn add-new-btn">
                      <ImPlus /> New Experience
              </button>
            </Link>
            <div className="experiences-table">
              <table>
                <tr className="experiences-table-header">
                  <th className="experiences-table-header-item">Job Title</th>
                  <th className="experiences-table-header-item">Description</th>
                  <th className="experiences-table-header-item">Company Name</th>
                  <th className="experiences-table-header-item">Start Date</th>
                  <th className="experiences-table-header-item">End Date</th>
                  <th className="experiences-table-header-item">Location</th>
                  <th className="experiences-table-header-item"></th>
                </tr>
                {this.state.experiences.map(experience =>{
                  return (<tr className="experiences-table-content-row" key={experience.id}>
                  <td className="experiences-table-content-row-item">{experience.jobTitle}</td>
                  <td className="experiences-table-content-row-item">{experience.description}</td>
                  <td className="experiences-table-content-row-item">{experience.companyName}</td>
                  <td className="experiences-table-content-row-item">{experience.startDate}</td>
                  <td className="experiences-table-content-row-item">{experience.endDate}</td>
                  <td className="experiences-table-content-row-item">{experience.location}</td>
                  <td className="btns experiences-table-content-row-item">
                    <Link to={`/edit-experience/${experience._id}`} idParam={this.props.fromParent(experience._id)} >
                      <button className="btn edit-btn" >
                        <AiOutlineEdit /> Edit 
                      </button>
                    </Link>
                    <button className="btn delete-btn" onClick={() => {this.deleteExp(experience._id);}} type={"button"}>
                      <BiTrash />
                      Delete
                    </button>
                  </td>
                </tr>)
                })}
              </table>
            </div>
          </div>
               
      </div>
    );
  }
}

export default Experiences;
