import React, { MouseEvent } from 'react';

import TaiyakiMapController from '../MapController';
import TaiyakiMapButton from './Button';

interface TaiyakiMapToolbarConfig {
  mapController: TaiyakiMapController;
}

export default class TaiyakiMapToolbar extends React.Component<TaiyakiMapToolbarConfig> {

  classes = [
    'absolute',
    'top-0',
    'left-0',
    'z-10',
    'w-full',
    'bg-opacity-75',
    'bg-yellow-400',
    'grid',
    'grid-cols-3',
    'items-center',
  ].join(' ')

  constructor(props: any) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.addPoint = this.addPoint.bind(this);
    this.toggleNightVision = this.toggleNightVision.bind(this);
    this.toggleMode = this.toggleMode.bind(this);
    this.save = this.save.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.print = this.print.bind(this);
  }

  componentDidMount () {
    this.props.mapController.enableMousePosition();
  }

  addPoint(event: MouseEvent) {
    this.props.mapController.addLandmark('test', [0, 0]);
  }

  toggleNightVision (event: MouseEvent) {
    const modeEnabled = this.props.mapController.isLightTileLayerEnabled;
    if (modeEnabled) {
      this.props.mapController.disableLightTileLayer();
    } else {
      this.props.mapController.enableLightTileLayer();
    }
  }

  toggleMode(event: MouseEvent) {
    const modeEnabled = this.props.mapController.isModifyEnabled;
    if (modeEnabled) {
      this.props.mapController.disableModify();
    } else {
      this.props.mapController.enableModify();
    }
  }

  save(event: MouseEvent) {
    this.props.mapController.writeFeature();
  }

  zoomIn(event: MouseEvent) {
    this.props.mapController.zoomIn();
  }

  zoomOut(event: MouseEvent) {
    this.props.mapController.zoomOut();
  }

  print(){
    console.dir(this.props.mapController!);
  }

  render() {
    return (
      <div role="toolbar" className={this.classes}>
        <div className="p-2 space-x-2">
          <TaiyakiMapButton icon="fa-plus" label="Zoom in" action={this.zoomIn} />
          <TaiyakiMapButton icon="fa-minus" label="Zoom out" action={this.zoomOut} />
          <TaiyakiMapButton icon="fa-map-pin" label="Add pin" action={this.addPoint} />
          <TaiyakiMapButton icon="fa-edit" label="Toggle edit mode" action={this.toggleMode} />
          <TaiyakiMapButton icon="fa-file-download" label="Download GeoJson" action={this.save} />
          <TaiyakiMapButton icon="fa-eye-slash" label="Enable night vision" action={this.toggleNightVision} />
          <TaiyakiMapButton icon="fa-print" label="Debug" action={this.print} />
        </div>
        <div id="taiyakiMousePosition" className="justify-self-center font-mono p-2 space-x-2" aria-label="Cursor coordinate indicator"></div>
        <div className="justify-self-end p-2 space-x-2">
        </div>
      </div>
    )
  }

}
