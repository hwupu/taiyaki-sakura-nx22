import React, { FormEvent } from 'react';

import TaiyakiMapController from '../MapController';
import TaiyakiMapButton from './Button';

interface TaiyakiMapPanelConfig {
  mapController?: TaiyakiMapController;
}

export default class TaiyakiMapPanel extends React.Component<TaiyakiMapPanelConfig> {

  classWrapper = [
    'absolute',
    'top-20',
    'right-10',
    'z-10',
    'w-full',
    'max-w-xs',
  ].join(' ')

  classPanel = [
    'p-3',
    'rounded',
    'bg-opacity-75',
    'bg-yellow-400',
  ].join(' ')

  constructor(props: any) {
    super(props);

    this.upload = this.upload.bind(this);
  }

  upload(event: FormEvent) {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      geojson: { files: File[] };
    };
    const geojson = target.geojson.files[0];
    const reader = new FileReader();
    reader.readAsText(geojson);
    reader.onload = () => {
      this.props.mapController!.loadGeoJson(reader.result as string);
    }
  }

  render() {
    return (
      <div role="region" className={this.classWrapper}>
        <div className="py-2 space-x-2">
          <TaiyakiMapButton icon="fa-plus" label="Zoom in" />
          <TaiyakiMapButton icon="fa-plus" label="Zoom in" />
        </div>
        <div className={this.classPanel}>
          <form onSubmit={this.upload}>
            <label htmlFor="geojson">Choose GeoJSON file:</label>
            <input type="file" id="geojson" name="geojson" accept="application/json" />
            <button type="submit">Upload</button>
          </form>
        </div>
      </div>
    )
  }
}
