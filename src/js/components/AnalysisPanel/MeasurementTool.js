import Measurement from 'esri/dijit/Measurement';
import SimpleFillSymbol from 'esri/symbols/SimpleFillSymbol';
import SimpleLineSymbol from 'esri/symbols/SimpleLineSymbol';
import Color from 'esri/Color';
import React, {
  Component,
  PropTypes
} from 'react';

let measurementDiv;
let lastMapId;

export default class MeasurementTool extends Component {
  static contextTypes = {
    map: PropTypes.object.isRequired
  }

  initialized = false

  componentWillUpdate(prevProps, prevState, prevContext) {
    
    if (
      this.context.map.loaded
      // the Measurement tool depends on navigationManager so we
      // need to explicitly check for that before starting the widget
      && this.context.map.navigationManager
      && !this.initialized
      && this.measurementContainer
    ) {
      this.initialized = true;

      if (measurementDiv) {
        measurementDiv = document.createElement('DIV');
        measurementDiv.setAttribute('id', this.context.map.id + '-measure-div');
        this.measurementContainer.appendChild(measurementDiv);
        this.measurement = new Measurement({
          map: this.context.map
        }, measurementDiv);
        this.measurement.startup();

        const oldMeasure = document.getElementById(lastMapId + '-measure-div');
        oldMeasure.classList.add('hidden');
        lastMapId = this.context.map.id;
      } else {
        measurementDiv = document.createElement('DIV');
        measurementDiv.setAttribute('id', this.context.map.id + '-measure-div');
        this.measurementContainer.appendChild(measurementDiv);
        this.measurement = new Measurement({
          map: this.context.map
        }, measurementDiv);
        this.measurement.startup();
        lastMapId = this.context.map.id;
      }


      //- Show the selected feature highlight again if not using the measurement tool
      this.measurement.on('tool-change', evt => {
        if (!evt.toolName) {
          brApp.map.infoWindow.fillSymbol = new SimpleFillSymbol()
          .setOutline(new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 255, 1]), 2))
          .setColor(new Color([0, 0, 0, 0]));
          brApp.map.setInfoWindowOnClick(true);
        }
      });

      brApp.map.measurement = this.measurement;
    }

    if (prevContext.map !== undefined && prevContext.map.id !== this.context.map.id) {
      if (this.context.map.destroy && this.initialized) {
        this.measurement.clearResult();
        this.initialized = false;
      }
    }
  }
  
  componentWillUnmount() {
    this.measurement.destroy();
  }

  render () {
    return <div
      ref={(div) => { this.measurementContainer = div; }}
      className='measurement-container'
    />;
  }

}

MeasurementTool.propTypes = {
  embeddedInModal: PropTypes.bool
};
