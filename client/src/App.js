import React, { Component, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home, Experiences, Skills, Navbar, Login } from "./Components";
import NewExperience from "./Components/NewExperience";
import EditExperience from "./Components/EditExperience";
import  EditInfo from "./Components/EditInfo";
import NotFound from "./Components/NotFound";
import "./App.css";


export class Paths extends Component {
  render() {
    return (
      <div>
        <Navbar login={this.props.login} />
        <div className="main">{this.props.mainComponent}</div>
        {/* <footer>
          <div className="footer">
          Copyrights © 2022 By Codi Team
          </div>
        </footer>  */}
      </div>
    );
  }
};

function App() {
  const [id, setId] = useState('')
  const [token, setToken] = useState(false)

  const handleLogin = (login) => {
    setToken(login);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" index element={<Login login={handleLogin} />} />
        <Route path="/" element={<Paths login={handleLogin} mainComponent={<Home />} />} />
        <Route path="/edit" element={<Paths login={handleLogin} mainComponent={<EditInfo />} />} />
        <Route path="/skills" element={<Paths login={handleLogin} mainComponent={<Skills />} />} />
        <Route path="/experiences" element={<Paths login={handleLogin} mainComponent={<Experiences fromParent={ (param) =>{setId(param)}}/>} />}/>
        <Route path="/new-experience" element={<Paths login={handleLogin} mainComponent={<NewExperience />} />} />
        <Route path="/edit-experience/:id" element={<Paths login={handleLogin} mainComponent={<EditExperience  idProp = {id}/>} />} />
        <Route path="*" element={<Paths mainComponent={<NotFound />}/>}/>
      </Routes>
    </BrowserRouter>
  );

  // if(token){
  //   return (
  //     <BrowserRouter>
  //       <Routes>
  //         <Route path="/login" element={<Navigate replace to="/" />} />
  //         <Route path="/" element={<Paths login={handleLogin} mainComponent={<Home />} />} />
  //         <Route path="/edit" element={<Paths login={handleLogin} mainComponent={<EditInfo />} />} />
  //         <Route path="/skills" element={<Paths login={handleLogin} mainComponent={<Skills />} />} />
  //         <Route path="/experiences" element={<Paths login={handleLogin} mainComponent={<Experiences fromParent={ (param) =>{setId(param)}}/>} />}/>
  //         <Route path="/new-experience" element={<Paths login={handleLogin} mainComponent={<NewExperience />} />} />
  //         <Route path="/edit-experience/:id" element={<Paths login={handleLogin} mainComponent={<EditExperience  idProp = {id}/>} />} />
  //       </Routes>
  //     </BrowserRouter>
  //   );
  // }
  // else{
  //   return(
  //     <BrowserRouter>
  //       <Routes>
  //         <Route path="/login" element={<Login login={handleLogin} />} />
  //         <Route path="*" element={<Navigate replace to="/login" />} />
  //       </Routes>
  //     </BrowserRouter>
  //   )
    
  // }
  
}

export default App;
