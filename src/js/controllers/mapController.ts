import Map from 'esri/Map';
import Layer from 'esri/layers/Layer';
import MapView from 'esri/views/MapView';
import WebMap from 'esri/WebMap';
import Graphic from 'esri/Graphic';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import SketchViewModel from 'esri/widgets/Sketch/SketchViewModel';
import DistanceMeasurement2D from 'esri/widgets/DistanceMeasurement2D';
import CoordinateConversion from 'esri/widgets/CoordinateConversion';
import AreaMeasurement2D from 'esri/widgets/AreaMeasurement2D';
import Polygon from 'esri/geometry/Polygon';
import Search from 'esri/widgets/Search';
import Point from 'esri/geometry/Point';
import PrintTask from 'esri/tasks/PrintTask';
import PrintTemplate from 'esri/tasks/support/PrintTemplate';
import PrintParameters from 'esri/tasks/support/PrintParameters';
import Basemap from 'esri/Basemap';
import Sublayer from 'esri/layers/support/Sublayer';
import RasterFunction from 'esri/layers/support/RasterFunction';
import FeatureLayer from 'esri/layers/FeatureLayer';
import { debounce, map } from 'lodash-es';

import { RefObject } from 'react';
import { densityEnabledLayers } from '../../../configs/layer-config';
import store from '../store/index';
import { LayerFactory } from 'js/helpers/LayerFactory';
import { setLayerSearchSource } from 'js/helpers/mapController/searchSources';
import { getSortedLayers } from 'js/helpers/mapController/layerSorting';
import { addPointGraphic } from 'js/helpers/MapGraphics';
import { once } from 'esri/core/watchUtils';
import {
  allAvailableLayers,
  mapError,
  isMapReady,
  setActiveFeatureIndex,
  setActiveFeatures,
  changeMapScale,
  changeMapCenterCoordinates,
  setLayersLoading
} from 'js/store/mapview/actions';

import { setSelectedBasemap } from 'js/store/mapview/actions';
import {
  renderModal,
  selectActiveTab,
  setMeasureResults,
  setLanguage,
  setRenderGFWDropdown,
  setSelectedSearchWidgetLayer
} from 'js/store/appState/actions';
import {
  LayerProps,
  LayerFeatureResult,
  FeatureResult
} from 'js/store/mapview/types';
import { OptionType } from 'js/interfaces/measureWidget';
import { queryLayersForFeatures } from 'js/helpers/dataPanel/DataPanel';
import { setNewGraphic } from 'js/helpers/MapGraphics';

import { VIIRSLayerIDs, MODISLayerIDs } from 'configs/modis-viirs';
import { allowedLayers } from '../../../configs/layer-config';
import {
  parseURLandApplyChanges,
  getLayerInfoFromURL,
  LayerInfo
} from 'js/helpers/shareFunctionality';
import {
  determineLayerOpacity,
  determineLayerVisibility,
  extractWebmapLayerObjects
} from 'js/helpers/mapController/miscLayerHelpers';
import { fetchLegendInfo } from 'js/helpers/legendInfo';

interface URLCoordinates {
  zoom: number;
  latitude: string;
  longitude: string;
}

interface ZoomParams {
  zoomIn: boolean;
}

export class MapController {
  _map: Map | undefined;
  _mapview: MapView;
  _sketchVM: SketchViewModel | undefined;
  _previousSketchGraphic: any;
  _mouseClickEventListener: EventListener | any;
  _pointerMoveEventListener: EventListener | any;
  _printTask: PrintTask | undefined;
  _selectedWidget: DistanceMeasurement2D | AreaMeasurement2D | undefined;
  _sketchVMGraphicsLayer: GraphicsLayer | undefined;
  _domRef: RefObject<any>;
  _imageryOpacity: number;

  constructor() {
    this._map = undefined;
    this._sketchVM = undefined;
    this._previousSketchGraphic = undefined;
    this._printTask = undefined;
    this._selectedWidget = undefined;
    this._sketchVMGraphicsLayer = undefined;
  }

