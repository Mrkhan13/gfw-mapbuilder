import Map from 'esri/Map';
import MapView from 'esri/views/MapView';
import WebMap from 'esri/WebMap';
import Legend from 'esri/widgets/Legend';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import SketchViewModel from 'esri/widgets/Sketch/SketchViewModel';

import { RefObject } from 'react';
import store from '../store/index';

interface ZoomParams {
  zoomIn: boolean;
}

export class MapController {
  _map: Map | undefined;
  _mapview: MapView | undefined;
  _sketchVM: SketchViewModel | undefined;
  _previousSketchGraphic: any;

  constructor() {
    this._map = undefined;
    this._mapview = undefined;
    this._sketchVM = undefined;
    this._previousSketchGraphic = undefined;
  }

  initializeMap(domRef: RefObject<any>): void {
    const { appSettings } = store.getState();
    this._map = new WebMap({
      portalItem: {
        id: appSettings.webmap
      }
    });

    this._mapview = new MapView({
      map: this._map,
      container: domRef.current
    });

    const legend = new Legend({
      view: this._mapview
    });

    this._mapview.ui.add(legend, 'bottom-right');

    this._mapview
      .when(
        () => {
          console.log('mapview is loaded');
          store.dispatch({ type: 'MAP_READY', payload: true });

          this.initializeAndSetSketch();
        },
        (error: Error) => {
          console.log('error in initializeMap()', error);
          store.dispatch({ type: 'MAP_ERROR', payload: true });
        }
      )
      .catch((error: Error) => {
        console.log('error in initializeMap()', error);
        store.dispatch({ type: 'MAP_ERROR', payload: true });
      });
  }

  log(): void {
    console.log(this._map?.basemap);
  }

  zoomInOrOut({ zoomIn }: ZoomParams): void {
    if (this._mapview) {
      const zoomNum = zoomIn ? this._mapview.zoom + 1 : this._mapview.zoom - 1;

      this._mapview.goTo({
        target: this._mapview.center,
        zoom: zoomNum
      });
    }
  }

  initializeAndSetSketch(): void {
    const tempGL = new GraphicsLayer({
      id: 'sketchGraphics'
    });

    this._sketchVM = new SketchViewModel({
      layer: tempGL,
      view: this._mapview,
      polylineSymbol: {
        type: 'simple-line',
        color: 'red',
        width: 3
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this._sketchVM?.on('create', (event: any) => {
      if (event.state === 'complete') {
        this._previousSketchGraphic = event.graphic;

        event.graphic.symbol.outline.color = [115, 252, 253];
        event.graphic.symbol.color = [0, 0, 0, 0];
        this._mapview?.graphics.add(event.graphic);

        store.dispatch({ type: 'SELECT_ACTIVE_TAB', payload: 'analysis' });
        store.dispatch({ type: 'TOGGLE_TABVIEW_PANEL', payload: true });
      }
    });
  }

  createPolygonSketch = (): void => {
    this._mapview?.graphics.remove(this._previousSketchGraphic);
    this._sketchVM?.create('polygon', { mode: 'freehand' });
  };
}

export const mapController = new MapController();
// window.mapController = mapController;
