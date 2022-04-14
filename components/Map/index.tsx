import React from 'react';

import OpenMapController from './Controller';

export default class OpenMap extends React.Component {
  
  state = {
    mapController: undefined,
  };

  componentDidMount() {
    this.setState({
      mc: OpenMapController.getController(),
    }
    );
  }

  render() {
    return (
      <div id="openmap" className="h-screen"></div>
    );
  }
}