  initializeMap(domRef: RefObject<any>): void {
    this._domRef = domRef;
    const { appSettings, appState } = store.getState();

    const webmapID =
      appState.selectedLanguage === appSettings.language
        ? appSettings.webmap
        : appSettings.alternativeWebmap;

    // this._map = new WebMap({
    //   portalItem: {
    //     id: webmapID
    //   }
    // });

    // http://gis-forest-atlas.wri.org/arcgis/rest/services/CMR/CMR_Online_En/MapServer

    this._map = new WebMap({
      portalItem: {
        // id: webmapID
        // id: 'd8a7fd2ea0424af6b2ccf903b43277b8'
        id: 'a81c9f897c7041d59f1076687d2bde16'
      }
    });

    /** TODO layers to extract
     * layer w/full metadata - https://blueraster.maps.arcgis.com/home/item.html?id=0a8c80dc2ab745c1ab28bbcdbc106e60
     *  - https://services.arcgis.com/EDxZDh4HqQ1a9KvA/arcgis/rest/services/Layer_with_description_and_summary/FeatureServer/0
     *  - https://gis-gfw.wri.org/arcgis/rest/services/country_data/africa/MapServer/1
     *
     */

    // (this._map as any).load();

    this._mapview = new MapView({
      map: this._map,
      container: domRef.current
    });

    //if we have init extent, use it.
    if (
      appSettings.initialExtent &&
      appSettings.initialExtent.hasOwnProperty('x') &&
      appSettings.initialExtent.hasOwnProperty('y') &&
      appSettings.initialExtent.hasOwnProperty('z')
    ) {
      //@ts-ignore
      this._mapview.center = [
        appSettings.initialExtent['x'],
        appSettings.initialExtent['y']
      ];
      this._mapview.zoom = appSettings.initialExtent['z'];
    }

    this._mapview.ui.remove('zoom');
    this._mapview.ui.remove('attribution');

    this.setPageTitle(
      appState.selectedLanguage,
      appSettings.language,
      appSettings.title,
      appSettings.alternativeLanguageTitle
    );

    function syncExtent(ext: __esri.Extent, mapview: MapView): any {
      const { latitude, longitude } = ext.center;
      store.dispatch(changeMapCenterCoordinates({ latitude, longitude }));
      store.dispatch(changeMapScale(mapview.scale));
    }

    const throtthledUpdater = debounce(syncExtent, 1500, { trailing: true });

    this._mapview
      .when(
        async () => {
          store.dispatch(isMapReady(true));
          //default scale for map
          store.dispatch(changeMapScale(this._mapview.scale));
          const { latitude, longitude } = this._mapview.center;
          store.dispatch(changeMapCenterCoordinates({ latitude, longitude }));
          this._mapview.watch('extent', newExtent =>
            throtthledUpdater(newExtent, this._mapview)
          );
          this._mapview.on('click', event => {
            const { renderGFWDropdown } = store.getState().appState;

            if (renderGFWDropdown) {
              store.dispatch(setRenderGFWDropdown(false));
            }

            //TODO: We need a better loading handling, probably a spinner!
            //clean active indexes for data tab and activeFeatures
            store.dispatch(setActiveFeatures([]));
            store.dispatch(setActiveFeatureIndex([0, 0]));
            store.dispatch(selectActiveTab('data'));
            queryLayersForFeatures(this._mapview, this._map, event);
          });

          //In case of sharing functionality, check for URL containing layer visibility and opacity information
          const layerInfosFromURL = getLayerInfoFromURL();

          //Sync the incoming state from URL hash with webmap layers that have been just loaded in the map
          if (layerInfosFromURL.length) {
            this.syncWebmapLayersWithURL(layerInfosFromURL);
          }

          //Add layers that are already on the map (webmap layers) to redux array
          const mapLayerObjects: LayerProps[] = await extractWebmapLayerObjects(
            this._map
          );
          store.dispatch(allAvailableLayers(mapLayerObjects));

          //Fetching all other (non webmap) layer information from resources file AND GFW Api for those that are deemed as 'remoteDataLayer' in the config
          const remoteAndServiceLayersObjects = await this.getRemoteAndServiceLayers();

          //Remove those layers that we do not support
          const allowedRemoteLayersObjects = remoteAndServiceLayersObjects.filter(
            (layerObject: any) => {
              const layerType = layerObject.dataLayer
                ? layerObject.layer.type
                : layerObject.type;
              return allowedLayers.includes(layerType);
            }
          );

          const remoteLayerObjects = [];
          for (const remoteLayerObject of allowedRemoteLayersObjects) {
            if (!remoteLayerObject) continue; //remoteLayerObject may be undefined if we failed to retrieve layer data from api for some reason

            //Depending if layer is from GFW API or Resource (config file) construct object appropriately
            const newRemoteLayerObject = {
              opacity: determineLayerOpacity(
                remoteLayerObject,
                layerInfosFromURL
              ),
              visible: determineLayerVisibility(
                remoteLayerObject,
                layerInfosFromURL
              )
            } as LayerProps;

            if (remoteLayerObject.dataLayer) {
              //dealing with GFW API layers
              newRemoteLayerObject.popup = remoteLayerObject.layer.popup;
              newRemoteLayerObject.sublabel = remoteLayerObject.layer.sublabel;
              newRemoteLayerObject.id = remoteLayerObject.dataLayer.id;
              newRemoteLayerObject.title =
                remoteLayerObject.layer.label[appState.selectedLanguage];
              newRemoteLayerObject.group = remoteLayerObject.dataLayer.groupId;
              newRemoteLayerObject.url = remoteLayerObject.layer.url;
              newRemoteLayerObject.type = remoteLayerObject.layer.type;
              newRemoteLayerObject.origin = 'remote';
              newRemoteLayerObject.label = remoteLayerObject.layer.label;
              newRemoteLayerObject.metadata = remoteLayerObject.layer.metadata;
              newRemoteLayerObject.metadata.colormap =
                remoteLayerObject.layer.colormap;
              newRemoteLayerObject.metadata.inputRange =
                remoteLayerObject.layer.inputRange;
              newRemoteLayerObject.metadata.outputRange =
                remoteLayerObject.layer.outputRange;
              newRemoteLayerObject.parentID = undefined;
            } else {
              if (
                remoteLayerObject.versions &&
                remoteLayerObject.versions[0].url
              ) {
                remoteLayerObject.layerIds =
                  remoteLayerObject.versions[0].layerIds;
                remoteLayerObject.url = remoteLayerObject.versions[0].url;
                remoteLayerObject.versionIndex = 0;
              }
              //TODO: This fetches legend info from mapservice, but not all layers in the config may be that. we need to figure out other types too
              const legendInfoObject = await this.retrieveLegendInfo(
                remoteLayerObject
              );
              newRemoteLayerObject.legendInfo = legendInfoObject;
              newRemoteLayerObject.id = remoteLayerObject.id;
              newRemoteLayerObject.title = remoteLayerObject.label[
                appState.selectedLanguage
              ]
                ? remoteLayerObject.label[appState.selectedLanguage]
                : 'Untitled Layer';
              newRemoteLayerObject.group = remoteLayerObject.groupId;
              newRemoteLayerObject.url = remoteLayerObject.url;
              newRemoteLayerObject.type = remoteLayerObject.type;
              newRemoteLayerObject.origin = 'service';
              newRemoteLayerObject.technicalName =
                remoteLayerObject.technicalName;

              newRemoteLayerObject.layerIds = remoteLayerObject.layerIds;
              newRemoteLayerObject.label = remoteLayerObject.label;
              newRemoteLayerObject.parentID = undefined;
              newRemoteLayerObject.filterLabel = remoteLayerObject.filterLabel;
              newRemoteLayerObject.filterField = remoteLayerObject.filterField;
              newRemoteLayerObject.versions = remoteLayerObject.versions;
              newRemoteLayerObject.versionIndex =
                remoteLayerObject.versionIndex;
              newRemoteLayerObject.versionHeaderText =
                remoteLayerObject.versionHeaderText;
            }
            remoteLayerObjects.push(newRemoteLayerObject);
          }
          const allLayerObjects = [...mapLayerObjects, ...remoteLayerObjects];

          parseURLandApplyChanges();
          store.dispatch(allAvailableLayers(allLayerObjects));
          const esriRemoteLayers = remoteLayerObjects
            .map(layerObject => {
              return LayerFactory(this._mapview, layerObject);
            })
            .filter(esriLayer => esriLayer); //get rid of failed layer creation attempts

          //Get VIIRS and MODIS layers
          const viirsLayers = this.initializeAndSetVIIRSLayers();
          const modisLayers = this.initializeAndSetMODISLayers();

          const allLayers = [
            ...viirsLayers,
            ...modisLayers,
            ...esriRemoteLayers
          ];

          //If we have report active, we need to know when our feature layer has loaded
          const report = new URL(window.location.href).searchParams.get(
            'report'
          );
          if (report && report === 'true') {
            const layerID = new URL(window.location.href).searchParams.get(
              'acLayer'
            );
            if (!layerID) return;
            //@ts-ignore
            const combinedLayers = [...allLayers, ...this._map.layers.items];
            const activeLayer = combinedLayers.find(l => l.id === layerID);
            if (activeLayer.loaded === true) {
              store.dispatch(setLayersLoading(false));
            } else {
              once(activeLayer, 'loaded', () => {
                store.dispatch(setLayersLoading(false));
              });
            }
          } else {
            //no report meaning we just want to know when the laayers are loaded progressively so we keep updating legend component. There is likely a better way to handle this.
            //@ts-ignore
            const combinedLayers = [...allLayers, ...this._map.layers.items];

            combinedLayers.forEach(l => {
              if (l.loaded === true) {
                store.dispatch(setLayersLoading(false));
              } else {
                once(l, 'loaded', () => {
                  store.dispatch(setLayersLoading(false));
                });
              }
            });
          }

          this._map?.addMany(allLayers);

          //Retrieve sorted layer array
          const mapLayerIDs = getSortedLayers(
            appSettings.layerPanel,
            allLayerObjects,
            this._map
          );

          //Reorder layers on the map!
          this._map?.layers.forEach((layer: any) => {
            const layerIndex = mapLayerIDs!.findIndex(i => i === layer.id);
            if (layerIndex !== -1) {
              this._map?.reorder(layer, layerIndex);
            }
          });

          this.addExtraLayers();
          this.initializeAndSetSketch();
        },
        (error: Error) => {
          console.log('error in re-initializeMap()', error);
          store.dispatch(mapError(true));
        }
      )
      .catch((error: Error) => {
        console.log('error in initializeMap()', error);
        store.dispatch(mapError(true));
      });
  }

