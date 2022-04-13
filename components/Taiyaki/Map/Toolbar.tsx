import React, { MouseEvent } from 'react';

import TaiyakiMapController from '../MapController';
import TaiyakiMapButton from './Button';

interface TaiyakiMapToolbarConfig {
  mapController: TaiyakiMapController;
}

export default class TaiyakiMapToolbar extends React.Component<TaiyakiMapToolbarConfig> {
  classes = [
    'absolute',
    'bottom-0',
    'left-0',
    'z-10',
    'w-full',
    'bg-opacity-75',
    'bg-yellow-400',
    'flex',
    'gap-2',
    'p-2',
  ].join(' ');

  constructor(props: any) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.addPoint = this.addPoint.bind(this);
    this.toggleNightVision = this.toggleNightVision.bind(this);
    this.toggleBiomeVision = this.toggleBiomeVision.bind(this);
    this.toggleMode = this.toggleMode.bind(this);
    this.save = this.save.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.print = this.print.bind(this);
  }

  componentDidMount() {
    this.props.mapController.enableMousePosition();
  }

  addPoint(event: MouseEvent) {
    this.props.mapController.addLandmark('test', [0, 0]);
  }

  toggleNightVision(event: MouseEvent) {
    const modeEnabled = this.props.mapController.isLightTileLayerEnabled;
    if (modeEnabled) {
      this.props.mapController.disableLightTileLayer();
    } else {
      this.props.mapController.enableLightTileLayer();
    }
  }

  toggleBiomeVision(event: MouseEvent) {
    const modeEnabled = this.props.mapController.isBiomeTileLayerEnabled;
    if (modeEnabled) {
      this.props.mapController.disableBiomeTileLayer();
    } else {
      this.props.mapController.enableBiomeTileLayer();
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

  print() {
    console.dir(this.props.mapController!);
  }

  render() {
    return (
      <div role="toolbar" className={this.classes}>
        <TaiyakiMapButton icon="fa-plus" label="Zoom in" action={this.zoomIn} />
        <TaiyakiMapButton icon="fa-minus" label="Zoom out" action={this.zoomOut} />
        <TaiyakiMapButton icon="fa-map-pin" label="Add pin" action={this.addPoint} disabled />
        <TaiyakiMapButton
          icon="fa-edit"
          label="Toggle edit mode"
          action={this.toggleMode}
          disabled
        />
        <TaiyakiMapButton
          icon="fa-file-download"
          label="Download GeoJson"
          action={this.save}
          disabled
        />
        <TaiyakiMapButton
          icon="fa-eye-slash"
          label="Enable night vision"
          action={this.toggleNightVision}
        />
        <TaiyakiMapButton
          icon="fa-eye-slash"
          label="Enable biome vision"
          action={this.toggleBiomeVision}
        />
        <TaiyakiMapButton icon="fa-print" label="Debug" action={this.print} disabled />
        <div
          id="taiyakiMousePosition"
          className="font-mono"
          aria-label="Cursor coordinate indicator"
        ></div>
      </div>
    );
  }
}
