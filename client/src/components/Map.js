import React, {Component} from 'react';
import ReactMapGL from 'react-map-gl';
 
class Map extends Component {
 
  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8,
      mapboxApiAccessToken: "pk.eyJ1IjoidGFudmlyZ2VlayIsImEiOiJjazlmMDI0bGcwNGVzM2VwaHJweGthNGs2In0.S6ir8EVcuyuw9L-NeCWIFQ",
    }
  };
 
  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
      />
    );
  }
}
export default Map;