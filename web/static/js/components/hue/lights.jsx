import React from "react";
import HueStore from "../../stores/hue_store"

var Lights = React.createClass({
  getInitialState: function() {
    return HueStore.store.data;
  },

  componentDidMount: function() {
    HueStore.listener.addListener('change', this._onChange);
  },

  componentWillUnmount: function() {
    HueStore.listener.removeListener('change', this._onChange);
  },

  _onChange: function() {

  },

  renderLights: function(){
    var rows = [];
    for (var i=0; i < 8; i++) {
        rows.push(<li key={i}>{i}</li>);
    }

    return <ul>{rows}</ul>
  },


  render: function () {
    return (
      <div>
        Lights
        {this.renderLights()}
      </div>
    );
  }
});

export default Lights