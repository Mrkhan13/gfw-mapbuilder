import React, { Component, PropTypes } from 'react';
import layerFactory from 'utils/layerFactory';


export default class LayerVersions extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      versions: props.layer.versions,
      selected: null
    };
  }

  componentWillMount() {
    const { layer } = this.props;
    this.setState({ selected: layer.versions[0].label[this.context.language]});
  }

  renderVersionOptions = (version, i) => {
    return <option value={version.label[this.context.language]} key={`option-${i}`}>{version.label[this.context.language]}</option>;
  }

  onSelectVersion = (e) => {
    const { map, language } = this.context;
    const { layer } = this.props;
    const mapLayer = map.getLayer(layer.id);
    const selected = e.target.value;

    this.setState({ selected });

    if (layer.type === 'dynamic') {
      const versionObj = this.state.versions.find((version) => version.label[language] === selected);
      const service = versionObj.service[language];
      console.log(service);

      if (layer.url !== service.url) {
        map.removeLayer(mapLayer);
        delete layer.esriLayer;
        layer.url = service.url;
        layer.layerIds = service.layerIds;
        const newLayer = layerFactory(layer, language);
        map.addLayer(newLayer);
      } else {
        mapLayer.setVisibleLayers(service.layerIds);

      }
      mapLayer.refresh();
    }
  }

  render () {
    const { versions, selected } = this.state;

    return (
      <div className='layer-versions'>
        <div className='relative'>
          <select onChange={this.onSelectVersion} value={selected}>
            {versions.map(this.renderVersionOptions)}
          </select>
          <div className='fa-button sml white'>{selected}</div>
        </div>
      </div>
    );
  }
}