  setPageTitle(
    currentLanguage: string,
    defaultLanguage: string,
    primaryTitle: string,
    secondaryTitle: string
  ): void {
    if (currentLanguage === defaultLanguage) {
      window.document.title = primaryTitle;
    } else {
      window.document.title = secondaryTitle;
    }
  }

  getRemoteAndServiceLayers(): Promise<any> {
    const { appSettings } = store.getState();
    const { layerPanel } = appSettings;
    const detailedLayers: any = [];
    const remoteDataLayers: any = [];

    const layers = Object.keys(layerPanel)
      .filter(groupName => {
        return groupName !== 'GROUP_BASEMAP' && groupName !== 'extraLayers';
      })
      .reduce((list, groupName, groupIndex) => {
        let orderedGroups;
        if (layerPanel[groupName]?.groupType === 'nested') {
          let allNestedLayers: any[] = [];
          layerPanel[groupName].layers.forEach((layerG: any) => {
            allNestedLayers = allNestedLayers.concat(layerG.nestedLayers);
          });
          orderedGroups = allNestedLayers.map((layer: any) => {
            return { groupId: groupName, ...layer };
          });
        } else {
          orderedGroups = layerPanel[groupName].layers.map((layer: any) => {
            return { groupId: groupName, ...layer };
          });
        }
        return list.concat(orderedGroups);
      }, []);

    const configLayerFilters = {
      VIIRS_ACTIVE_FIRES: 'viirsFires',
      MODIS_ACTIVE_FIRES: 'modisFires',
      LAND_COVER: 'landCover',
      AG_BIOMASS: 'aboveGroundBiomass',
      IFL: 'intactForests',
      PRIMARY_FORESTS: 'primaryForests',
      FORMA_ALERTS: 'forma',
      GLOB_MANGROVE: 'mangroves',
      IMAZON_SAD: 'sadAlerts',
      GLAD_ALERTS: 'gladAlerts',
      TERRA_I_ALERTS: 'terraIAlerts',
      RECENT_IMAGERY: 'recentImagery'
    };
    const configLayerIDs = Object.keys(configLayerFilters);

    function checkLayerFilterConfig(l: any): boolean {
      const checkLayer = configLayerIDs.includes(l.id);
      if (checkLayer) {
        //Check for settings on that layer
        const settingID = configLayerFilters[l.id];
        //If no setting exist for the layer, we default to showing the layer
        const settingValue = appSettings.hasOwnProperty(settingID)
          ? appSettings[settingID]
          : true;
        return settingValue;
      } else {
        return true;
      }
    }

    layers
      .filter((l: any) => checkLayerFilterConfig(l))
      .forEach((layer: any): void => {
        if (layer.type === 'remoteDataLayer') {
          remoteDataLayers.push({
            order: layer.order,
            layerGroupId: layer.groupId,
            dataLayer: layer
          });
        } else {
          detailedLayers.push(layer);
        }
      });

    const remoteDataLayerRequests = remoteDataLayers.map((item: any) => {
      return fetch(
        `https://production-api.globalforestwatch.org/v1/layer/${item?.dataLayer?.uuid}`
      )
        .then(response => response.json())
        .then(json => json.data)
        .then(layer =>
          fetch(layer.attributes.layerConfig.metadata)
            .then(response => response.json())
            .then(metadata => {
              const attributes = layer.attributes;
              const itemGroup = item.group;
              item.layer = layer.attributes.layerConfig;

              item.group = itemGroup;
              item.layer.metadata = {
                metadata,
                legendConfig: attributes.legendConfig
              };
              return item;
            })
        )
        .catch(error => console.error(error));
    });
    detailedLayers.forEach((detailedLayer: object) => {
      remoteDataLayerRequests.push(detailedLayer);
    });
    return Promise.all(remoteDataLayerRequests);
  }

  async retrieveLegendInfo(
    layerObject: LayerProps
  ): Promise<any[] | undefined> {
    const legendInfoObject =
      layerObject.type !== 'webtiled'
        ? await fetchLegendInfo(layerObject.url)
        : undefined;
    const layerLegendInfo =
      legendInfoObject &&
      !legendInfoObject.error &&
      legendInfoObject?.layers.filter((l: any) =>
        layerObject.layerIds?.includes(l.layerId)
      );
    return layerLegendInfo;
  }

  changeLanguage(lang: string): void {
    if (!this._map) return;
    const { mapviewState, appSettings, appState } = store.getState();
    const {
      language,
      webmap,
      alternativeWebmap
    } = store.getState().appSettings;

    this.setPageTitle(
      lang,
      appSettings.language,
      appSettings.title,
      appSettings.alternativeLanguageTitle
    );

    const newWebMapId = lang === language ? webmap : alternativeWebmap;
    const nonWebmapLayers = mapviewState.allAvailableLayers.filter(
      layer => layer.origin !== 'webmap'
    );
    const esriNonWebmapLayers = nonWebmapLayers.map((l: LayerProps) => {
      const layerOnMap = this._map?.findLayerById(l.id);
      return layerOnMap;
    });

    this._map.removeAll();
    this._map = undefined;
    this._map = new WebMap({
      portalItem: { id: newWebMapId }
    });
    this._mapview = new MapView({
      map: this._map,
      container: this._domRef.current
    });
    //if we have init extent, use it.
    if (
      appSettings.initialExtent &&
      appSettings.initialExtent.hasOwnProperty('x') &&
      appSettings.initialExtent.hasOwnProperty('y') &&
      appSettings.initialExtent.hasOwnProperty('z')
    ) {
      //@ts-ignore
      this._mapview.center = [
        appSettings.initialExtent['x'],
        appSettings.initialExtent['y']
      ];
      this._mapview.zoom = appSettings.initialExtent['z'];
    }

    function syncExtent(ext: __esri.Extent, mapview: MapView): any {
      const { latitude, longitude } = ext.center;
      store.dispatch(changeMapCenterCoordinates({ latitude, longitude }));
      store.dispatch(changeMapScale(mapview.scale));
    }

    const throtthledUpdater = debounce(syncExtent, 1500, { trailing: true });

    this._mapview.when(async () => {
      //Set default state and other event listeners
      store.dispatch(isMapReady(true));
      store.dispatch(setLanguage(lang));
      store.dispatch(changeMapScale(this._mapview.scale));
      const { latitude, longitude } = this._mapview.center;
      store.dispatch(changeMapCenterCoordinates({ latitude, longitude }));
      this._mapview.watch('extent', newExtent =>
        throtthledUpdater(newExtent, this._mapview)
      );
      this._mapview.on('click', event => {
        store.dispatch(setActiveFeatures([]));
        store.dispatch(setActiveFeatureIndex([0, 0]));
        store.dispatch(selectActiveTab('data'));
        queryLayersForFeatures(this._mapview, this._map, event);
      });

      this.initializeAndSetSketch();

      const mapLayerObjects: LayerProps[] = await extractWebmapLayerObjects(
        this._map
      );

      //Update the layer objects with new titles based on current language
      const updatedLayerObjects = nonWebmapLayers.map(layerObject => {
        const layerTitle = layerObject.label[lang]
          ? layerObject.label[lang]
          : 'Untitled Layer';
        layerObject.title = layerTitle;
        return layerObject;
      });
      //
      //Add non webmap layers to the map
      //@ts-ignore
      this._map?.addMany(esriNonWebmapLayers);
      const allLayerObjects = [...updatedLayerObjects, ...mapLayerObjects];
      store.dispatch(allAvailableLayers(allLayerObjects));
      const mapLayerIDs = getSortedLayers(
        appSettings.layerPanel,
        allLayerObjects,
        this._map
      );

      this.addExtraLayers();

      //Reorder layers on the map!
      this._map?.layers.forEach((layer: any) => {
        const layerIndex = mapLayerIDs?.findIndex(i => i === layer.id);
        if (layerIndex && layerIndex !== -1) {
          this._map?.reorder(layer, layerIndex);
        }
      });
    });
  }

