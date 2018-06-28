import React from "react";
import "./Jumbotron.css"

const Jumbotron = props => (
    <div className="jumbotron jumbotron-fluid">
        <div className="container">            
        <h1 className="display-4 text-center">New York Times Article Search</h1>
        <p className="lead text-center">Search for and annotate articles of interest !</p>
        </div>
    </div>
);

export default Jumbotron;
