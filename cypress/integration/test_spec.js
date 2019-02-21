
describe('An actual test on our app', function () {
  it('Ensures our external constructor has the correct properties', function () {

    cy.visit('https://beta.blueraster.io/mapbuilder/external-debugging/index.html', {
      onLoad: (winn) => {
        const app = winn.customApp;
        expect(app).to.not.be.an('undefined');

        const config = app.constructorArgs;
        expect(config).to.not.be.an('undefined');

        const el = config.el;
        expect(el).to.not.be.an('undefined');

        const version = config.version;
        expect(version).to.not.be.an('undefined');
        expect(version).to.be.a('string');

        const cssPath = config.cssPath;
        if (cssPath) {
          expect(cssPath).to.be.a('string');
        }
      }
    });

  });

  it('Tests our library constructor parameters', function () {

    cy.visit('https://beta.blueraster.io/mapbuilder/external-debugging/index.html', {

      onLoad: (winn) => {

        const app = winn.customApp;
        expect(app).to.not.be.an('undefined');

        const constructorParams = app.constructorArgs;
        expect(constructorParams).to.not.be.an('undefined');

        const config = constructorParams.config;
        expect(config).to.not.be.an('undefined');

        if (config.subscriptionEventName) {
          expect(config.subscriptionEventName).to.be.a('string');
          // try {
          //   const listeners = win.getEventListeners(win);
          //   console.log('listeners', listeners); //ensure config.subscriptionEventName is in here!
          // } catch (e) {
          //   console.log('We could not get event listeners on the window!');
          // } finally {
          //   expect(config.subscriptionEventName).to.be.a('string');
          // }
        }

        if (config.useAlternativeLanguage) {
          const alternativeLanguage = config.alternativeLanguage;
          expect(alternativeLanguage).to.not.be.an('undefined');
        }

        if (config.initialExtent) {
          const { initialExtent } = config;
          expect(config.initialExtent).to.be.a('object');

          expect(config.initialExtent).to.have.property('x');
          expect(config.initialExtent).to.have.property('y');
          expect(config.initialExtent).to.have.property('z');

          if (initialExtent.x && initialExtent.y && initialExtent.z) {
            expect(config.initialExtent.x).to.be.a('number');
            expect(config.initialExtent.y).to.be.a('number');
            expect(config.initialExtent.z).to.be.a('number');

            expect(config.initialExtent.x).to.be.greaterThan(-181);
            expect(config.initialExtent.x).to.be.lessThan(181);

            expect(config.initialExtent.y).to.be.greaterThan(-91);
            expect(config.initialExtent.y).to.be.lessThan(91);

            expect(config.initialExtent.z).to.be.greaterThan(0);
            expect(config.initialExtent.z).to.be.lessThan(21);
          }

        }

        if (config.includeCartoTemplateLayers) {
          const cartoTemplateId = config.cartoTemplateId;
          expect(cartoTemplateId).to.not.be.an('undefined');
          const cartoApiKey = config.cartoApiKey;
          expect(cartoApiKey).to.not.be.an('undefined');
          const cartoGroupLabel = config.cartoGroupLabel;
          expect(cartoGroupLabel).to.not.be.an('undefined');
          expect(config.cartoGroupLabel).to.have.property(config.language);
        }

        if (config.layerPanel) {
          if (config.layerPanel.GROUP_WEBMAP) {
            expect(config.layerPanel).to.have.property('GROUP_WEBMAP');
            expect(config.layerPanel.GROUP_WEBMAP).to.have.property('label');
            expect(config.layerPanel.GROUP_WEBMAP).to.have.property('layers');
            assert.isArray(config.layerPanel.GROUP_WEBMAP.layers, 'value is array');
          }

          if (config.layerPanel.GROUP_BASEMAP) {
            expect(config.layerPanel).to.have.property('GROUP_BASEMAP');
            expect(config.layerPanel.GROUP_BASEMAP).to.have.property('label');
            expect(config.layerPanel.GROUP_BASEMAP).to.have.property('layers');
            assert.isArray(config.layerPanel.GROUP_BASEMAP.layers, 'value is array');
          }

          if (config.layerPanel.extraLayers) {
            expect(config.layerPanel).to.have.property('extraLayers');
            assert.isArray(config.layerPanel.extraLayers, 'value is array');
          }

          const layerPanelKeys = Object.keys(config.layerPanel).filter(g => g !== 'GROUP_BASEMAP' && g !== 'GROUP_WEBMAP' && g !== 'extraLayers');
          const allLayers = layerPanelKeys.map(k => config.layerPanel[k].layers).reduce((acc, current) => [...acc, ...current], []);

          console.log('allLayers', allLayers);

          allLayers.forEach((layer) => {
            if (layer.type === 'wms') { //has a layerName property if it is a WMSLayer
              expect(layer).to.have.property('layerName');
              expect(layer.layerName).to.be.a('string');
            }
            if (layer.type !== 'imagery') {
              expect(layer).to.have.property('url');
            }

            expect(layer).to.have.property('id');
            expect(layer).to.have.property('type');
            expect(layer).to.have.property('label');
            expect(layer.label).to.have.property(config.language);
          });
        }

        if (config.analysisModules) {
          config.analysisModules.forEach((module) => {
            expect(module.label).to.have.property(config.language);
            expect(module).to.have.property('analysisId');

            if (module.useGfwWidget) {
              expect(module).to.have.property('widgetId');
              expect(module).not.to.have.property('chartType');
            } else {
              expect(module).to.have.property('chartType');
            }

            // if (module.params) {
            //   expect(module.params).to.be.instanceOf(Array);
            //
            //   module.params.forEach((param) => {
            //     expect(param).to.have.property('name');
            //     expect(param).to.have.property('value');
            //   });
            // }

            if (module.analysisId !== 'LCC') {
              // expect(module.chartType).not.toEqual('lccPie');
              expect(module.chartType).to.not.equal('lccPie');
            }

            if (module.analysisId !== 'BIO_LOSS') {
              expect(module.chartType).to.not.equal('biomassLoss');
              // expect(module.chartType).not.toEqual('biomassLoss');
            }

            if (module.analysisId !== 'TC_LOSS_GAIN' && module.analysisId !== 'VIIRS_FIRES' && module.chartType === 'badge') {
              expect(module).to.have.property('badgeLabel');
              expect(module.badgeLabel).to.have.property(config.language);
            }

            if (module.chartType === 'bar') {
              expect(module).to.have.property('chartBounds');
              expect(module.chartBounds).to.have.lengthOf(2);
            }

            if (typeof module.uiParams === 'string') {
              expect(module.uiParams).to.equal('none');
            } else {
              // expect(module.uiParams).to.be.instanceOf(Array);

              module.uiParams.forEach((uiParam) => {
                expect(uiParam.label).to.have.property(config.language);
                expect(uiParam).to.have.property('inputType');

                if (uiParam.inputType === 'tcd') {
                  expect(uiParam).to.have.property('name');
                } else if (uiParam.inputType === 'rangeSlider') {
                  expect(uiParam).to.have.property('startParamName');
                  expect(uiParam).to.have.property('bounds');
                  // expect(uiParam.bounds).to.be.instanceOf(Array);
                  expect(uiParam.bounds).to.have.lengthOf(2);
                  expect(uiParam).to.have.property('combineParams');

                  if (uiParam.combineParams) {
                    expect(uiParam).to.have.property('valueSeparator');
                  } else {
                    expect(uiParam).to.have.property('endParamName');
                  }
                } else if (uiParam.inputType === 'datepicker') {
                  expect(uiParam).to.have.property('startParamName');
                  expect(uiParam).to.have.property('multi');

                  if (uiParam.multi) {
                    expect(uiParam).to.have.property('combineParams');

                    if (uiParam.combineParams) {
                      expect(uiParam).to.have.property('valueSeparator');
                    } else {
                      expect(uiParam).to.have.property('endParamName');
                    }
                  }

                  if (uiParam.minDate) { expect(uiParam.minDate).to.match(/\d{4}-\d{2}-\d{2}/); }
                }
              });
            }
          });
        }

      }

    });
  });

});
