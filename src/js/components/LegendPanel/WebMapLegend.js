import Request from 'utils/request';
import React from 'react';

export default class WebMapLegend extends React.Component {

  constructor (props) {
    super(props);
    this.state = { legendInfos: [], visible: this.props.visibility };
  }

  componentDidUpdate(prevProps) {

    if (prevProps.visibility !== this.props.visibility) {
      this.setState(prevState => {
        return {
          visible: !prevState.visible
        };
      });
    }
  }

  componentDidMount() {
    const layerID = this.props.layerSubIndex ? this.props.layerSubIndex : this.props.layerId;
    Request.getLegendInfos(this.props.url, [layerID]).then(legendInfos => {
      if(this.refs.myRef) {
        this.setState({ legendInfos: legendInfos });
      }
    });
  }

  itemMapper (item) {
    return (
      <div className='legend-row' key={item.url}>
        <img className='legend-icon' title={item.label} src={`data:image/png;base64,${item.imageData}`} />
        <div className='legend-label'>{item.label}</div>
      </div>
    );
  }

  render () {
    const { visible, legendInfos } = this.state;
    const label = this.props.labels;

    return (
      <div className={`parent-legend-container ${visible ? '' : 'hidden'}`} ref="myRef">
        <div className='label-container'>{label}</div>
        <div className='legend-container'>
          {legendInfos.length === 0 ? '' :
            <div className='crowdsource-legend'>
              {legendInfos.map(this.itemMapper, this)}
            </div>
          }
        </div>
      </div>
    );
  }
}
