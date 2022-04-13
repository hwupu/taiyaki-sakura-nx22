import 'ol/ol.css';

import config from './config.json';
import TaiyakiMapConfig from './types/TaiyakiMapConfig';

import Map from 'ol/Map';
import View from 'ol/View';

import Projection from 'ol/proj/Projection';
import TileGrid from 'ol/tilegrid/TileGrid';

import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { XYZ, Vector as VectorSource, TileDebug } from 'ol/source';

import GeoJSON from 'ol/format/GeoJSON';
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

import { defaults as defaultInteraction, PinchZoom, Modify, Select } from 'ol/interaction';
import { SelectEvent } from 'ol/interaction/Select';
import MousePosition from 'ol/control/MousePosition';

const _initExtent = function (option: TaiyakiMapConfig): number[] {
  return [option.boundary.minX, option.boundary.minY, option.boundary.maxX, option.boundary.maxY];
};

const _initProjection = function (extent: number[]): Projection {
  return new Projection({
    code: 'EPSG:3857',
    extent: extent,
  });
};

const _initTileGrid = function (extent: number[]): TileGrid {
  return new TileGrid({
    extent: extent,
    resolutions: [8, 4, 2, 1],
    origin: [0, 0],
    tileSize: [512, 512],
  });
};

const _initOverworld = function (projection: Projection, tileGrid: TileGrid): TileLayer<XYZ> {
  return new TileLayer({
    source: new XYZ({
      tileUrlFunction: (c) => {
        if (c[0] > 3) return '';
        return config.url + 'map/' + (3 - c[0]).toString() + '/r.' + c[1] + '.' + c[2] + '.png';
      },
      tileSize: [512, 512],
      wrapX: false,
      projection: projection,
      tileGrid: tileGrid,
      imageSmoothing: false,
    }),
  });
};

const _initOverworldLight = function (projection: Projection, tileGrid: TileGrid): TileLayer<XYZ> {
  return new TileLayer({
    source: new XYZ({
      tileUrlFunction: (c) => {
        if (c[0] > 3) return '';
        return config.url + 'light/' + (3 - c[0]).toString() + '/r.' + c[1] + '.' + c[2] + '.png';
      },
      tileSize: [512, 512],
      wrapX: false,
      projection: projection,
      tileGrid: tileGrid,
      imageSmoothing: false,
    }),
  });
};

const _initMousePosition = function () {
  return new MousePosition({
    target: config.mousePositionId,
    className: config.mousePositionClass,
    coordinateFormat: (c) => {
      if (c) {
        // The z axis is invered in Minecraft.
        return 'X: ' + Math.trunc(c[0]) + ', Z:' + (-1 * Math.trunc(c[1]) - 1);
      } else {
        return '';
      }
    },
  });
};

const _initStyle = function (): Style {
  return new Style({
    image: new CircleStyle({
      radius: 3,
      fill: new Fill({
        color: 'white',
      }),
      stroke: new Stroke({
        color: 'black',
        width: 1,
      }),
    }),
    text: new Text({
      font: '12px Arial',
      placement: 'line',
      offsetY: 15,
      fill: new Fill({
        color: 'white',
      }),
      stroke: new Stroke({
        color: 'black',
        width: 3,
      }),
    }),
  });
};

const _initLandmark = function (style: Style): VectorLayer<any> {
  return new VectorLayer({
    source: new VectorSource(),
    style: (feature) => {
      style.getText().setText(feature.get('name'));
      return style;
    },
    declutter: true,
  });
};

const _initModifyLandmark = function (vectorLayer: VectorLayer<any>): Modify {
  return new Modify({
    hitDetection: vectorLayer,
    source: vectorLayer.getSource(),
  });
};

const _initView = function (options: TaiyakiMapConfig, projection: Projection): View {
  return new View({
    center: [options.center.x, options.center.y],
    zoom: 6,
    maxZoom: 8,
    minZoom: 1,
    projection: projection,
  });
};

export default class TaiyakiMapController {
  private static instance: TaiyakiMapController;

  _map: Map;
  _view: View;
  _extent: number[];
  _projection: Projection;
  _tileGrid: TileGrid;
  _overworldTileLayer: TileLayer<any>;
  _overworldLightTileLayer: TileLayer<any>;
  _mousePosition: MousePosition | undefined;
  _labelStyle: Style;
  _landmarkVectorLayer: VectorLayer<any>;
  _modifyLandmark: Modify;

