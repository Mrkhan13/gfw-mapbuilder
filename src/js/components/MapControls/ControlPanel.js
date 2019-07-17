import {prepareStateForShare} from 'utils/shareUtils';
import modalActions from 'actions/ModalActions';
import layerKeys from 'constants/LayerConstants';
import mapActions from 'actions/MapActions';
import {toQuerystring} from 'utils/params';
import basemapUtils from 'utils/basemapUtils';
import text from 'js/languages';
import moment from 'moment';
import SVGIcon from 'utils/svgIcon';
import React, {
  Component,
  PropTypes
} from 'react';

export default class ControlPanel extends Component {

  static contextTypes = {
    settings: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  zoomIn = () => {
    const {map} = this.context;
    map.setZoom(map.getZoom() + 1);
  };

  zoomOut = () => {
    const {map} = this.context;
    map.setZoom(map.getZoom() - 1);
  };

  search = () => {
    mapActions.toggleSearchModal({ visible: true });
  };

  formatDate = d => {
    if (d.constructor === Date) {
      d = moment(d);
    }
    return (d.month() + 1) + '-' + d.date() + '-' + d.year() + ' ' + d.hours() + ':' + d.minutes() + ':' + d.seconds();
  }

  share = () => {
    const {map, language, settings} = this.context;
    const {activeLayers, activeTab, canopyDensity, gladStartDate, gladEndDate, formaStartDate, formaEndDate,
      terraIStartDate, terraIEndDate, lossToSelectIndex, lossFromSelectIndex,
      imazonStartMonth, imazonEndMonth, imazonStartYear, imazonEndYear,
      viirsStartDate, viirsEndDate, modisStartDate, modisEndDate
    } = this.props;

    const visibleLayers = [];

    activeLayers.forEach(activeLayer => {
      if (activeLayer !== layerKeys.USER_FEATURES) {
        visibleLayers.push(activeLayer);
      }
    });

    modalActions.showShareModal(toQuerystring(prepareStateForShare({
      map: map,
      language: language,
      settings: settings,
      basemap: basemapUtils.getBasemap(),
      activeLayers: visibleLayers,
      activeTab: activeTab,
      gladStartDate: this.formatDate(gladStartDate),
      gladEndDate: this.formatDate(gladEndDate),
      formaStartDate: this.formatDate(formaStartDate),
      formaEndDate: this.formatDate(formaEndDate),
      terraIStartDate: this.formatDate(terraIStartDate),
      terraIEndDate: this.formatDate(terraIEndDate),
      lossToSelectIndex: lossToSelectIndex,
      lossFromSelectIndex: lossFromSelectIndex,
      imazonStartMonth: imazonStartMonth,
      imazonEndMonth: imazonEndMonth,
      imazonStartYear: imazonStartYear,
      imazonEndYear: imazonEndYear,
      viirsStartDate: this.formatDate(viirsStartDate),
      viirsEndDate: this.formatDate(viirsEndDate),
      modisStartDate: this.formatDate(modisStartDate),
      modisEndDate: this.formatDate(modisEndDate),
      canopyDensity: canopyDensity
    })));

    mapActions.toggleShareModal({ visible: true });
  };

  showAnalysisTools = () => {
    mapActions.toggleAnalysisModal({ visible: true });
  };

  showPrintTools = () => {
    mapActions.togglePrintModal({ visible: true });
  };

  showLegend = () => {
    mapActions.toggleLegendVisible();
  };

  showTimeline = () => {
    mapActions.toggleMobileTimeWidgetVisible();
  };

  togglePanels = () => {
    mapActions.toggleTOCVisible({ visible: !this.props.tableOfContentsVisible });
  };

  resetPage = () => {
    window.location.reload();
  };

  render () {
    const {tableOfContentsVisible, timeEnabled} = this.props;
    const {language} = this.context;

    return (
      <div className='control-panel map-component shadow'>
        <ul className='control-panel__list'>
          <li className='control-panel__zoom-out pointer' title={text[language].TOOL_ZOOM_OUT} onClick={this.zoomOut}>
            <SVGIcon id={'icon-minus'} />
          </li>
          <li className='control-panel__zoom-in pointer' title={text[language].TOOL_ZOOM_IN} onClick={this.zoomIn}>
            <SVGIcon id={'icon-plus'} />
          </li>
          <li className='control-panel__share-map pointer' title={text[language].TOOL_SHARE} onClick={this.share}>
            <SVGIcon id={'icon-share'} />
          </li>
          <li className='control-panel__print pointer mobile-hide' title={text[language].TOOL_PRINT} onClick={this.showPrintTools}>
            <SVGIcon id={'icon-print'} />
          </li>
          <li className='control-panel__draw-upload pointer' title={text[language].TOOL_ANALYSIS} onClick={this.showAnalysisTools}>
            <SVGIcon id={'icon-draw-upload'} />
          </li>
          <li className='control-panel__locate-me pointer' title={text[language].SEARCH} onClick={this.search}>
            <SVGIcon id={'icon-control-search'} />
          </li>
          <li className='control-panel__toggle-panels pointer mobile-hide' title={text[language].TOOL_TOGGLE} onClick={this.togglePanels}>
            {tableOfContentsVisible ?
              <SVGIcon id={'icon-controls-toggle__on'} /> :
              <SVGIcon id={'icon-controls-toggle__off'} />
            }
          </li>
          <li className='control-panel__reset pointer mobile-hide' title={text[language].TOOL_RESET} onClick={this.resetPage}>
            <SVGIcon id={'icon-reset'} />
          </li>
          <li className='control-panel__legend pointer mobile-show' title={text[language].LEGEND} onClick={this.showLegend}>
            <SVGIcon id={'icon-legend'} />
          </li>
          <li className={`control-panel__legend pointer mobile-show ${timeEnabled ? '' : 'hidden'}`} title={text[language].TIMELINE} onClick={this.showTimeline}>
            <SVGIcon id={'icon-timeline'} />
          </li>
        </ul>
      </div>
    );
  }

}
