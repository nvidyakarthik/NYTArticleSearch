import React from "react";

const Jumbotron = ({ children }) => (
  <div
    style={{ paddingTop: 120, textAlign: "center" }}
    className="jumbotron"
  >
    {children}
  </div>
);

export default Jumbotron;
