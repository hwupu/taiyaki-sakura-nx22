import React from 'react';

import config from './config.json';
import TaiyakiMapConfig from './types/TaiyakiMapConfig';
import TaiyakiMapController from './MapController';
import TaiyakiMapToolbar from './Map/Toolbar';
import TaiyakiMapPanel from './Map/Panel';

export default class TaiyakiMapView extends React.Component {
  state = {
    mapController: undefined,
  };

  componentDidMount() {
    /*
    fetch(config.url + 'info.json')
      .then(res => res.json())
      .then((data) => {
      const bounds = data.mipmaps[0].bounds;
      const options: TaiyakiMapConfig = {
        boundary: {
         minX: 512 * bounds.minX,
         minY: 512 * bounds.minZ,
         maxX: 512 * bounds.maxX,
         maxY: 512 * bounds.maxZ,
        },
        spawn: { x: data.spawn[0], y: data.spawn[1] },
        center: { x: config.center.x, y: config.center.y },
      };
      this.setState({
        mapController: new TaiyakiMapController(options),
      });
    });
     */
    // Manually set the boundary
    const options: TaiyakiMapConfig = {
      boundary: {
        minX: 512 * -11,
        minY: 512 * -11,
        maxX: 512 * 10,
        maxY: 512 * 10,
      },
      spawn: { x: -420, y: 600 * -1 },
      center: { x: config.center.x, y: config.center.y * -1 },
    };
    this.setState({
      mapController: TaiyakiMapController.getInstance(options),
    });
  }

  render() {
    return (
      <div className="relative">
        {this.state.mapController ? (
          <TaiyakiMapToolbar mapController={this.state.mapController} />
        ) : (
          <div>loading</div>
        )}
        <div role="application" id="taiyakiMapContainer" className="h-screen"></div>
      </div>
    );
  }
}
