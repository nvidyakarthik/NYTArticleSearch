import React from "react";

export const FormBtn = props => (
  <button style={{ float: "right", marginBottom: 10 }} className="btn btn-success" onClick={()=>props.saveFunc(props.title,props.weburl,props.date)}>
    {props.children}
  </button>
);