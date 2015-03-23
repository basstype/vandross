import React from "react";
import HueStore from "../../stores/hue_store"
import HueActions from '../../actions/hue_actions';

var Lights = React.createClass({
  getInitialState: function() {
    if(HueStore.chan){
      console.log("here");
      HueActions.getLights();
    }
    return HueStore.store.data;
  },

  componentDidMount: function() {
    HueStore.listener.addListener('change', this._onChange);
  },

  componentWillUnmount: function() {
    HueStore.listener.removeListener('change', this._onChange);
  },

  _onChange: function() {
    this.replaceState(HueStore.store.data);

    if(this.state.error){
      alert(this.state.error);
    }
  },

  renderLights: function(){
    let rows = [];

    for (var key in this.state.lights) {
      rows.push(<li key={key}>
        <div>
          <p>{this.state.lights[key].name}</p>
        </div>
      </li>);
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