  isMousePositionEnabled: boolean;
  isLightTileLayerEnabled: boolean;
  isModifyEnabled: boolean;
  isZoomInDisabled: boolean;
  isZoomOutDisabled: boolean;

  selectedFeature: SelectEvent | undefined;

  private constructor(options: TaiyakiMapConfig) {
    this._extent = _initExtent(options);
    this._projection = _initProjection(this._extent);
    this._tileGrid = _initTileGrid(this._extent);
    this._overworldTileLayer = _initOverworld(this._projection, this._tileGrid);
    this._overworldLightTileLayer = _initOverworldLight(this._projection, this._tileGrid);
    this._labelStyle = _initStyle();
    this._landmarkVectorLayer = _initLandmark(this._labelStyle);
    this._modifyLandmark = _initModifyLandmark(this._landmarkVectorLayer);
    this._view = _initView(options, this._projection);

    this.isMousePositionEnabled = false;
    this.isLightTileLayerEnabled = false;
    this.isModifyEnabled = false;
    this.isZoomInDisabled = false;
    this.isZoomOutDisabled = false;

    this.selectedFeature = undefined;

    this._map = new Map({
      target: config.mapContainerId,
      controls: [],
      interactions: defaultInteraction({ mouseWheelZoom: false }).extend([new PinchZoom()]),
      layers: [this._overworldTileLayer, this._landmarkVectorLayer],
      view: this._view,
    });

    if (config.enableDebugTile) {
      this._map.addLayer(
        new TileLayer({
          source: new TileDebug({
            projection: this._projection,
            tileGrid: this._tileGrid,
          }),
        })
      );
    }

    if (config.enableSelection) {
      const select = new Select();
      this._map.addInteraction(select);
      select.on('select', (e) => {
        this.selectedFeature = e;
      });
    }

    console.log(this);
  }

  public static getInstance(options: TaiyakiMapConfig): TaiyakiMapController {
    if (!TaiyakiMapController.instance) {
      TaiyakiMapController.instance = new TaiyakiMapController(options);
    }
    return TaiyakiMapController.instance;
  }

  writeFeature() {
    const temp = new GeoJSON().writeFeatures(this._landmarkVectorLayer.getSource().getFeatures(), {
      decimals: 0,
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([temp], { type: 'text/json' }));
    a.download = 'test.json';
    a.click();
  }

  enableLightTileLayer() {
    this.isLightTileLayerEnabled = true;
    this._map.addLayer(this._overworldLightTileLayer);
  }

  disableLightTileLayer() {
    this.isLightTileLayerEnabled = false;
    this._map.removeLayer(this._overworldLightTileLayer);
  }

  enableMousePosition() {
    if (!this._mousePosition) {
      this._mousePosition = _initMousePosition();
    }
    this.isMousePositionEnabled = true;
    this._map.addControl(this._mousePosition);
  }

  disableMousePosition() {
    this.isMousePositionEnabled = false;
    this._map.removeControl(this._mousePosition!);
  }

  enableModify() {
    this.isModifyEnabled = true;
    this._map.addInteraction(this._modifyLandmark);
  }

  disableModify() {
    this.isModifyEnabled = false;
    this._map.removeInteraction(this._modifyLandmark);
  }

  loadGeoJson(geojson: string) {
    const vector = new VectorSource({
      format: new GeoJSON(),
      features: new GeoJSON().readFeatures(JSON.parse(geojson)),
    });
    this._landmarkVectorLayer.setSource(vector);
  }

  addLandmark(label: string, position: number[]) {
    const center = this._map.getView().getCenter();
    const mark = new Feature({
      geometry: new Point(center!),
      name: label,
    });
    this._landmarkVectorLayer.getSource().addFeature(mark);
  }

  private _zoom(level: number) {
    this._map.getView().animate({
      zoom: level,
      duration: 250,
    });
  }

  private _zoomStatusUpdate(level: number) {
    if (level >= this._view.getMaxZoom()) {
      this.isZoomInDisabled = true;
    } else {
      this.isZoomInDisabled = false;
    }
    if (level <= this._view.getMinZoom()) {
      this.isZoomOutDisabled = true;
    } else {
      this.isZoomOutDisabled = false;
    }
  }

  zoomIn() {
    const level = this._view.getZoom()! + 1;
    if (level < this._view.getMaxZoom()) {
      this._zoom(level);
    }
    this._zoomStatusUpdate(level + 1);
  }

  zoomOut() {
    const level = this._view.getZoom()! - 1;
    if (level > this._view.getMinZoom()) {
      this._zoom(level);
    }
    this._zoomStatusUpdate(level - 1);
  }
}
