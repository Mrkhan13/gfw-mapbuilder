import React, { Component } from 'react';
import charts from 'utils/charts';
import SVGIcon from 'utils/svgIcon';
import { urls } from 'js/config';

export default class VegaChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isError: false,
      errorMsg: null,
      showDownloadOptions: false,
      downloadOptions: [],
      chartDownloadTitle: 'analysis.png',
      chartImgDownloadUrl: null,
    };
  }

  handleError(errorMsg) {
    this.setState({ isError: true, errorMsg });
    if (this.props.setLoading) {
      this.props.setLoading();
    }
  }

  componentDidMount() {
    if (this.props.results.hasOwnProperty('error')) {
      this.handleError();
    } else {
      const config = this.props.results.data.attributes.widgetConfig;
      const {setLoading, language} = this.props;
      if (config.data[0].url.indexOf('?&') > -1){
        const urlPieces = config.data[0].url.split('?&');
        config.data[0].url = urlPieces[0] + '?' + urlPieces[1];
      }

      fetch(config.data[0].url).then(res => {
        if (res.status !== 200) {
          this.handleError('Error creating analysis.');
        } else {
          res.json().then(json => {
            charts.makeVegaChart(this.chart, config, language, setLoading, this.addChartDownload);
            const downloadOptions = [];
            const downloadUrls = json.data.attributes.downloadUrls;
            if (downloadUrls && !config.title) {
              const label = 'csv';
              downloadOptions.push({label, url: downloadUrls[label]});
            }
            const chartDownloadTitle = json.data.type + '-analysis.png';
            this.setState({ downloadOptions, chartDownloadTitle });
          });
        }
      })
      .catch(() => this.handleError('Error creating analysis.'));
    }
  }

  addChartDownload = (url) => {
    this.setState({ chartImgDownloadUrl: url });
  };

  renderdownloadOptions = (option, i) => {
    const baseUrl = urls.analysisDataBaseUrl;
    return (
      <a href={option.url.includes('cartodb') ? option.url : baseUrl + option.url} target="_blank" download key={`option-${i}`}>
        <span className='download-option-label'>Download Alerts as .CSV</span>
      </a>
    );
  };

  render() {
    const { isError, errorMsg, showDownloadOptions, downloadOptions, chartDownloadTitle, chartImgDownloadUrl } = this.state;
    const { results } = this.props;
    //console.log('results', results);
    if (isError) {
      return (
        <div className='data-error'>
          <h5>{results.message || errorMsg}</h5>
        </div>
      );
    } else {
      return (
        <div className='vega-chart_container'>
          { showDownloadOptions &&
            <div className='vega-chart_click-area' onClick={() => this.setState({ showDownloadOptions: false })}></div> }
          <div className='vega-chart_download-container'>
            <h3 className="vega-chart-label">{results.data.attributes.name}</h3>
            <div className='vega-chart-menu' onClick={() => this.setState({showDownloadOptions: !showDownloadOptions})}>
              <SVGIcon className="vega-chart-menu-icon" id={'gear-icon'} /><span className="vega-chart-menu-text">SETTINGS</span>
            </div>

            { showDownloadOptions &&
              <div className='vega-chart_download-options' onClick={() => this.setState({showDownloadOptions: !showDownloadOptions})}>
                {downloadOptions.map(this.renderdownloadOptions)}
                {this.chart &&
                  <a className="download-option" href={chartImgDownloadUrl} download={chartDownloadTitle}>
                    <span className='download-option-label'>Download PNG</span>
                  </a>
                }
              </div> }

          </div>
          <div className='vega-chart' id='AnalysisVegaChart' ref={(chart) => { this.chart = chart; }}></div>
        </div>
      );
    }
  }
}
