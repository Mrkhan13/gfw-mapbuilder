import layerKeys from 'constants/LayerConstants';
import React, {PropTypes, Component} from 'react';
import mapActions from 'actions/MapActions';
// import CartoLegend from 'components/LegendPanel/CartoLegend';
import WebMapLegend from 'components/LegendPanel/WebMapLegend';
import WebMapFeatureLayerLegend from 'components/LegendPanel/WebMapFeatureLayerLegend';
import LayerLegend from 'components/LegendPanel/LayerLegend';
import {urls} from 'js/config';
import text from 'js/languages';

const closeSymbolCode = 9660,
    openSymbolCode = 9650;

export default class LegendPanel extends Component {

  static contextTypes = {
    webmapInfo: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  componentDidMount() {
    if (window && window.innerWidth > 950) {
      mapActions.toggleLegendVisible();
    }
  }

  getLayersForLegend (layers) {
    // Loop through layer ids and if those layers exist, add them to the legend
    // Add any layers we want to exclude from the legend to ignores, including basemapLayerIds
    // If a layer has a legendLayerId configured in the resources.js, you will probably want to add it here to prevent
    // two legends from the same service from showing up
    const ignores = [
      layerKeys.MASK,
      layerKeys.USER_FEATURES,
      layerKeys.LEGEND_LAYER
    ];

    const filteredLayers = layers.filter(l => ignores.indexOf(l.id) === -1);
    return filteredLayers;
  }

  createLegend = layer => {
    let childComponent;
    const {activeLayers, legendOpacity} = this.props;

    switch(layer.id) {
      case 'IFL':
        childComponent = <LayerLegend
          key={layer.id}
          url={layer.url}
          visibleLayers={activeLayers}
          layerIds={layer.layerIds}
          layerId={layer.id}
          legendOpacity={legendOpacity}
          defaultOpacity={layer.opacity || 1}
        />;
        break;
      case 'IMAZON_SAD':
        childComponent = <LayerLegend
          key={layer.id}
          url={layer.url}
          visibleLayers={activeLayers}
          layerIds={layer.layerIds}
          layerId={layer.id}
          legendOpacity={legendOpacity}
          defaultOpacity={layer.opacity || 1}
        />;
        break;
      case 'VIIRS_ACTIVE_FIRES':
        childComponent = <LayerLegend
          key={layer.id}
          url={layer.url}
          visibleLayers={activeLayers}
          layerIds={layer.layerIds}
          layerId={layer.id}
          legendOpacity={legendOpacity}
          defaultOpacity={layer.opacity || 1}
        />;
        break;
      case 'MODIS_ACTIVE_FIRES':
        childComponent = <LayerLegend
          key={layer.id}
          url={layer.url}
          visibleLayers={activeLayers}
          layerIds={layer.layerIds}
          layerId={layer.id}
          legendOpacity={legendOpacity}
          defaultOpacity={layer.opacity || 1}
        />;
        break;
      case 'GLOB_MANGROVE':
        childComponent = <LayerLegend
          key={layer.id}
          url={urls.esriLegendService}
          visibleLayers={activeLayers}
          layerIds={layer.legendLayer}
          layerId={layer.id}
          legendOpacity={legendOpacity}
          defaultOpacity={layer.opacity || 1}
        />;
        break;
      case 'AG_BIOMASS':
        childComponent = <LayerLegend
          key={layer.id}
          url={urls.esriLegendService}
          visibleLayers={activeLayers}
          layerIds={layer.legendLayer}
          layerId={layer.id}
          legendOpacity={legendOpacity}
          defaultOpacity={layer.opacity || 1}
        />;
        break;
      case 'TERRA_I_ALERTS':
        childComponent = <LayerLegend
          key={layer.id}
          url={urls.esriLegendService}
          visibleLayers={activeLayers}
          layerIds={layer.legendLayer}
          layerId={layer.id}
          legendOpacity={legendOpacity}
          defaultOpacity={layer.opacity || 1}
        />;
        break;
      case 'GLAD_ALERTS':
        childComponent = <LayerLegend
          key={layer.id}
          url={urls.esriLegendService}
          visibleLayers={activeLayers}
          layerIds={layer.legendLayer}
          layerId={layer.id}
          legendOpacity={legendOpacity}
          defaultOpacity={layer.opacity || 1}
        />;
        break;
      case 'TREE_COVER_GAIN':
        childComponent = <LayerLegend
          key={layer.id}
          url={urls.esriLegendService}
          visibleLayers={activeLayers}
          layerIds={layer.legendLayer}
          layerId={layer.id}
          legendOpacity={legendOpacity}
          defaultOpacity={layer.opacity || 1}
        />;
        break;
      case 'TREE_COVER_LOSS':
        childComponent = <LayerLegend
          key={layer.id}
          url={urls.esriLegendService}
          visibleLayers={activeLayers}
          layerIds={layer.legendLayer}
          layerId={layer.id}
          legendOpacity={legendOpacity}
          defaultOpacity={layer.opacity || 1}
        />;
        break;
      case 'LAND_COVER':
        childComponent = <LayerLegend
          key={layer.id}
          url={urls.esriLegendService}
          visibleLayers={activeLayers}
          layerIds={layer.legendLayer}
          layerId={layer.id}
          legendOpacity={legendOpacity}
          defaultOpacity={layer.opacity || 1}
        />;
        break;
      case 'TREE_COVER':
        childComponent = <LayerLegend
          key={layer.id}
          url={urls.esriLegendService}
          visibleLayers={activeLayers}
          layerIds={layer.legendLayer}
          layerId={layer.id}
          legendOpacity={legendOpacity}
          defaultOpacity={layer.opacity || 1}
        />;
        break;
      case 'SOIL_CARBON':
        const soilLayerConfig = this.context.settings.layerPanel.GROUP_LC.layers.filter(l => l.id === 'SOIL_CARBON')[0];
        childComponent = <WebMapLegend
          key={soilLayerConfig.id}
          legendConfig={soilLayerConfig.legend}
          labels={'Soil Organic Carbon'}
          layerId={soilLayerConfig.id}
          visibility={activeLayers.indexOf('SOIL_CARBON') > -1}
          visibleLayers={activeLayers}
          legendOpacity={legendOpacity}
          defaultOpacity={layer.opacity || 1}
        />;
        break;
      default:

        if (layer.hasOwnProperty('nestedLayers')) {
          childComponent = this.createNestedLegendGroups(layer);
        } else {
          childComponent = this.createWebmapLegend(layer);
        }
    }
    return childComponent;
  }

  createWebmapLegend = layer => {

    const { activeLayers, dynamicLayers, legendOpacity } = this.props;
    const { map } = this.context;

    if (layer.subId) {
      const scale = map.getScale();
      let visible = dynamicLayers.hasOwnProperty(layer.id) && dynamicLayers[layer.id].indexOf(layer.subIndex) > -1;

      if (layer.hasScaleDependency) {
        visible = dynamicLayers.hasOwnProperty(layer.id) && dynamicLayers[layer.id].indexOf(layer.subIndex) > -1 && layer.minScale >= scale && layer.maxScale <= scale;

        if (layer.minScale === 0) {
          visible = dynamicLayers.hasOwnProperty(layer.id) && dynamicLayers[layer.id].indexOf(layer.subIndex) > -1 && layer.maxScale <= scale;
        }

        if (layer.maxScale === 0) {
          visible = dynamicLayers.hasOwnProperty(layer.id) && dynamicLayers[layer.id].indexOf(layer.subIndex) > -1 && layer.minScale >= scale;
        }
      }

      const esriLayer = layer.esriLayer;

      return <WebMapLegend
        key={layer.subId}
        url={esriLayer.url}
        labels={layer.label}
        visibility={visible}
        visibleLayers={activeLayers}
        layerSubIndex={layer.subIndex}
        layerId={layer.subId}
        legendOpacity={legendOpacity}
        defaultOpacity={esriLayer.opacity || 1}
      />;


    } else {
      const esriLayer = layer.esriLayer;

      if (esriLayer.type === 'Feature Layer') {
        return <WebMapFeatureLayerLegend
          key={esriLayer.id}
          layer={esriLayer}
          visibility={activeLayers.indexOf(esriLayer.id) > -1 && esriLayer.visibleAtMapScale}
          visibleLayers={activeLayers}
          legendOpacity={legendOpacity}
          defaultOpacity={esriLayer.opacity || 1}
        />;
      } else {
        if (esriLayer.layerInfos && esriLayer.layerInfos.length > 0) {
          esriLayer.layerId = esriLayer.layerInfos[0].id;
        }

        return <WebMapLegend
          key={layer.id}
          url={esriLayer.url}
          labels={layer.label}
          visibility={activeLayers.indexOf(layer.id) > -1}
          visibleLayers={activeLayers}
          layerId={layer.id}
          layerSubIndex={esriLayer.layerId}
          legendOpacity={legendOpacity}
          defaultOpacity={esriLayer.opacity || 1}
        />;
      }
    }
  }

  createNestedLegendGroups = layerGroup => {
    const { activeLayers, legendOpacity } = this.props;
    const { language } = this.context;
    const nestedComponents = [];

    layerGroup.nestedLayers.forEach(layer => {
      // This is what we will use for mapbuilder
      // nestedComponents.push(this.createWebmapLegend(layer));

      // We need this custom (without labels) for landmark since they have layers that are named the same.
      nestedComponents.push(
        <WebMapLegend
          key={layer.id}
          url={layer.esriLayer.url}
          visibility={activeLayers.indexOf(layer.id) > -1}
          visibleLayers={activeLayers}
          layerSubIndex={1}
          layerId={layer.id}
          legendOpacity={legendOpacity}
          defaultOpacity={layer.opacity || 1}
        />
      );
    });

    const groupVisible = layerGroup.nestedLayers.some(l => activeLayers.indexOf(l.id) > -1);

    return (
      <div key={layerGroup.order} className={`nested-legend-group${groupVisible ? '' : ' hidden'}`}>
        <div className='nested-group-label'><strong>{layerGroup.label[language]}</strong></div>
        {nestedComponents}
      </div>
    );
  }

  render () {
    const {tableOfContentsVisible, legendOpen, allLayers} = this.props;
    const { language } = this.context;

    const legendLayers = this.getLayersForLegend(allLayers).sort((a, b) => b.order - a.order);
      // .reduce((prevArray, currentItem) => {
      //   if (currentItem.hasOwnProperty('nestedLayers')) {
      //     return prevArray.concat(...currentItem.nestedLayers);
      //   }
      //   return prevArray.concat(currentItem);
      // }, []).sort((a, b) => b.order - a.order);

    const legendComponents = legendLayers.map(this.createLegend);

    let rootClasses = legendOpen ? 'legend-panel map-component shadow' : 'legend-panel map-component shadow legend-collapsed';

    //- Hide the legend if the TOC is not visible (eye button)
    if (!tableOfContentsVisible) {
      rootClasses += ' hidden';
    }

    return (
      <div className={rootClasses}>

        <div className='legend-title mobile-hide' onClick={mapActions.toggleLegendVisible}>
          <span>
            {text[language].LEGEND}
          </span>
          <span className='layer-category-caret' onClick={mapActions.toggleLegendVisible}>
            {String.fromCharCode(legendOpen ? closeSymbolCode : openSymbolCode)}
          </span>
        </div>

        <div title='close' className='legend-close close-icon pointer mobile-show' onClick={mapActions.toggleLegendVisible}>
          <svg className='svg-icon'>
            <use xlinkHref="#shape-close" />
          </svg>
        </div>

        <div className='legend-layers'>
          <div className='legendContainer'>{legendComponents}</div>
        </div>
      </div>
    );
  }
}