  // All Extra Layers are ignored in query, legend and left panel, layer with MASK ID uses GFW mask endpoint with ISO def expression
  // Adding MASK Layer, which dims the area that is not the country ISO code based on Config ,separate from the flow as it comes in the config as 'extraLayers' array element, not following previous layer object specs
  addExtraLayers(): void {
    const appSettings = store.getState().appSettings;
    const { layerPanel } = appSettings;
    const extraLayers = layerPanel['extraLayers'];
    extraLayers.forEach((exLayer: any) => {
      let extraEsriLayer;
      if (exLayer.id === 'MASK') {
        exLayer.type = 'MASK';
        extraEsriLayer = LayerFactory(this._mapview, exLayer);
      } else {
        extraEsriLayer = LayerFactory(this._mapview, exLayer);
      }
      if (extraEsriLayer) {
        this._map!.add(extraEsriLayer);
      }
    });
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

  attachCoordinatesWidget(domref: React.MutableRefObject<any>): void {
    new CoordinateConversion({
      view: this._mapview,
      container: domref.current
    });
  }

  clearAllLayers(): void {
    //1. Iterate over map's layers and turn them off one by one - do we toggle visibility or unload them?
    this._map?.layers.forEach((layer: any) => {
      if (layer.sublayers) {
        layer.sublayers.forEach((sub: any) => (sub.visible = false));
      } else {
        layer.visible = false;
      }
    });
    //2. Update redux state with visible layers array being empty

    const { mapviewState } = store.getState();
    const newLayersArray = mapviewState.allAvailableLayers.map(
      (l: LayerProps) => {
        return {
          ...l,
          visible: false
        };
      }
    );
    store.dispatch(allAvailableLayers(newLayersArray));
  }

  selectAllLayers(): void {
    this._map?.layers.forEach((layer: any) => {
      if (layer.sublayers) {
        layer.sublayers.forEach((sub: any) => (sub.visible = true));
      } else {
        layer.visible = true;
      }
    });
    const { mapviewState } = store.getState();
    const newLayersArray = mapviewState.allAvailableLayers.map(
      (l: LayerProps) => {
        return {
          ...l,
          visible: true
        };
      }
    );
    store.dispatch(allAvailableLayers(newLayersArray));
  }

  removeAllGraphics(layerID: string): void {
    const layer: any = this._map?.findLayerById(layerID);
    if (layer) {
      layer.removeAll();
    }
  }

  drawGraphic(specificFeature: Array<FeatureResult>): void {
    if (this._map) {
      setNewGraphic({
        map: this._map,
        mapview: this._mapview,
        allFeatures: specificFeature,
        isUploadFile: false
      });
    }
  }

  changeLayerVisibility(layerID: string, visibility: boolean): void {
    const layer = this._map?.findLayerById(layerID);
    if (layer) {
      //1. update the map
      layer.visible = visibility;
      //2. Update redux
      const { mapviewState } = store.getState();
      const newLayersArray = mapviewState.allAvailableLayers.map(l => {
        if (l.id === layerID) {
          return {
            ...l,
            visible: layer.visible
          };
        } else {
          return l;
        }
      });
      store.dispatch(allAvailableLayers(newLayersArray));
    }
  }

  toggleLayerVisibility(
    layerID: string,
    sublayer?: boolean,
    parentID?: string
  ): void {
    let layer = null as any;
    if (sublayer && parentID) {
      layer = this._map
        ?.findLayerById(parentID)
        //@ts-ignore -- sublayers exist
        ?.allSublayers.items.find((sub: any) => sub.id === layerID);
    } else {
      layer = this._map?.findLayerById(layerID);
    }
    if (layer) {
      //1. update the map
      layer.visible = !layer.visible;
      //2. Update redux
      const { mapviewState } = store.getState();
      const newLayersArray = mapviewState.allAvailableLayers.map(l => {
        if (l.id === layerID) {
          return {
            ...l,
            visible: layer.visible
          };
        } else {
          return l;
        }
      });
      store.dispatch(allAvailableLayers(newLayersArray));
    }
  }

  setLayerOpacity(
    layerID: string,
    value: string,
    sublayer?: boolean,
    parentID?: string
  ): void {
    let layer = null as any;
    if (sublayer && parentID) {
      layer = this._map
        ?.findLayerById(parentID)
        //@ts-ignore -- sublayers exist
        ?.allSublayers.items.find((sub: any) => sub.id === layerID);
    } else {
      layer = this._map?.findLayerById(layerID);
    }
    if (layer) {
      layer.opacity = Number(value);
      const { mapviewState } = store.getState();
      const newLayersArray = mapviewState.allAvailableLayers.map(l => {
        if (l.id === layerID) {
          return {
            ...l,
            opacity: layer.opacity
          };
        } else {
          return l;
        }
      });
      store.dispatch(allAvailableLayers(newLayersArray));
    }
  }

  completeSketchVM(): any {
    this._sketchVM?.complete();
  }

  deleteSketchVM(): void {
    this._sketchVM?.emit('delete');
  }

  updateSketchVM(): any {
    if (this._sketchVM && this._map && this._sketchVMGraphicsLayer) {
      if (this._sketchVMGraphicsLayer.graphics['items'].length === 1) {
        this._sketchVM?.update(
          this._sketchVMGraphicsLayer.graphics['items'][0],
          {
            tool: 'reshape',
            enableRotation: false,
            toggleToolOnClick: false,
            enableScaling: false,
            preserveAspectRatio: false
          }
        );
      }

      if (this._sketchVMGraphicsLayer.graphics['items'].length > 1) {
        this._sketchVM?.update(this._sketchVMGraphicsLayer.graphics['items'], {
          tool: 'transform',
          enableRotation: true,
          toggleToolOnClick: true,
          enableScaling: true,
          preserveAspectRatio: false
        });
      }
    }
  }

  listenToSketchDelete(): any {
    if (this._sketchVMGraphicsLayer) {
      store.dispatch(setActiveFeatures([]));
      store.dispatch(setActiveFeatureIndex([0, 0]));
      this._sketchVMGraphicsLayer.graphics['items'] = [];
    }
  }

  listenToSketchCreate(event: any): void {
    let eventGraphics;
    if (event.hasOwnProperty('graphic')) {
      eventGraphics = event.graphic;
    } else if (event.hasOwnProperty('graphics')) {
      eventGraphics = event.graphics[0];
    }
    eventGraphics.attributes = {
      OBJECTID: eventGraphics.uid
    };

    eventGraphics.symbol.outline.color = [115, 252, 253];
    eventGraphics.symbol.color = [0, 0, 0, 0];

    const drawnFeatures: LayerFeatureResult = {
      layerID: 'user_features',
      layerTitle: 'User Features',
      features: [eventGraphics],
      fieldNames: null
    };

    //Replace all active features with our drawn feature, assigning custom layerID and Title
    store.dispatch(setActiveFeatures([drawnFeatures]));
    store.dispatch(setActiveFeatureIndex([0, 0]));
    store.dispatch(selectActiveTab('analysis'));
  }

  initializeAndSetSketch(graphics = []): void {
    if (this._sketchVMGraphicsLayer) {
      this._sketchVMGraphicsLayer.graphics.removeAll();
    }

    this._sketchVMGraphicsLayer = new GraphicsLayer({
      id: 'sketchGraphics'
    });

    if (graphics.length) {
      this._sketchVMGraphicsLayer.graphics.addMany(graphics);
    }

    this._sketchVM = new SketchViewModel({
      layer: this._sketchVMGraphicsLayer,
      view: this._mapview,
      polylineSymbol: {
        type: 'simple-line',
        color: 'red',
        width: 3
      }
    });

    this._map?.add(this._sketchVMGraphicsLayer);

    this._sketchVM?.on('create', (event: any) => {
      if (event.state === 'complete') {
        this.listenToSketchCreate(event);
      }
    });

    this._sketchVM?.on('delete', () => {
      this.listenToSketchDelete();
    });

    this._sketchVM?.on('update', (event: any) => {
      if (event.state === 'complete') {
        this.listenToSketchCreate(event);
      }
    });
  }

  createPolygonSketch = (): void => {
    this.deleteSketchVM();
    this._sketchVM?.create('polygon', { mode: 'freehand' });
  };

  getAndDispatchMeasureResults(optionType: OptionType): void {
    this._selectedWidget?.watch('viewModel.state', (state: string) => {
      let areaResults = {};
      let distanceResults = {};

      if (state === 'measured') {
        if (optionType === 'area') {
          areaResults = {
            area: this._selectedWidget?.viewModel.measurementLabel['area'],
            perimeter: this._selectedWidget?.viewModel.measurementLabel[
              'perimeter'
            ]
          };
        } else if (optionType === 'distance') {
          distanceResults = {
            length: this._selectedWidget?.viewModel.measurementLabel
          };
        }

        store.dispatch(
          setMeasureResults({
            activeButton: optionType,
            areaResults,
            distanceResults,
            coordinateMouseClickResults: {},
            coordinatePointerMoveResults: {}
          })
        );
      }
    });
  }

  clearAllWidgets(): void {
    this._selectedWidget?.viewModel.clearMeasurement();
    this._selectedWidget = undefined;

    this._mouseClickEventListener?.remove();
    this._mouseClickEventListener = undefined;

    this._pointerMoveEventListener?.remove();
    this._pointerMoveEventListener = undefined;
  }

  setActiveMeasureWidget(optionType: OptionType): void {
    switch (optionType) {
      case 'area':
        this._selectedWidget = new AreaMeasurement2D({
          view: this._mapview,
          unit: 'acres'
        });
        break;
      case 'distance':
        this._selectedWidget = new DistanceMeasurement2D({
          view: this._mapview,
          unit: 'miles'
        });
        break;
      case 'coordinates': {
        this._selectedWidget?.viewModel.clearMeasurement();
        this._selectedWidget = undefined;
        break;
      }
      default:
        break;
    }

    if (optionType === 'area' || optionType === 'distance') {
      this._selectedWidget?.viewModel.newMeasurement();
      this.getAndDispatchMeasureResults(optionType);
    }
  }

  updateSelectedMeasureWidget(
    optionType: OptionType,
    selectedUnit: AreaMeasurement2D['unit'] | DistanceMeasurement2D['unit']
  ): void {
    let areaResults = {};
    let distanceResults = {};

    if (this._selectedWidget) {
      this._selectedWidget.unit = selectedUnit;
      switch (optionType) {
        case 'area':
          areaResults = {
            area: this._selectedWidget.viewModel.measurementLabel['area'],
            perimeter: this._selectedWidget.viewModel.measurementLabel[
              'perimeter'
            ]
          };
          break;
        case 'distance':
          distanceResults = {
            length: this._selectedWidget.viewModel.measurementLabel
          };
          break;
        default:
          break;
      }

      store.dispatch(
        setMeasureResults({
          activeButton: optionType,
          areaResults,
          distanceResults,
          coordinateMouseClickResults: {},
          coordinatePointerMoveResults: {}
        })
      );
      this._selectedWidget?.watch('viewModel.state', (state: string) => {
        if (state === 'measured') {
          this.updateMeasureWidgetOnClick();
        }
      });
    }
  }

  // updateOnClickCoordinates(selectedDropdownOption: string): void {
  //   const {
  //     coordinateMouseClickResults
  //   } = store.getState().appState.measureContent;
  //   const isDMS = selectedDropdownOption === 'dms';
  //   const isDecimal = selectedDropdownOption === 'decimal';

  //   if (
  //     coordinateMouseClickResults?.latitude &&
  //     coordinateMouseClickResults?.longitude &&
  //     isDMS
  //   ) {
  //     // TODO - convert decimal to DMS
  //     // * NOTE - Will need to revisit this logic
  //     // * NOTE - Will need to explicitly update other ...Results property of Redux state

  //     store.dispatch(
  //       setMeasureResults({
  //         areaResults: {},
  //         distanceResults: {},
  //         coordinateMouseClickResults: {}
  //       })
  //     );
  //   } else if (
  //     coordinateMouseClickResults?.latitude &&
  //     coordinateMouseClickResults?.longitude &&
  //     isDecimal
  //   ) {
  //     // TODO - convert DMS to decimal
  //   }
  // }

  updateMeasureWidgetOnClick(): void {
    const mapviewOnClick = this._mapview?.on('click', event => {
      event.stopPropagation();
      this._selectedWidget?.viewModel.newMeasurement();
      mapviewOnClick?.remove();
    });
  }

  // setOnClickCoordinates(selectedDropdownOption: string): void {
  //   this._mouseClickEventListener = this._mapview?.on('click', event => {
  //     event.stopPropagation();
  //     let coordinateMouseClickResults = {};
  //     const coordinatesInDecimals = this._mapview?.toMap({
  //       x: event.x,
  //       y: event.y
  //     });

  //     if (selectedDropdownOption === 'degree') {
  //       // TODO - convert to degree
  //     } else if (selectedDropdownOption === 'dms') {
  //       // TODO - convert to dms
  //     }

  //     store.dispatch(
  //       setMeasureResults({
  //         areaResults: {},
  //         distanceResults: {},
  //         coordinateMouseClickResults
  //       })
  //     );
  //   });
  // }

  // setPointerMoveCoordinates(selectedDropdownOption: string): void {
  //   this._pointerMoveEventListener = this._mapview?.on(
  //     'pointer-move',
  //     event => {
  //       event.stopPropagation();
  //       let coordinatePointerMoveResults = {};
  //       const coordinatesInDecimals = this._mapview?.toMap({
  //         x: event.x,
  //         y: event.y
  //       });

  //       if (selectedDropdownOption === 'Degree') {
  //         // TODO - convert to degree
  //       } else if (selectedDropdownOption === 'DMS') {
  //         // TODO - convert to DMS
  //       }

  //       store.dispatch(
  //         setMeasureResults({
  //           areaResults: {},
  //           distanceResults: {},
  //           coordinatePointerMoveResults
  //         })
  //       );
  //     }
  //   );
  // }

  generateMapPDF = async (layoutType: string): Promise<any> => {
    const printServiceURL = store.getState().appSettings.printServiceUrl;
    let printOptions: Array<string>;

    if (printServiceURL && layoutType === 'Landscape') {
      printOptions = await fetch(`${printServiceURL}/?f=json`)
        .then(res => res.json())
        .then(results => {
          return results.parameters.filter(
            (param: any) => param.name === 'Layout_Template'
          )[0].choiceList;
        });

      layoutType = printOptions[0];
    }

    if (!this._printTask) {
      this._printTask = new PrintTask({
        url: printServiceURL
      });
    }

    const template = new PrintTemplate({
      format: 'pdf',
      layout: layoutType as any,
      // * NOTE - must set 'layout' as type of 'any' in order to assign
      // * custom layout types from GFW print service URL
      layoutOptions: {
        scalebarUnit: 'Kilometers',
        customTextElements: [
          { title: 'GFW Mapbuilder' },
          { subtitle: 'Make maps that matter' }
        ]
      }
    });

    const params = new PrintParameters({
      view: this._mapview,
      template
    });

    const mapPDF = await this._printTask
      ?.execute(params)
      .catch(e => console.log('error in generateMapPDF()', e));

    return mapPDF;
  };

  setPolygon = (points: Array<Point>): void => {
    const simpleFillSymbol = {
      type: 'simple-fill', // autocasts as new SimpleFillSymbol()
      color: [240, 171, 0, 0.0],
      outline: {
        // autocasts as new SimpleLineSymbol()
        color: [0, 255, 254],
        width: 2
      }
    };

    this._mapview.graphics.removeAll();

    const polygon = new Polygon().addRing(points);

    const graphic = new Graphic({
      geometry: polygon,
      symbol: simpleFillSymbol
    });
    this._mapview.graphics.add(graphic);

    this._mapview.goTo(
      {
        target: graphic
      },
      {
        duration: 1000
      }
    );
    store.dispatch(renderModal(''));
  };

  async initializeSearchWidget(searchRef: RefObject<any>): Promise<void> {
    const allSources = await setLayerSearchSource();

    const searchWidget = new Search({
      view: this._mapview,
      container: searchRef.current,
      sources: allSources
    });

    searchWidget.on('search-focus', (e: any) => {
      const selectedLayer = {
        displayField: e.target.activeSource.displayField,
        layerTitle: e.target.activeSource.layer.title
      };
      store.dispatch(setSelectedSearchWidgetLayer(selectedLayer));
    });
  }

  setSearchWidget(latitude: string, longitude: string): void {
    this._mapview.graphics.removeAll();

    const specificPoint = new Point({
      latitude: Number(latitude),
      longitude: Number(longitude)
    });

    const simpleMarkerSymbol = {
      type: 'simple-marker',
      color: [240, 171, 0],
      outline: {
        color: [255, 255, 255],
        width: 1
      }
    };

    const pointGraphic = new Graphic({
      geometry: specificPoint,
      symbol: simpleMarkerSymbol
    });

    this._mapview.graphics.add(pointGraphic);
    this._mapview.goTo(
      {
        target: specificPoint,
        zoom: 10
      },
      {
        duration: 1000
      }
    );
    store.dispatch(renderModal(''));
  }

  updateDensityValue(value: number): void {
    densityEnabledLayers.forEach((layerId: string) => {
      const layer: any = this._map?.findLayerById(layerId);
      if (layer && layer.id !== 'AG_BIOMASS' && layer.urlTemplate) {
        layer.urlTemplate = layer.urlTemplate.replace(
          /(tc)(?:[^\/]+)/,
          `tc${value}`
        );
        layer.refresh();
      }
    });
  }

  updateBiodensityValue(value: number): void {
    const bioLayer: any = this._map?.findLayerById('AG_BIOMASS');
    if (bioLayer) {
      bioLayer.mosaicRule.where = `OBJECTID = ${value}`;
      bioLayer.refresh();
    }
  }

  updateTreeCoverValue(value: number): void {
    const { mapviewState } = store.getState();
    const treeCoverLayerInfo: any = mapviewState.allAvailableLayers.find(
      l => l.id === 'TREE_COVER'
    );
    const treeLayer: any = this._map?.findLayerById('TREE_COVER');
    if (treeLayer && treeCoverLayerInfo) {
      const remapRF = new RasterFunction();
      remapRF.functionName = 'Remap';
      remapRF.functionArguments = {
        InputRanges: [value, treeCoverLayerInfo.metadata.inputRange[1]],
        OutputValues: treeCoverLayerInfo.metadata.outputRange,
        AllowUnmatched: false,
        Raster: '$$' // Apply remap to the image service
      };
      remapRF.outputPixelType = 'u8';
      const colorRF = new RasterFunction();
      colorRF.functionName = 'Colormap';
      colorRF.functionArguments = {
        Colormap: treeCoverLayerInfo.metadata.colormap,
        Raster: remapRF
      };
      treeLayer.renderingRule = colorRF;
    }
  }

  getMapviewCoordinates(): URLCoordinates {
    const { zoom } = this._mapview;
    const { latitude, longitude } = this._mapview.center;

    return {
      latitude: latitude.toFixed(7),
      longitude: longitude.toFixed(7),
      zoom
    };
  }

  setActiveBasemap(id: string): void {
    if (this._map) {
      const basemap = Basemap.fromId(id);
      this._map.basemap = basemap;
      store.dispatch(setSelectedBasemap(id));
    }
  }

  processGeojson(esriJson: Array<FeatureResult>): void {
    if (this._map) {
      setNewGraphic({
        map: this._map,
        mapview: this._mapview,
        allFeatures: esriJson,
        isUploadFile: true
      });
    }
  }

  addActiveFeatureGraphic(esriJson: Array<FeatureResult>): void {
    if (this._map) {
      setNewGraphic({
        map: this._map,
        mapview: this._mapview,
        allFeatures: esriJson,
        isUploadFile: false
      });

      const graphicsLayer: any = this._map.findLayerById(
        'active-feature-layer'
      );
      this._mapview.goTo(graphicsLayer.graphics);
    }
  }

  addActiveFeaturePointGraphic(esriJson: FeatureResult): void {
    if (this._map) {
      addPointGraphic(this._map, esriJson);
      const graphicsLayer: any = this._map.findLayerById(
        'active-feature-layer'
      );
      this._mapview.goTo(graphicsLayer.graphics);
      //TODO: For some reason it does not zoom to points?
      this._mapview.zoom = 12;
    }
  }

  updateBaseTile(id: string, range: Array<number>): void {
    const [startYear, endYear] = range;
    const specificLayer = this._map?.findLayerById(id) as __esri.BaseTileLayer;

    if (specificLayer) {
      (specificLayer as any).minYear = startYear;
      (specificLayer as any).maxYear = endYear;
      specificLayer.refresh();
    }
  }

  resetCustomDateRange(): void {
    if (!this._map) {
      return;
    }

    const modisLayer = (this._map.allLayers as any).items.filter(
      (layer: FeatureLayer) => layer.id === 'MODIS_ACTIVE_FIRES'
    )[0];

    const viirsLayer = (this._map.allLayers as any).items.filter(
      (layer: FeatureLayer) => layer.id === 'VIIRS_ACTIVE_FIRES'
    )[0];

    if (modisLayer.sublayers) {
      const twentyFourHourMODIS = modisLayer.sublayers.items.filter(
        (sublayer: Sublayer) => sublayer.title === 'Global Fires (MODIS) 24 hrs'
      )[0];
      twentyFourHourMODIS.definitionExpression = undefined;
    }

    if (viirsLayer.sublayers) {
      const twentyFourHourVIIRS = viirsLayer.sublayers.items.filter(
        (sublayer: Sublayer) => sublayer.title === 'Global Fires (VIIRS) 24 hrs'
      )[0];
      twentyFourHourVIIRS.definitionExpression = undefined;
    }

    return;
  }

  setCustomDateRange(
    layerID: string,
    startDate: string | Date,
    endDate: string | Date
  ): void {
    const { mapviewState } = store.getState();

    if (!this._map) {
      return;
    }

    const layer = (this._map.allLayers as any).items.filter(
      (layer: FeatureLayer) => layer.id === layerID
    )[0];

    if (layer.sublayers) {
      const defExpression = `ACQ_DATE > date '${startDate}' AND ACQ_DATE < date '${endDate}'`;
      const twentyFourHourSublayer = layer.sublayers.items.filter(
        (sublayer: Sublayer) =>
          sublayer.title === 'Global Fires (MODIS) 24 hrs' ||
          sublayer.title === 'Global Fires (VIIRS) 24 hrs'
      )[0];

      twentyFourHourSublayer.definitionExpression = defExpression;

      const newLayersArray = mapviewState.allAvailableLayers.map(
        (layer: LayerProps) => {
          if (layer.id === layerID) {
            layer.definitionExpression = defExpression;
          }

          return layer;
        }
      );

      store.dispatch(allAvailableLayers(newLayersArray));
    }

    return;
  }

  initializeAndSetVIIRSLayers(): any {
    const viirsLayers = VIIRSLayerIDs.map(({ layerID, url }) => {
      return new FeatureLayer({
        id: layerID,
        url,
        visible: false
      });
    });
    return viirsLayers;
  }

  initializeAndSetMODISLayers(): any {
    const modisLayers = MODISLayerIDs.map(({ layerID, url }) => {
      return new FeatureLayer({
        id: layerID,
        url,
        visible: false
      });
    });
    return modisLayers;
  }

  setMODISDefinedRange(layer: any, sublayerType: string): void {
    if (!this._map) {
      return;
    }

    const MODIS24 = layer.sublayers.items.filter(
      (sublayer: Sublayer) => sublayer.title === 'Global Fires (MODIS) 24 hrs'
    );

    switch (sublayerType) {
      case '24 hrs':
        {
          MODIS24.visible = true;
          MODISLayerIDs.forEach(({ layerID }) => {
            const specificLayer = this._map?.findLayerById(layerID);

            if (specificLayer) {
              specificLayer.visible = false;
            }
          });
        }
        break;
      case '48 hrs':
        {
          MODIS24.visible = false;
          MODISLayerIDs.forEach(({ layerID }) => {
            const specificLayer = this._map?.findLayerById(layerID);
            if (specificLayer) {
              if (specificLayer.id === 'MODIS48') {
                specificLayer.visible = true;
              } else {
                specificLayer.visible = false;
              }
            }
          });
        }
        break;
      case '72 hrs':
        {
          MODIS24.visible = false;
          MODISLayerIDs.forEach(({ layerID }) => {
            const specificLayer = this._map?.findLayerById(layerID);
            if (specificLayer) {
              if (specificLayer.id === 'MODIS72') {
                specificLayer.visible = true;
              } else {
                specificLayer.visible = false;
              }
            }
          });
        }
        break;
      case '7 days':
        {
          MODIS24.visible = false;
          MODISLayerIDs.forEach(({ layerID }) => {
            const specificLayer = this._map?.findLayerById(layerID);
            if (specificLayer) {
              if (specificLayer.id === 'MODIS7D') {
                specificLayer.visible = true;
              } else {
                specificLayer.visible = false;
              }
            }
          });
        }
        break;
      default:
        break;
    }
  }

  setVIIRSDefinedRange(layer: any, sublayerType: string): void {
    if (!this._map) {
      return;
    }
    const VIIRS24 = layer.sublayers.items.filter(
      (sublayer: Sublayer) => sublayer.title === 'Global Fires (VIIRS) 24 hrs'
    );

    switch (sublayerType) {
      case '24 hrs':
        {
          VIIRS24.visible = true;
          VIIRSLayerIDs.forEach(({ layerID }) => {
            const specificLayer = this._map?.findLayerById(layerID);

            if (specificLayer) {
              specificLayer.visible = false;
            }
          });
        }
        break;
      case '48 hrs':
        {
          VIIRS24.visible = false;
          VIIRSLayerIDs.forEach(({ layerID }) => {
            const specificLayer = this._map?.findLayerById(layerID);
            if (specificLayer) {
              if (specificLayer.id === 'VIIRS48') {
                specificLayer.visible = true;
              } else {
                specificLayer.visible = false;
              }
            }
          });
        }
        break;
      case '72 hrs':
        {
          VIIRS24.visible = false;
          VIIRSLayerIDs.forEach(({ layerID }) => {
            const specificLayer = this._map?.findLayerById(layerID);
            if (specificLayer) {
              if (specificLayer.id === 'VIIRS72') {
                specificLayer.visible = true;
              } else {
                specificLayer.visible = false;
              }
            }
          });
        }
        break;
      case '7 days':
        {
          VIIRS24.visible = false;
          VIIRSLayerIDs.forEach(({ layerID }) => {
            const specificLayer = this._map?.findLayerById(layerID);
            if (specificLayer) {
              if (specificLayer.id === 'VIIRS7D') {
                specificLayer.visible = true;
              } else {
                specificLayer.visible = false;
              }
            }
          });
        }
        break;
      default:
        break;
    }
  }

  toggleVIIRSorMODIS(layerID: string): void {
    if (!this._map) {
      return;
    }

    const layer = (this._map.allLayers as any).items.filter(
      (layer: LayerProps) => layer.id === layerID
    )[0];

    if (!layer || !layer.sublayers) {
      return;
    }

    layer.visible = !layer.visible;

    const sublayer24 = layer.sublayers.items.filter(
      (sublayer: Sublayer) =>
        sublayer.title === 'Global Fires (VIIRS) 24 hrs' ||
        sublayer.title === 'Global Fires (MODIS) 24 hrs'
    )[0];

    if (sublayer24) {
      sublayer24.visible = true;
    }

    if (layer.id === 'VIIRS_ACTIVE_FIRES') {
      VIIRSLayerIDs.forEach(({ layerID }) => {
        const specificLayer = this._map?.findLayerById(layerID);

        if (specificLayer) {
          specificLayer.visible = false;
        }
      });
    } else if (layer.id === 'MODIS_ACTIVE_FIRES') {
      MODISLayerIDs.forEach(({ layerID }) => {
        const specificLayer = this._map?.findLayerById(layerID);

        if (specificLayer) {
          specificLayer.visible = false;
        }
      });
    }

    const { mapviewState } = store.getState();
    const newLayersArray = mapviewState.allAvailableLayers.map(l => {
      if (l.id === layer.id) {
        return {
          ...l,
          visible: layer.visible
        };
      } else {
        return l;
      }
    });
    store.dispatch(allAvailableLayers(newLayersArray));
  }

  updateMODISorVIIRSOpacity(layerID: string, opacity: number): void {
    if (!this._map) {
      return;
    }

    const layer = (this._map.allLayers as any).items.filter(
      (layer: LayerProps) => layer.id === layerID
    )[0];

    if (!layer || !layer.sublayers) {
      return;
    }

    layer.opacity = opacity;
    const { mapviewState } = store.getState();
    const newLayersArray = mapviewState.allAvailableLayers.map(l => {
      if (l.id === layerID) {
        return {
          ...l,
          opacity: layer.opacity
        };
      } else {
        return l;
      }
    });
    store.dispatch(allAvailableLayers(newLayersArray));

    const sublayer24 = layer.sublayers.items.filter(
      (sublayer: Sublayer) =>
        sublayer.title === 'Global Fires (VIIRS) 24 hrs' ||
        sublayer.title === 'Global Fires (MODIS) 24 hrs'
    );

    sublayer24.opacity = opacity;

    if (layerID === 'VIIRS_ACTIVE_FIRES') {
      VIIRSLayerIDs.forEach(({ layerID }) => {
        const specificLayer = this._map?.findLayerById(layerID);

        if (specificLayer) {
          specificLayer.opacity = opacity;
        }
      });
    } else if (layerID === 'MODIS_ACTIVE_FIRES') {
      MODISLayerIDs.forEach(({ layerID }) => {
        const specificLayer = this._map?.findLayerById(layerID);

        if (specificLayer) {
          specificLayer.opacity = opacity;
        }
      });
    }
  }

  //Keeping imagery opacity in global variable due to the nature of placing tiles for imagery service. We re-create layer each time we place the new tile down. Keeping this value in redux introduced a lot of performance issues, thus global here.
  updateImageryOpacity(value: number): void {
    this._imageryOpacity = value;
  }

  toggleImageryLayer(value: boolean, layerID?: string): void {
    if (!layerID) return;
    const layer = this._map?.findLayerById(layerID) as any;
    if (layer && layer.urlTemplate) {
      layer.visible = !layer.visible;
    }
  }

  setDefinedDateRange(layerID: string, sublayerType: string): void {
    if (!this._map) {
      return;
    }

    const layer = (this._map.allLayers as any).items.filter(
      (layer: LayerProps) => layer.id === layerID
    )[0];

    if (layerID === 'MODIS_ACTIVE_FIRES') {
      this.setMODISDefinedRange(layer, sublayerType);
    }

    if (layerID === 'VIIRS_ACTIVE_FIRES') {
      this.setVIIRSDefinedRange(layer, sublayerType);
    }
  }

  //Helper to deal with URL params and Webmap loaded layers

  syncWebmapLayersWithURL(layerInfosFromURL: LayerInfo[]): void {
    this._map?.layers.forEach((webmapLayer: any) => {
      if (webmapLayer.sublayers && webmapLayer.sublayers.length > 0) {
        webmapLayer.sublayers.forEach((sub: Layer) => {
          const layerFromURL = layerInfosFromURL.find(
            l => l.sublayerID && String(l.sublayerID) === String(sub.id)
          );
          if (layerFromURL) {
            sub.visible = true;
            sub.opacity = layerFromURL.opacity;
          } else {
            sub.visible = false;
          }
        });
      } else {
        const layerFromURL = layerInfosFromURL.find(
          l => l.layerID === webmapLayer.id
        );
        if (layerFromURL) {
          webmapLayer.visible = true;
          webmapLayer.opacity = layerFromURL.opacity;
        } else {
          webmapLayer.visible = false;
        }
      }
    });
  }

  // testGrabMetadata(layerID: string): any {
  //   const test = (this._map?.layers as any).items.filter(
  //     (l: any) => l.id === layerID
  //   )[0];
  //   // is there a way to grab this data?

  //   const layer = new FeatureLayer({
  //     portalItem: {
  //       id: layerID
  //     }
  //   });

  //   debugger;

  disableMapInteractions(): void {
    this._mapview.on('mouse-wheel', function(event) {
      event.stopPropagation();
    });
    this._mapview.on('double-click', function(event) {
      event.stopPropagation();
    });
    this._mapview.on('drag', function(event) {
      event.stopPropagation();
    });
  }

  changeLayerDefinitionExpression(layerInfo: LayerProps, defExp: string): void {
    if (layerInfo.type === 'feature') {
      const layerOnMap = this._map?.findLayerById(
        layerInfo.id
      ) as __esri.FeatureLayer;
      if (layerOnMap) {
        layerOnMap.definitionExpression = defExp;
      }
    } else if (layerInfo.type === 'dynamic') {
      const layerOnMap = this._map?.findLayerById(
        layerInfo.id
      ) as __esri.MapImageLayer;
      if (layerOnMap) {
        layerOnMap.allSublayers.forEach(
          sub => (sub.definitionExpression = defExp)
        );
      }
    }
  }
}

export const mapController = new MapController();

//TODO: This is for DEV only and should be removed once we deploy to prod
declare global {
  interface Window {
    mapController: any;
  }
}

window.mapController = mapController;
