import React from "react";

const Card = props => (
    
        <div className="card">
            <div className="card-header">
                <i className="fas fa-table"></i> {props.title}
            </div>
            <div className="card-body">{props.children}</div>
        </div>
      
);

export default Card;
