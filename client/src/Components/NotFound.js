import React from "react";
import { Link  } from "react-router-dom";
import found from "../img/notfound.png";
import '../css/notfound.css';
class NotFound extends React.Component{
    render(){
        return(
            <div>
                <img src={found} alt="404 page" />
                <Link to = "/"><button className="foundbtn">Back Home</button></Link>
            </div>
        );
    }
}
export default NotFound;