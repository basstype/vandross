import React from "react";
import Lights from "./hue/lights";

var Dashboard = React.createClass({
  render: function () {
    return (
      <div>
        <Lights/>
      </div>
    );
  }
});

export default Dashboard