import 'ol/ol.css';

import Map from 'ol/Map';
import View from 'ol/View';
import Projection from 'ol/proj/Projection';
import TileGrid from 'ol/tilegrid/TileGrid';

import { Tile as TileLayer } from 'ol/layer';
import { XYZ } from 'ol/source';

export default class OpenMapController {
  private static instance: OpenMapController;

  private static url = "https://sakura-satellite.phwu.work/data/";
  private static extent = [512 * -11, 512 * -11, 512 * 10, 512 * 10];

  private static projection = new Projection({
    code: 'EPSG:3857',
    extent: OpenMapController.extent,
  });

  private static grid = new TileGrid({
    extent: OpenMapController.extent,
    resolutions: [8, 4, 2, 1],
    origin: [0, 0],
    tileSize: [512, 512],
  });

  private static view = new View({
    center: [-420, -600],
    zoom: 6,
    maxZoom: 8,
    minZoom: 1,
    projection: OpenMapController.projection,
  });

  private static overworldCurrentLayer = new TileLayer({
    source: new XYZ({
      tileUrlFunction: (c) => {
        if (c[0] > 3) return '';
        return OpenMapController.url + 'map/' + (3 - c[0]).toString() + '/r.' + c[1] + '.' + c[2] + '.png';
      },
      tileSize: [512, 512],
      wrapX: false,
      projection: OpenMapController.projection,
      tileGrid: OpenMapController.grid,
      imageSmoothing: false,
    }),
  });

  private constructor(
    private _map = new Map({
      target: 'openmap',
      view: OpenMapController.view,
      layers: [OpenMapController.overworldCurrentLayer],
    })
  ) {}

  public static getController(): OpenMapController {
    if (!OpenMapController.instance) {
      OpenMapController.instance = new OpenMapController();
    }
    return OpenMapController.instance;
  }

  get map(): Map {
    return this._map;
  }
}
