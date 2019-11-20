import dispatcher from 'js/dispatcher';
import layerFactory from 'utils/layerFactory';
import layerKeys from 'constants/LayerConstants';
// import CartoLayer from 'js/layers/CartoLayer';
import appActions from 'actions/AppActions';
import resources from 'resources';
import Point from 'esri/geometry/Point';
import AppUtils from '../utils/AppUtils';
import layerActions from 'actions/LayerActions';
import {getUrlParams} from 'utils/params';
import moment, { isMoment } from 'moment';
import {shortTermServices} from '../config';


let layersCreated = false;

class MapActions {
  //- Action to notify the store the map has changed so we can rerender UI changes
  //- if necessary
  mapUpdated() {
    return {};
  }

  infoWindowUpdated({ target }) {
    return (
      (target && target.getSelectedFeature && target.getSelectedFeature()) ||
      false
    );
  }

  changeActiveTab(tabId) {
    return {
      id: tabId
    };
  }

  setAnalysisType(value) {
    return value;
  }

  centerAndZoomLatLng(lat, lng) {
    brApp.map.centerAndZoom(new Point(lng, lat), 9);
  }

  //- Straight through dispatches, all have the following format
  /**
   * @param {object} - data
   * @param {boolean} - data.visible
   * @return {object} - data
   */
  toggleMeasurementModal = () => {
    return {};
  };
  toggleAnalysisModal = data => data;
  toggleCoordinatesModal = data => data;
  toggleEditCoordinatesModal = data => data;
  togglePrintModal = data => data;
  toggleSearchModal = data => data;
  toggleCanopyModal = data => data;
  toggleLayerModal = data => data;
  toggleSubscriptionsModal = data => data;
  toggleSubscribeModal = data => data;
  toggleConfirmModal = data => data;
  toggleTOCVisible = data => data;
  showLayerInfo = layer => layer;
  updateTimeExtent = timeExtent => timeExtent;
  toggleEditing = () => {
    return {};
  };
  resetEditing = () => {
    return {};
  };
  toggleLegendVisible = () => {
    return {};
  };
  toggleMobileTimeWidgetVisible = () => {
    return {};
  };
  updateCurrentLat = data => data;
  updateCurrentLng = data => data;
  updateCurrentX = data => data;
  updateCurrentY = data => data;
  increaseSelectIndex = () => {
    return {};
  };
  decreaseSelectIndex = () => {
    return {};
  };
  updateSelectIndex = data => data;

  toggleLogin = data => data;

  deleteSubscription(subscription) {
    return subscription;
  }

  setUserSubscriptions(subscriptions) {
    return subscriptions;
  }

  updateImazonAlertSettings(type, value) {
    return { type, value };
  }

  changeBasemap(basemap) {
    return basemap;
  }

  updateCanopyDensity(density) {
    return { density };
  }

  updateActiveSlopeClass(classValue) {
    return classValue;
  }

  openTOCAccordion(groupKey) {
    return groupKey;
  }
  
  updateActiveLayers(activeLayers) {
    return activeLayers;
  }

  createLayers(map, layerPanel, activeLayers, language, firesState, itemData, defaultVisibility) {
    //- Organize and order the layers before adding them to the map
    let maxOrder = 0;    

    const basemap = itemData && itemData.baseMap;
    let baseMapLayers;
    if (basemap) {
      baseMapLayers = basemap.baseMapLayers;
    }

    let layers = Object.keys(layerPanel)
      .filter(groupName => {
        //- remove basemaps and extra layers, extra layers will be added later and basemaps
        //- handled differently elsewhere
        return (
          groupName !== layerKeys.GROUP_BASEMAP &&
          groupName !== layerKeys.EXTRA_LAYERS
        );
      })
      .sort((a, b) => {
        //- Sort the groups based on their order property
        return layerPanel[b].order - layerPanel[a].order;
      })
      .reduce((list, groupName, groupIndex) => {
        //- Flatten them into a single list but before that,
        //- Multiple the order by 100 so I can sort them more easily below, this is because there
        //- order numbers start at 0 for each group, so group 0, layer 1 would have order of 1
        //- while group 1 layer 1 would have order of 100, and I need to integrate with webmap layers
        if (groupIndex === 0) {
          maxOrder = layerPanel[groupName].order + 1;
        }

        const orderedGroups = layerPanel[groupName].layers.map(layer => {
          if (layersCreated === false || groupName === 'GROUP_WEBMAP') {
            layer.order =
              (maxOrder - layerPanel[groupName].order) * 100 - layer.order;
          }
          return layer;
        });
        return list.concat(orderedGroups);
      }, []);
    //- Add the extra layers now that all the others have been sorted
    layers = layers.concat(layerPanel.extraLayers);

    if (!defaultVisibility) {
      layers.forEach(layer => {
        if (layer.id !== 'MASK' && layer.id !== 'USER_FEATURES') {
          if (activeLayers.indexOf(layer.id) === -1) {
            layer.visible = false;
          } else {
            layer.visible = true;
          }
        }
      });
    }

    let viirsFiresLayer;
    let modisFiresLayer;
    layers.forEach(layer => {
      if (layer.id === 'VIIRS_ACTIVE_FIRES') {
        viirsFiresLayer = layerFactory(layer, language, map);
      }
      if (layer.id === 'MODIS_ACTIVE_FIRES') {
        modisFiresLayer = layerFactory(layer, language, map);
      }
    });

    if (viirsFiresLayer) {
      activeLayers.forEach(activeLayer => {
        if (activeLayer.indexOf('VIIRS_ACTIVE_FIRES_72HR') > -1) {
          const layer = map.getLayer(activeLayer);
          const defs72HR = [];
          defs72HR[shortTermServices['viirs7D'].id] = `Date > date'${moment(
            new Date()
          )
            .subtract(3, 'd')
            .format('YYYY-MM-DD HH:mm:ss')}'`;
          layer.setLayerDefinitions(defs72HR);
          layer.show();
          activeLayers.push('VIIRS_ACTIVE_FIRES');
        } else if (activeLayer.indexOf('VIIRS_ACTIVE_FIRES_1YR') > -1) {
          const layer = map.getLayer(activeLayer);
          const defs1YR = [];
          let viirsStartDate = firesState.viirsStartDate;
          let viirsEndDate = firesState.viirsEndDate;
          if (!isMoment(viirsStartDate)) {
            viirsStartDate = moment(viirsStartDate);
          }
          if (!isMoment(viirsEndDate)) {
            viirsEndDate = moment(viirsEndDate);
          }
          const start = `${viirsStartDate.year()}-${viirsStartDate.month() +
            1}-${viirsStartDate.date()} ${viirsStartDate.hours()}:${viirsStartDate.minutes()}:${viirsStartDate.seconds()}`;
          const end = `${viirsEndDate.year()}-${viirsEndDate.month() +
            1}-${viirsEndDate.date()} ${viirsEndDate.hours()}:${viirsEndDate.minutes()}:${viirsEndDate.seconds()}`;
          const queryString =
            "ACQ_DATE > date '" +
            start +
            "'" +
            ' AND ' +
            "ACQ_DATE < date '" +
            end +
            "'";
          defs1YR[shortTermServices['viirs1YR'].id] = queryString;
          layer.setLayerDefinitions(defs1YR);
          layer.show();
          activeLayers.push('VIIRS_ACTIVE_FIRES');
        } else if (
          activeLayer.indexOf('VIIRS_ACTIVE_FIRES') > -1 &&
          activeLayer !== 'VIIRS_ACTIVE_FIRES'
        ) {
          map.getLayer(activeLayer).show();
          activeLayers.push('VIIRS_ACTIVE_FIRES');
        }
      });
    }

    if (modisFiresLayer) {
      activeLayers.forEach(activeLayer => {
        if (activeLayer.indexOf('MODIS_ACTIVE_FIRES_72HR') > -1) {
          const layer = map.getLayer(activeLayer);
          const defs72HR = [];
          defs72HR[shortTermServices['modis7D'].id] = `Date > date'${moment(
            new Date()
          )
            .subtract(3, 'd')
            .format('YYYY-MM-DD HH:mm:ss')}'`;
          layer.setLayerDefinitions(defs72HR);
          layer.show();
          activeLayers.push('MODIS_ACTIVE_FIRES');
        } else if (activeLayer.indexOf('MODIS_ACTIVE_FIRES_1YR') > -1) {
          const layer = map.getLayer(activeLayer);
          const defs1YR = [];
          let modisStartDate = firesState.modisStartDate;
          let modisEndDate = firesState.modisEndDate;
          if (!isMoment(modisStartDate)) {
            modisStartDate = moment(modisStartDate);
          }
          if (!isMoment(modisEndDate)) {
            modisEndDate = moment(modisEndDate);
          }
          const start = `${modisStartDate.year()}-${modisStartDate.month() +
            1}-${modisStartDate.date()} ${modisStartDate.hours()}:${modisStartDate.minutes()}:${modisStartDate.seconds()}`;
          const end = `${modisEndDate.year()}-${modisEndDate.month() +
            1}-${modisEndDate.date()} ${modisEndDate.hours()}:${modisEndDate.minutes()}:${modisEndDate.seconds()}`;
          const queryString =
            "ACQ_DATE > date '" +
            start +
            "'" +
            ' AND ' +
            "ACQ_DATE < date '" +
            end +
            "'";
          defs1YR[shortTermServices['modis1YR'].id] = queryString;
          layer.setLayerDefinitions(defs1YR);
          layer.show();
          activeLayers.push('MODIS_ACTIVE_FIRES');
        } else if (
          activeLayer.indexOf('MODIS_ACTIVE_FIRES') > -1 &&
          activeLayer !== 'MODIS_ACTIVE_FIRES'
        ) {
          map.getLayer(activeLayer).show();
          activeLayers.push('MODIS_ACTIVE_FIRES');
        }
      });
    }

    //- make sure there's only one entry for each dynamic layer
    const reducedLayers = layers.reduce((prevArray, currentItem) => {
      if (currentItem.hasOwnProperty('nestedLayers')) {
        return prevArray.concat(...currentItem.nestedLayers);
      }
      return prevArray.concat(currentItem);
    }, []);
    const uniqueLayers = [];
    const existingIds = [];

    reducedLayers.forEach(layer => {
      if (existingIds.indexOf(layer.id) === -1) {
        uniqueLayers.push(layer);
        existingIds.push(layer.id);
      }
    });

    //- remove layers from config that have no url unless they are of type graphic (which have no url)
    //- sort by order from the layer config
    //- return an arcgis layer for each config object
    const esriLayers = uniqueLayers
      .filter(
        layer =>
          layer && (layer.url || layer.type === 'graphic' || layer.versions)
      )
      .map(layer => {
        return layerFactory(layer, language);
      })
      .sort((a, b) => a.order - b.order);

    map.addLayers(esriLayers);
    // If there is an error with a particular layer, handle that here
    map.on('layers-add-result', result => {
      const addedLayers = result.layers;
      
      // Prepare the carto layer
      var cartoLayers = addedLayers.filter(layer => layer.layer.cartoUser);
      cartoLayers.forEach(cartoLayer => {
        cartoLayer.layer.on('onCartoLayerAdd', evt => {
          const tempResources = resources;
          tempResources.layerPanel.GROUP_CARTO.layers = evt.target.cartoLayers;
          appActions.applySettings(tempResources);
        });
      });

      // Check for Errors
      var layerErrors = addedLayers.filter(layer => layer.error);
      if (layerErrors.length > 0) {
        console.error(layerErrors);
      }
      //- Sort the layers, Webmap layers need to be ordered, unfortunately graphics/feature
      //- layers wont be sorted, they always show on top

      uniqueLayers.sort((a, b) => a.order - b.order);

      const params = getUrlParams(location.href);

      let adjustLayerVis;

      if (!params) {
        adjustLayerVis = false;
      } else if (Object.keys(params).length < 2) {
        adjustLayerVis = false;
      } else {
        adjustLayerVis = true;
      }

      uniqueLayers.forEach((l, i) => {
        map.reorderLayer(l, i + 1);

        if (adjustLayerVis && l.esriLayer) {
          if (activeLayers.indexOf(l.esriLayer.id) === -1) {
            if (!l.subId && l.visible) {
              layerActions.removeActiveLayer(l.id);
              l.visible = false;
            }
          } else {
            if (l.subId) {
              layerActions.addSubLayer(l);
              l.visible = true;
            } else {
              l.visible = true;
              layerActions.addActiveLayer(l.id);
            }
            l.esriLayer.show();
          }
        }
      });

      if (map.getLayer('labels')) {
        map.reorderLayer(map.getLayer('labels'), 200);
      }

      if (baseMapLayers) {
        //TODO: && settings.useWebmapBasemap
        baseMapLayers.forEach((baseMapLayer, i) => {
          if (baseMapLayer.id === 'defaultBasemap') {
            map.reorderLayer(map.getLayer(baseMapLayer.id), 0);
          } else {
            map.reorderLayer(map.getLayer(baseMapLayer.id), 1);
          }
        });
      }

      // Appending the mask to the end of the parent div to make sure mask is always on top of all layers
      var mask = document.getElementById('esri.Map_0_MASK');
      if (mask && mask.parentNode) {
        mask.parentNode.appendChild(mask);
      }
    });

    // Replace context.settings.layerPanel layers with the newly configured esriLayers
    Object.keys(layerPanel)
      .filter(
        groupKey =>
          // filter out the groups we don't need
          groupKey !== layerKeys.GROUP_BASEMAP &&
          groupKey !== layerKeys.GROUP_WEBMAP &&
          groupKey !== layerKeys.EXTRA_LAYERS
      )
      .forEach(group => {
        layerPanel[group].layers.map(l => {
          // for each layer, replace with the configured layer in 'layers'
          if (l.hasOwnProperty('nestedLayers')) {
            // this is a nested group
            l.nestedLayers.map(nl => {
              if (nl.url) {
                const nestedLayer = AppUtils.getObject(esriLayers, 'id', nl.id);
                nl.esriLayer = nestedLayer;
              }
              return nl;
            });
            return l;
          }
          // if this is not a nested layer
          // make sure it is not a webmap layer
          // (don't replace layers without a url property)
          if (l.url) {
            const layer = AppUtils.getObject(esriLayers, 'id', l.id);
            l.esriLayer = layer;
          }
          return l;
        });
      });

    layersCreated = true;

    //- Return the layers through the dispatcher so the mapstore can update visible layers
    return {
      layers,
      map
    };
  }

  toggleAnalysisTab(bool) {
    return bool;
  }

  updateExclusiveRadioIds(arr) {
    return arr;
  }

  updateAnalysisParams(params) {
    return params;
  }

  updateAnalysisSliderIndices = params => params;

  activateMeasurementButton(bool) {
    return bool;
  }

  activateDrawButton(bool) {
    return bool;
  }

  activateEnterValuesButton(bool) {
    return bool;
  }

  activateEditCoordinates(bool) {
    return bool;
  }

  toggleImageryVisible(bool) {
    return bool;
  }

  imageryFetchUpdate(bool) {
    return bool;
  }

  getSatelliteImagery(params) {
    return params;
  }

  setSelectedImagery(obj) {
    return obj;
  }

  setImageryHoverInfo(obj) {
    return obj;
  }

  setActiveFilters(obj) {
    return obj;
  }

  changeLayerVersion(obj) {
    return obj;
  }
  
  registeringGeometry(bool) {
    return bool;
  }
}

export default dispatcher.createActions(MapActions);
