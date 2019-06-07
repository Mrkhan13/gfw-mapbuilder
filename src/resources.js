/* eslint-disable no-mixed-spaces-and-tabs */
export default {
  //- NOTE: New Forest Atlas 2.0 Options, These are the raw values coming from ArcGIS Online from
  //- General Settings
  // webmap to use for testing metadata.xml fetching/parsing - 4d426ef4be0f483e9dab047fbb4c6718
  // webmap to use for testing document attachments - b514d31339954ba9a0c5822135bc2001
  // webmap to use for testing time enabled layers - 9416e5b5beea4d329dbbfdc3312d2c35
  // webmap to use for deployment, this should be the default - de85e3fcc07948238aa6c1afd2a4ceb0
  webmap: 'de85e3fcc07948238aa6c1afd2a4ceb0',
  title: 'GFW Mapbuilder',
  subtitle: 'Make maps that matter',
  logoUrl: 'https://my.gfw-mapbuilder.org/img/gfw-logo.png',
  logoLinkUrl: 'https://www.gfw-mapbuilder.org/',
  aboutLinkUrl: '', // http://www.gfw-mapbuilder.org/
  downloadLinkUrl: '', // http://data.globalforestwatch.org/
  printServiceUrl: 'https://gis.forest-atlas.org/server/rest/services/print/ExportWebMap/GPServer/Export%20Web%20Map',
  maskServiceUrl: '', // e.g. http://gis-forest-atlas.wri.org/arcgis/rest/services/CMR/CMR_00_Africa/MapServer
  mapThemeIds: '', // e.g. 1c38ba1095fe49e3ba234bf9105c1077;c76d788b7487476bae4d09a4e933be19
  mapThemes: '', // e.g. Forest Atlas of Cameroon;Forest Atlas of Equatorial Guinea
  narrative: '',
  hideHeader: false,
  hideFooter: false,
  includeMyGFWLogin: true,
  navLinksInNewTab: false,
  //- Language Settings
  language: 'en',
  useAlternativeLanguage: false,
  alternativeWebmap: '',
  alternativeLanguage: 'fr',
  alternativeLanguageTitle: 'GFW Mapbuilder',
  alternativeLanguageSubtitle: 'Make maps that matter',
  alternativeMapThemes: '', // e.g. Forest Atlas of Cameroon;Forest Atlas of Equatorial Guinea
  alternativeNarrative: '',
  alternativeWebmapMenuName: 'Land Use',
  initialExtent: {
    x: null, // -122.3,
    y: null, // 47.6,
    z: null, // 9,
  },
  //- Tab Settings
  includeDocumentsTab: false,
  includeMeasurementTab: false,
  //- Layers/Analysis Settings
  iso: '',
  viirsFires: true,
  modisFires: true,
  intactForests: true,
  primaryForests: true,
  forma: false,
  aboveGroundBiomass: true,
  landCover: true,
  mangroves: false,
  sadAlerts: true,
  gladAlerts: true,
  terraIAlerts: false,
  recentImagery: true,
  webmapMenuName: 'Land Use',
  //- Include/Exclude various restoration analysis types
  restorationSlope: true, //- Main Slope Analysis
  restorationSlopePotential: true, //- Part of the various restoration options
  restorationTreeCover: true,
  restorationLandCover: true,
  restorationPopulation: true,
  restorationRainfall: true,

  // Options not configurable from AGOL but can be from here
  restorationChartDescription: 'Some explanatory text for this anlaysis',
  restorationTableDescription: 'Some explanatory text for this anlaysis',
  slopeDescription: 'Some explanatory text for this anlaysis',
  alternativeRestorationChartDescription: 'Some explanatory text for this anlaysis',
  alternativeRestorationTableDescription: 'Some explanatory text for this anlaysis',
  alternativeSlopeDescription: 'Some explanatory text for this anlaysis',
  // DO NOT MODIFY SHARINGHOST unless you are configuring this for a Portal Environment
  sharinghost: 'https://www.arcgis.com',
  analyticsCode: '',
  includeCartoTemplateLayers: false,
  cartoUser: 'wri-01',
  cartoTemplateId: 'tpl_07c315f8_c13e_11e4_b457_0e8dde98a187',
  cartoApiKey: 'your key here',
  cartoGroupLabel: {
    en: 'Carto Layers',
    fr: 'Carto Layers',
  },

  /**
  * Custom Analysis Module Configuration
  * This section provides the opportunity to define additional custom analysis modules.
  * The modules are dependent on gfw widgets registered to the GFW API, so if you would
  * like to define a custom module, you must first create a widget and register it.
  *
  * (we probably will NOT use the value property. we will just loop through all analysisModules
  * and create a dropdown option for each if they have all of the required properties. maybe they have an order to sort them? This also
  * means that all of the standard analyses will get their own entry in this array.)
  * @property {string} value - a unique value for this analysis module
  * @property {string} label - the label for the analysis in the dropdown
  * @property {string} widgetId - the widgetId from the gfw-api
  * @property {object[]} params - any params to pass along with the query url
  * @property {string} params[].key - query param key
  * @property {string} params[].value - query param value
  *
  * (geostore is automatically appended with each request)
  */
  "analysisModules": [{
      "analysisId": "TC_LOSS_GAIN",
      "label": {
        "en": "Total tree cover loss/ gain",
        "fr": "Total perte/ gain en couvert arboré",
        "es": "Pérdida/ Aumento de la cobertura arbórea",
        "pt": "Perda/ Ganho de cobertura arbórea",
        "id": "Total tree cover loss/ gain",
        "zh": "森林覆盖损失/ 森林覆盖增加",
        "ka": "ხის ვარჯის კარგვა/ ნამატი"
      },
      "title": {
        "en": "Total Tree Cover Loss / Gain",
        "fr": "Total Tree Cover Loss / Gain",
        "es": "Total Tree Cover Loss / Gain",
        "pt": "Total Tree Cover Loss / Gain",
        "id": "Total Tree Cover Loss / Gain",
        "zh": "Total Tree Cover Loss / Gain",
        "ka": "Total Tree Cover Loss / Gain"
      },
      "description": {
        "en": "Tree cover loss is not always deforestation. Select range and tree cover density then click the run analysis button to see results.",
        "fr": "Tree cover loss is not always deforestation. Select range and tree cover density then click the run analysis button to see results.",
        "es": "Tree cover loss is not always deforestation. Select range and tree cover density then click the run analysis button to see results.",
        "pt": "Tree cover loss is not always deforestation. Select range and tree cover density then click the run analysis button to see results.",
        "id": "Tree cover loss is not always deforestation. Select range and tree cover density then click the run analysis button to see results.",
        "zh": "Tree cover loss is not always deforestation. Select range and tree cover density then click the run analysis button to see results.",
        "ka": "Tree cover loss is not always deforestation. Select range and tree cover density then click the run analysis button to see results."
      },
      "useGfwWidget": true,
      "widgetId": "e6c01eff-0d79-4865-a431-65d6adb89589",
      "uiParams": [{
          "inputType": "rangeSlider",
          "startParamName": "period",
          "combineParams": true,
          "valueSeparator": ",",
          "bounds": [2001,
            2017
          ],
          "valueType": "date",
          "label": {
            "en": "Select range for analysis",
            "fr": "Select range for analysis",
            "es": "Select range for analysis",
            "pt": "Select range for analysis",
            "id": "Select range for analysis",
            "zh": "Select range for analysis",
            "ka": "Select range for analysis"
          }
        },
        {
          "name": "thresh",
          "inputType": "tcd",
          "label": {
            "en": "Select tree cover density: ",
            "fr": "Select tree cover density: ",
            "es": "Select tree cover density: ",
            "pt": "Select tree cover density: ",
            "id": "Select tree cover density: ",
            "zh": "Select tree cover density: ",
            "ka": "Select tree cover density: "
          }
        }
      ]
    },
    {
      "analysisId": "TC_LOSS",
      "label": {
        "en": "Annual tree cover loss",
        "fr": "Perte en couvert arboré",
        "es": "Pérdida de la cobertura arbórea",
        "pt": "Perda de cobertura arbórea",
        "id": "Tree cover loss",
        "zh": "森林覆盖损失",
        "ka": "ხის ვარჯის კარგვა"
      },
      "title": {
        "en": "Annual Tree Cover Loss",
        "fr": "Perte en couvert arboré",
        "es": "Pérdida de la cobertura arbórea",
        "pt": "Perda de cobertura arbórea",
        "id": "Tree cover loss",
        "zh": "森林覆盖损失",
        "ka": "ხის ვარჯის კარგვა"
      },
      "description": {
        "en": "Tree cover loss is not always deforestation. Select range and tree cover density then click the run analysis button to see results.",
        "fr": "Tree cover loss is not always deforestation. Select range and tree cover density then click the run analysis button to see results.",
        "es": "Tree cover loss is not always deforestation. Select range and tree cover density then click the run analysis button to see results.",
        "pt": "Tree cover loss is not always deforestation. Select range and tree cover density then click the run analysis button to see results.",
        "id": "Tree cover loss is not always deforestation. Select range and tree cover density then click the run analysis button to see results.",
        "zh": "Tree cover loss is not always deforestation. Select range and tree cover density then click the run analysis button to see results.",
        "ka": "Tree cover loss is not always deforestation. Select range and tree cover density then click the run analysis button to see results."
      },
      "chartBounds": [2001, 2017],
      "useGfwWidget": true,
      "widgetId": "23c064f5-fc93-4888-9db7-6d34c8681dd6",
      "uiParams": [{
          "inputType": "rangeSlider",
          "startParamName": "period",
          "combineParams": true,
          "valueSeparator": ",",
          "bounds": [2001,
            2017
          ],
          "valueType": "date",
          "label": {
            "en": "Select range for analysis",
            "fr": "Select range for analysis",
            "es": "Select range for analysis",
            "pt": "Select range for analysis",
            "id": "Select range for analysis",
            "zh": "Select range for analysis",
            "ka": "Select range for analysis"
          }
        },
        {
          "name": "thresh",
          "inputType": "tcd",
          "label": {
            "en": "Select tree cover density: ",
            "fr": "Select tree cover density: ",
            "es": "Select tree cover density: ",
            "pt": "Select tree cover density: ",
            "id": "Select tree cover density: ",
            "zh": "Select tree cover density: ",
            "ka": "Select tree cover density: "
          }
        }
      ]
    },
    {
      "analysisId": "IFL",
      "label": {
        "en": "Annual tree cover loss in IFL",
        "fr": "Paysage forestier intact",
        "es": "Paisajes Forestales Intactos",
        "pt": "Paisagens Florestais Intactas",
        "id": "Intact Forest Landscape",
        "zh": "原生森林景观",
        "ka": "ხელუხლებელი ტყის ლანდშაფტი"
      },
      "title": {
        "en": "Annual Tree Cover Loss in Intact Forest Landscape (IFL)",
        "fr": "Paysage forestier intact",
        "es": "Paisajes Forestales Intactos",
        "pt": "Paisagens Florestais Intactas",
        "id": "Intact Forest Landscape",
        "zh": "原生森林景观",
        "ka": "ხელუხლებელი ტყის ლანდშაფტი"
      },
      "description": {
        "en": "Tree cover loss is not always deforestation. Results will not be available if the area you selected does not include IFL. Select range and tree cover density then click the run analysis button to see results. ",
        "fr": "Tree cover loss is not always deforestation. Results will not be available if the area you selected does not include IFL. Select range and tree cover density then click the run analysis button to see results. ",
        "es": "Tree cover loss is not always deforestation. Results will not be available if the area you selected does not include IFL. Select range and tree cover density then click the run analysis button to see results. ",
        "pt": "Tree cover loss is not always deforestation. Results will not be available if the area you selected does not include IFL. Select range and tree cover density then click the run analysis button to see results. ",
        "id": "Tree cover loss is not always deforestation. Results will not be available if the area you selected does not include IFL. Select range and tree cover density then click the run analysis button to see results. ",
        "zh": "Tree cover loss is not always deforestation. Results will not be available if the area you selected does not include IFL. Select range and tree cover density then click the run analysis button to see results. ",
        "ka": "Tree cover loss is not always deforestation. Results will not be available if the area you selected does not include IFL. Select range and tree cover density then click the run analysis button to see results. "
      },
      "useGfwWidget": true,
      "widgetId": "d0d22aeb-9642-4c4d-a310-f7fb95a48c21",
      "params": [{
        "name": "layer",
        "value": "ifl2000"
      }],
      "uiParams": [{
          "inputType": "rangeSlider",
          "startParamName": "period",
          "combineParams": true,
          "valueSeparator": ",",
          "bounds": [2001,
            2017
          ],
          "valueType": "date",
          "label": {
            "en": "Select range for analysis",
            "fr": "Select range for analysis",
            "es": "Select range for analysis",
            "pt": "Select range for analysis",
            "id": "Select range for analysis",
            "zh": "Select range for analysis",
            "ka": "Select range for analysis"
          }
        },
        {
          "name": "thresh",
          "inputType": "tcd",
          "label": {
            "en": "Select tree cover density: ",
            "fr": "Select tree cover density: ",
            "es": "Select tree cover density: ",
            "pt": "Select tree cover density: ",
            "id": "Select tree cover density: ",
            "zh": "Select tree cover density: ",
            "ka": "Select tree cover density: "
          }
        }
      ]
    },
    {
      "analysisId": "Loss_LandCover",
      "label": {
        "en": "Annual tree cover loss by land cover class",
        "fr": "Paysage forestier intact",
        "es": "Paisajes Forestales Intactos",
        "pt": "Paisagens Florestais Intactas",
        "id": "Intact Forest Landscape",
        "zh": "原生森林景观",
        "ka": "ხელუხლებელი ტყის ლანდშაფტი"
      },
      "title": {
        "en": "Annual Tree Cover Loss By Land Cover Class",
        "fr": "Paysage forestier intact",
        "es": "Paisajes Forestales Intactos",
        "pt": "Paisagens Florestais Intactas",
        "id": "Intact Forest Landscape",
        "zh": "原生森林景观",
        "ka": "ხელუხლებელი ტყის ლანდშაფტი"
      },
      "description": {
        "en": "Tree cover loss is not always deforestation. Land cover data is from 2000 and provided by the European Space Agency (ESA), the data was reclassified according to IPCC categories. Select range and tree cover density then click the run analysis button to see results.",
        "fr": "Tree cover loss is not always deforestation. Land cover data is from 2000 and provided by the European Space Agency (ESA), the data was reclassified according to IPCC categories. Select range and tree cover density then click the run analysis button to see results.",
        "es": "Tree cover loss is not always deforestation. Land cover data is from 2000 and provided by the European Space Agency (ESA), the data was reclassified according to IPCC categories. Select range and tree cover density then click the run analysis button to see results.",
        "pt": "Tree cover loss is not always deforestation. Land cover data is from 2000 and provided by the European Space Agency (ESA), the data was reclassified according to IPCC categories. Select range and tree cover density then click the run analysis button to see results.",
        "id": "Tree cover loss is not always deforestation. Land cover data is from 2000 and provided by the European Space Agency (ESA), the data was reclassified according to IPCC categories. Select range and tree cover density then click the run analysis button to see results.",
        "zh": "Tree cover loss is not always deforestation. Land cover data is from 2000 and provided by the European Space Agency (ESA), the data was reclassified according to IPCC categories. Select range and tree cover density then click the run analysis button to see results.",
        "ka": "Tree cover loss is not always deforestation. Land cover data is from 2000 and provided by the European Space Agency (ESA), the data was reclassified according to IPCC categories. Select range and tree cover density then click the run analysis button to see results."
      },
      "useGfwWidget": true,
      "widgetId": "e2ccdd72-1611-4a41-abd6-23b5cee61fa6",
      "params": [{
        "name": "layer",
        "value": "gfw-landcover-2015"
      }],
      "uiParams": [{
          "inputType": "rangeSlider",
          "startParamName": "period",
          "combineParams": true,
          "valueSeparator": ",",
          "bounds": [2001,
            2017
          ],
          "valueType": "date",
          "label": {
            "en": "Select range for analysis",
            "fr": "Select range for analysis",
            "es": "Select range for analysis",
            "pt": "Select range for analysis",
            "id": "Select range for analysis",
            "zh": "Select range for analysis",
            "ka": "Select range for analysis"
          }
        },
        {
          "name": "thresh",
          "inputType": "tcd",
          "label": {
            "en": "Select tree cover density: ",
            "fr": "Select tree cover density: ",
            "es": "Select tree cover density: ",
            "pt": "Select tree cover density: ",
            "id": "Select tree cover density: ",
            "zh": "Select tree cover density: ",
            "ka": "Select tree cover density: "
          }
        }
      ]
    },
    {
      "analysisId": "BIO_LOSS",
      "label": {
        "en": "C02 emissions from biomass loss",
        "fr": "Densité de la biomasse aérienne vivante",
        "es": "Densidad de la biomasa viva en la superficie del suelo",
        "pt": "Densidade de biomassa viva acima do solo",
        "id": "Aboveground Live Woody Biomass Density",
        "zh": "Aboveground Live Woody Biomass Density",
        "ka": "მიწისზედა ცოცხალი ტყის ბიომასის სიხშირე"
      },
      "title": {
        "en": "Carbon Dioxide Emissions from Above Ground Live Woody Biomass Loss",
        "fr": "Carbon Dioxide Emissions from Above Ground Live Woody Biomass Loss",
        "es": "Carbon Dioxide Emissions from Above Ground Live Woody Biomass Loss",
        "pt": "Carbon Dioxide Emissions from Above Ground Live Woody Biomass Loss",
        "id": "Carbon Dioxide Emissions from Above Ground Live Woody Biomass Loss",
        "zh": "Carbon Dioxide Emissions from Above Ground Live Woody Biomass Loss",
        "ka": "Carbon Dioxide Emissions from Above Ground Live Woody Biomass Loss"
      },
      "description": {
        "en": "Emissions do not include carbon emissions from other sources besides woody biomass (tree cover) loss. Select range and tree cover density then click the run analysis button to see results.",
        "fr": "Emissions do not include carbon emissions from other sources besides woody biomass (tree cover) loss. Select range and tree cover density then click the run analysis button to see results.",
        "es": "Emissions do not include carbon emissions from other sources besides woody biomass (tree cover) loss. Select range and tree cover density then click the run analysis button to see results.",
        "pt": "Emissions do not include carbon emissions from other sources besides woody biomass (tree cover) loss. Select range and tree cover density then click the run analysis button to see results.",
        "id": "Emissions do not include carbon emissions from other sources besides woody biomass (tree cover) loss. Select range and tree cover density then click the run analysis button to see results.",
        "zh": "Emissions do not include carbon emissions from other sources besides woody biomass (tree cover) loss. Select range and tree cover density then click the run analysis button to see results.",
        "ka": "Emissions do not include carbon emissions from other sources besides woody biomass (tree cover) loss. Select range and tree cover density then click the run analysis button to see results."
      },
      "useGfwWidget": true,
      "widgetId": "937a74e7-f616-4d1d-91b3-e69c68e278aa",
      "uiParams": [{
          "inputType": "rangeSlider",
          "startParamName": "period",
          "combineParams": true,
          "valueSeparator": ",",
          "bounds": [2001,
            2017
          ],
          "valueType": "date",
          "label": {
            "en": "Select range for analysis",
            "fr": "Select range for analysis",
            "es": "Select range for analysis",
            "pt": "Select range for analysis",
            "id": "Select range for analysis",
            "zh": "Select range for analysis",
            "ka": "Select range for analysis"
          }
        },
        {
          "name": "thresh",
          "inputType": "tcd",
          "label": {
            "en": "Select tree cover density: ",
            "fr": "Select tree cover density: ",
            "es": "Select tree cover density: ",
            "pt": "Select tree cover density: ",
            "id": "Select tree cover density: ",
            "zh": "Select tree cover density: ",
            "ka": "Select tree cover density: "
          }
        }
      ]
    },
    {
      "analysisId": "GLAD_ALERTS",
      "label": {
        "en": "GLAD alerts",
        "fr": "Alertes GLAD",
        "es": "Alertas GLAD",
        "pt": "Alertas GLAD",
        "id": "GLAD Alerts",
        "zh": "GLAD Alerts",
        "ka": "GLAD შეტყობინებები"
      },
      "title": {
        "en": "GLAD Alerts",
        "fr": "Alertes GLAD",
        "es": "Alertas GLAD",
        "pt": "Alertas GLAD",
        "id": "GLAD Alerts",
        "zh": "GLAD Alerts",
        "ka": "GLAD შეტყობინებები"
      },
      "description": {
        "en": "Count the number of GLAD tree cover loss alerts per month over the past two years and compare to the historical average. ",
        "fr": "Count the number of GLAD tree cover loss alerts per month over the past two years and compare to the historical average.  ",
        "es": "Count the number of GLAD tree cover loss alerts per month over the past two years and compare to the historical average. ",
        "pt": "Count the number of GLAD tree cover loss alerts per month over the past two years and compare to the historical average. ",
        "id": "Count the number of GLAD tree cover loss alerts per month over the past two years and compare to the historical average. ",
        "zh": "Count the number of GLAD tree cover loss alerts per month over the past two years and compare to the historical average. ",
        "ka": "Count the number of GLAD tree cover loss alerts per month over the past two years and compare to the historical average. "
      },
      "useGfwWidget": true,
      "widgetId": "dae27aaf-6dc6-4cc4-ac65-9901ed3f162b",
      "uiParams": "none"
    },
    {
      "analysisId": "GLAD_ALERTS_2",
        "label": {
          "en": "GLAD alerts per month",
          "fr": "Alertes GLAD",
        "es": "Alertas GLAD",
        "pt": "Alertas GLAD",
        "id": "GLAD Alerts",
        "zh": "GLAD Alerts",
        "ka": "GLAD შეტყობინებები"
      },
      "title": {
        "en": "GLAD Alerts per Month",
        "fr": "Alertes GLAD",
        "es": "Alertas GLAD",
        "pt": "Alertas GLAD",
        "id": "GLAD Alerts",
        "zh": "GLAD Alerts",
        "ka": "GLAD შეტყობინებები"
      },
      "description": {
        "en": "Count the number of GLAD alerts per month. ",
        "fr": "Count the number of GLAD alerts per month.  ",
        "es": "Count the number of GLAD alerts per month. ",
        "pt": "Count the number of GLAD alerts per month. ",
        "id": "Count the number of GLAD alerts per month.  ",
        "zh": "Count the number of GLAD alerts per month.  ",
        "ka": "Count the number of GLAD alerts per month.  "
      },
      "useGfwWidget": true,
      "widgetId": "0e2da211-a9b2-4271-a437-5de56e437df2",
      "uiParams": "none"
    },

    {
      "analysisId": "GLAD_ALERTS_Badge",
      "label": {
        "en": "Total GLAD Alerts",
        "fr": "Alertes GLAD",
        "es": "Alertas GLAD",
        "pt": "Alertas GLAD",
        "id": "GLAD Alerts",
        "zh": "GLAD Alerts",
        "ka": "GLAD შეტყობინებები"
      },
      "title": {
        "en": "Total GLAD alerts",
        "fr": "Alertes GLAD",
        "es": "Alertas GLAD",
        "pt": "Alertas GLAD",
        "id": "GLAD Alerts",
        "zh": "GLAD Alerts",
        "ka": "GLAD შეტყობინებები"
      },
      "description": {
        "en": "Count the number of GLAD alerts which occurred within the selected time range.",
        "fr": "Count the number of GLAD alerts which occurred within the selected time range.",
        "es": "Count the number of GLAD alerts which occurred within the selected time range.",
        "pt": "Count the number of GLAD alerts which occurred within the selected time range.",
        "id": "Count the number of GLAD alerts which occurred within the selected time range.",
        "zh": "Count the number of GLAD alerts which occurred within the selected time range.",
        "ka": "Count the number of GLAD alerts which occurred within the selected time range."
      },
      "useGfwWidget": true,
      "widgetId": "42784c7d-95dd-40b9-804b-9cfa94c4a4d0",
      "uiParams": [{
        "inputType": "datepicker",
        "startParamName": "period",
        "combineParams": true,
        "valueSeparator": ",",
        "multi": true,
        "defaultStartDate": "2018-01-01",
        "minDate": "2015-01-01",
        "label": {
          "en": "Select range for analysis",
          "fr": "Select range for analysis",
          "es": "Select range for analysis",
          "pt": "Select range for analysis",
          "id": "Select range for analysis",
          "zh": "Select range for analysis",
          "ka": "Select range for analysis"
        }
      }]
    },
    {
      "analysisId": "VIIRS_FIRES",
      "label": {
        "en": "VIIRS Active Fires",
        "fr": "Feux actifs VIIRS",
        "es": "Incendios activos VIIRS",
        "pt": "Incêndios ativos VIIRS",
        "id": "VIIRS Active fires",
        "zh": "活跃火点 VIIRS",
        "ka": "VIIRS აქტიური ხანძრები"
      },
      "title": {
        "en": "VIIRS active fires",
        "fr": "Feux actifs VIIRS",
        "es": "Incendios activos VIIRS",
        "pt": "Incêndios ativos VIIRS",
        "id": "VIIRS Active fires",
        "zh": "活跃火点 VIIRS",
        "ka": "VIIRS აქტიური ხანძრები"
      },
      "description": {
        "en": "This analysis counts the number of VIIRS fires which occurred during the past 7 days",
        "fr": "This analysis counts the number of VIIRS fires which occurred during the past 7 days",
        "es": "This analysis counts the number of VIIRS fires which occurred during the past 7 days",
        "pt": "This analysis counts the number of VIIRS fires which occurred during the past 7 days",
        "id": "This analysis counts the number of VIIRS fires which occurred during the past 7 days",
        "zh": "This analysis counts the number of VIIRS fires which occurred during the past 7 days",
        "ka": "This analysis counts the number of VIIRS fires which occurred during the past 7 days"
      },
      "useGfwWidget": true,
      "widgetId": "97b82853-d9fb-4e74-b9b3-2fac7937f38f",
      "uiParams": "none"
    },
    {
      "analysisId": "LCC",
      "label": {
        "en": "Land Cover Composition",
        "fr": "Couverture des sols",
        "es": "Cobertura terrestre",
        "pt": "Cobertura do Solo",
        "id": "Land Cover",
        "zh": "土地覆盖",
        "ka": "მიწის საფარი"
      },
      "title": {
        "en": "Land Cover Composition",
        "fr": "Couverture des sols",
        "es": "Cobertura terrestre",
        "pt": "Cobertura do Solo",
        "id": "Land Cover",
        "zh": "土地覆盖",
        "ka": "მიწის საფარი"
      },
      "description": {
        "en": "Land cover data is from 2015 and provided by the European Space Agency (ESA), the data was reclassified according to IPCC categories. ",
        "fr": "Land cover data is from 2015 and provided by the European Space Agency (ESA), the data was reclassified according to IPCC categories. ",
        "es": "Land cover data is from 2015 and provided by the European Space Agency (ESA), the data was reclassified according to IPCC categories. ",
        "pt": "Land cover data is from 2015 and provided by the European Space Agency (ESA), the data was reclassified according to IPCC categories. ",
        "id": "Land cover data is from 2015 and provided by the European Space Agency (ESA), the data was reclassified according to IPCC categories. ",
        "zh": "Land cover data is from 2015 and provided by the European Space Agency (ESA), the data was reclassified according to IPCC categories. ",
        "ka": "Land cover data is from 2015 and provided by the European Space Agency (ESA), the data was reclassified according to IPCC categories. "
      },
      "useGfwWidget": true,
      "widgetId": "65dc8170-0049-48e7-94ba-fa846fcb295c",
      "uiParams": "none",
      "params": [{
        "name": "layer",
        "value": "gfw-landcover-2015"
      }]
    }
  ],
  "layerPanel": {
    "GROUP_WEBMAP": {
      "order": 2,
      "label": {

      },
      "layers": []
    },
    "GROUP_LCD": {
      "order": 1,
      "label": {
        "en": "Land Cover Dynamics",
        "fr": "Evolution de la couverture des sols",
        "es": "Dinámica de la Cobertura del Suelo",
        "pt": "Dinâmica de cobertura da terra ",
        "id": "Land Cover Dynamics",
        "zh": "土地覆盖动态数据",
        "ka": "მიწის საფარის დინამიკა"
      },
      "layers": [{
          "order": 1,
          "id": "TREE_COVER_LOSS",
          "type": "loss",
          "url": "https://storage.googleapis.com/wri-public/Hansen_16/tiles/hansen_world/v1/tc30/{z}/{x}/{y}.png",
          "minYear": 1,
          "maxYear": 15,
          "technicalName": "tree_cover_loss",
          "legendLayer": [0],
          "label": {
            "en": "Tree cover loss",
            "fr": "Perte en couvert arboré",
            "es": "Pérdida de la cobertura arbórea",
            "pt": "Perda de cobertura arbórea",
            "id": "Tree cover loss",
            "zh": "森林覆盖损失",
            "ka": "ხის ვარჯის კარგვა"
          },
          "sublabel": {
            "en": "(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)",
            "fr": "(annuel, 30m, global, Hansen/UMD/Google/USGS/NASA)",
            "es": "(anual, 30m, global, Hansen/UMD/Google/USGS/NASA)",
            "pt": "(anual, 30m, global, Hansen/UMD/Google/USGS/NASA)",
            "id": "(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)",
            "zh": "(每年更新, 30米, 全球覆盖, 汉森/马里兰大学/谷歌/美国地质测量局(USGS)/美国宇航局(NASA))",
            "ka": "(წლიური, 30მ, გლობალური, Hansen/UMD/Google/USGS/NASA)"
          }
        },
        {
          "order": 2,
          "id": "TREE_COVER_GAIN",
          "type": "gain",
          "url": "https://earthengine.google.org/static/hansen_2013/gain_alpha/{z}/{x}/{y}.png",
          "technicalName": "tree_cover_gain",
          "legendLayer": [1],
          "label": {
            "en": "Tree cover gain",
            "fr": "Gain en couvert arboré",
            "es": "Aumento de la cobertura arbórea",
            "pt": "Ganho de cobertura arbórea",
            "id": "Tree cover gain",
            "zh": "森林覆盖增加",
            "ka": "ხის ვარჯის ნამატი"
          },
          "sublabel": {
            "en": "(12 years, 30m, global, Hansen/UMD/Google/USGS/NASA)",
            "fr": "(12 ans, 30m, global, Hansen/UMD/Google/USGS/NASA)",
            "es": "(12 años, 30m, global, Hansen/UMD/Google/USGS/NASA)",
            "pt": "(12 anos, 30m, global, Hansen/UMD/Google/USGS/NASA)",
            "id": "(12 years, 30m, global, Hansen/UMD/Google/USGS/NASA)",
            "zh": "(12 年, 30米, 全球覆盖, 汉森/马里兰大学/谷歌/美国地质测量局(USGS)/美国宇航局(NASA))",
            "ka": "(12 წელიწადი, 30მ, გლობალური, Hansen/UMD/Google/USGS/NASA)"
          }
        },
        {
          "order": 3,
          "id": "IMAZON_SAD",
          "type": "dynamic",
          "url": "https://gis-gfw.wri.org/arcgis/rest/services/forest_change/MapServer",
          "technicalName": "imazon_sad",
          "layerIds": [2],
          "label": {
            "en": "SAD alerts",
            "fr": "Alertes SAD",
            "es": "Alertas SAD",
            "pt": "Alertas SAD",
            "id": "SAD alerts",
            "zh": "SAD alerts",
            "ka": "SAD შეტყობინებები"
          },
          "sublabel": {
            "en": "(monthly, 250m, Brazilian Amazon, Imazon)",
            "fr": "(mensuel, 250m, Amazonie brésilienne, Imazon)",
            "es": "(mensual, 250m, Amazonia brasileña, Imazon)",
            "pt": "(mensal, 250m, Amazônia brasileira, Imazon)",
            "id": "(monthly, 250m, Brazilian Amazon, Imazon)",
            "zh": "(monthly, 250m, Brazilian Amazon, Imazon)",
            "ka": "(ყოველთვიური, 250მ, ბრაზილიის ამაზონია, Imazon)"
          }
        },
        {
          "order": 4,
          "id": "GLAD_ALERTS",
          "type": "glad",
          "url": "https://wri-tiles.s3.amazonaws.com/glad_prod/tiles/{z}/{x}/{y}.png",
          "technicalName": "umd_landsat_alerts",
          "legendLayer": [7],
          "minDateValue": 2458120,
          "maxDateValue": 999999,
          "confidence": [0,
            1
          ],
          "label": {
            "en": "GLAD Alerts",
            "fr": "Alertes GLAD",
            "es": "Alertas GLAD",
            "pt": "Alertas GLAD",
            "id": "GLAD Alerts",
            "zh": "GLAD Alerts",
            "ka": "GLAD შეტყობინებები"
          },
          "sublabel": {
            "en": "(weekly, 30m, select countries, UMD/ GLAD)",
            "fr": "(hebdomadaire, 30m, certains pays, UMD/ GLAD)",
            "es": "(semanal, 30m, select countries, UMD/ GLAD)",
            "pt": "(semanal, 30m, select countries, UMD/ GLAD)",
            "id": "(weekly, 30m, select countries, UMD/ GLAD)",
            "zh": "(weekly, 30m, select countries, UMD/ GLAD)",
            "ka": "(ყოველკვირეული, 30მ, აარჩიეთ ქვეყნები, UMD/ GLAD)"
          }
        },
        {
          "order": 5,
          "id": "FORMA_ALERTS",
          "type": "forma",
          "url": "https://storage.googleapis.com/forma-public/Forma250/tiles/forma_20180128/v1/{z}/{x}/{y}.png",
          "technicalName": "forma_250_active_clearing_alerts",
          "legendLayer": [27],
          "minDateValue": 12000,
          "maxDateValue": 999999,
          "label": {
            "en": "FORMA 250",
            "fr": "FORMA 250",
            "es": "FORMA 250",
            "pt": "FORMA 250",
            "id": "FORMA 250",
            "zh": "FORMA 250",
            "ka": "FORMA 250"
          }
        },
        {
          "order": 7,
          "id": "TERRA_I_ALERTS",
          "type": "terra",
          "url": "https://wri-tiles.s3.amazonaws.com/terrai_prod/tiles/{z}/{x}/{y}.png",
          "technicalName": "terra_i_alerts",
          "legendLayer": [13],
          "maxZoom": 10,
          "minDateValue": 4e3,
          "maxDateValue": 2e4,
          "imageServer": "https://gis-gfw.wri.org/arcgis/rest/services/image_services/terrai_analysis/ImageServer",
          "label": {
            "en": "Terra-I Alerts",
            "fr": "Alertes Terra-I",
            "es": "Alertas Terra-I",
            "pt": "Alertas Terra-I",
            "id": "Terra-I Alerts",
            "zh": "Terra-I Alerts",
            "ka": "Terra-I შეტყობინებები"
          },
          "sublabel": {
            "en": "(monthly, 250m, Latin America, CIAT)",
            "fr": "(mensuel, 250m, Amérique Latine, CIAT)",
            "es": "(mensual, 250m, Latin America, CIAT)",
            "pt": "(Mensal, 250m, Latin America, CIAT)",
            "id": "(monthly, 250m, Latin America, CIAT)",
            "zh": "(monthly, 250m, Latin America, CIAT)",
            "ka": "(ყოველთვიური, 250მ, ლათინური ამერიკა, CIAT)"
          }
        },
        {
          "order": 6,
          "id": "VIIRS_ACTIVE_FIRES",
          "type": "dynamic",
          "url": "https://gis-gfw.wri.org/arcgis/rest/services/Fires/FIRMS_Global_VIIRS_24hrs/MapServer",
          "technicalName": "viirs_fires",
          "layerIds": [21],
          "label": {
            "en": "VIIRS Active Fires",
            "fr": "Feux actifs",
            "es": "Incendios activos",
            "pt": "Incêndios ativos",
            "id": "Active fires",
            "zh": "活跃火点",
            "ka": "VIIRS აქტიური ხანძრები"
          },
          "sublabel": {
            "en": "(daily, 375m, global, NASA)",
            "fr": "(journalier, 375m, global, NASA)",
            "es": "(Diaria, 375m, global, NASA)",
            "pt": "(Diária, 375m, global, NASA)",
            "id": "(daily, 375m, global, NASA)",
            "zh": "(每天更新, 375米, 全球覆盖, 美国宇航局（NASA))",
            "ka": "(ყოველდღიური, 375მ, გლობალური, NASA)"
          },
          "popup": {
            "title": {
              "en": "Active Fires"
            },
            "content": {
              "en": [{
                  "label": "Brightness",
                  "fieldExpression": "BRIGHTNESS"
                },
                {
                  "label": "Confidence",
                  "fieldExpression": "CONFIDENCE"
                },
                {
                  "label": "Latitude",
                  "fieldExpression": "LATITUDE"
                },
                {
                  "label": "Longitude",
                  "fieldExpression": "LONGITUDE"
                },
                {
                  "label": "Acquisition Date",
                  "fieldExpression": "ACQ_DATE:DateString(hideTime:true)"
                },
                {
                  "label": "Acquisition Time",
                  "fieldExpression": "ACQ_TIME"
                }
              ]
            },
            "sublabel": {
              "en": "(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)",
              "fr": "(annuel, 30m, global, Hansen/UMD/Google/USGS/NASA)",
              "es": "(anual, 30m, global, Hansen/UMD/Google/USGS/NASA)",
              "pt": "(anual, 30m, global, Hansen/UMD/Google/USGS/NASA)",
              "id": "(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)",
              "zh": "(每年更新, 30米, 全球覆盖, 汉森/马里兰大学/谷歌/美国地质测量局(USGS)/美国宇航局(NASA))",
              "ka": "(წლიური, 30მ, გლობალური, Hansen/UMD/Google/USGS/NASA)"
            }
          }
        },
        {
          "order": 7,
          "id": "MODIS_ACTIVE_FIRES",
          "type": "dynamic",
          "url": "https://gis-gfw.wri.org/arcgis/rest/services/Fires/FIRMS_Global_MODIS_24hrs/MapServer",
          "technicalName": "firms_active_fires",
          "layerIds": [21],
          "label": {
            "en": "MODIS Active Fires",
            "fr": "Feux actifs",
            "es": "Incendios activos",
            "pt": "Incêndios ativos",
            "id": "Active fires",
            "zh": "活跃火点",
            "ka": "MODIS აქტიური ხანძრები"
          },
          "sublabel": {
            "en": "(daily, 1km, global, NASA)",
            "fr": "(journalier, 1km, global, NASA)",
            "es": "(Diaria, 1km, global, NASA)",
            "pt": "(Diária, 1km, global, NASA)",
            "id": "(daily, 1km, global, NASA)",
            "zh": "(每天更新, 1千米, 全球覆盖, 美国宇航局（NASA))",
            "ka": "(ყოველდღიური, 1კმ, გლობალური, NASA)"
          },
          "popup": {
            "title": {
              "en": "Active Fires"
            },
            "content": {
              "en": [{
                  "label": "Brightness",
                  "fieldExpression": "BRIGHTNESS"
                },
                {
                  "label": "Confidence",
                  "fieldExpression": "CONFIDENCE"
                },
                {
                  "label": "Latitude",
                  "fieldExpression": "LATITUDE"
                },
                {
                  "label": "Longitude",
                  "fieldExpression": "LONGITUDE"
                },
                {
                  "label": "Acquisition Date",
                  "fieldExpression": "ACQ_DATE:DateString(hideTime:true)"
                },
                {
                  "label": "Acquisition Time",
                  "fieldExpression": "ACQ_TIME"
                }
              ]
            },
            "sublabel": {
              "en": "(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)",
              "fr": "(annuel, 30m, global, Hansen/UMD/Google/USGS/NASA)",
              "es": "(anual, 30m, global, Hansen/UMD/Google/USGS/NASA)",
              "pt": "(anual, 30m, global, Hansen/UMD/Google/USGS/NASA)",
              "id": "(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)",
              "zh": "(每年更新, 30米, 全球覆盖, 汉森/马里兰大学/谷歌/美国地质测量局(USGS)/美国宇航局(NASA))",
              "ka": "(წლიური, 30მ, გლობალური, Hansen/UMD/Google/USGS/NASA)"
            }
          }
        }
      ]
    },
    "GROUP_LC": {
      "order": 4,
      "label": {
        "en": "Land Cover",
        "fr": "Couverture des sols",
        "es": "Cobertura vegetal",
        "pt": "Land Cover",
        "id": "Land Cover",
        "zh": "土地覆盖"
      },
      "layers": [{
          "order": 1,
          "id": "GLOB_MANGROVE",
          "type": "webtiled",
          "url": "https://cartocdn-gusc.global.ssl.fastly.net/wri-01/api/v1/map/d1567282c7f1c14771faf723c39d677a:1529255467465/0/{level}/{col}/{row}.png",
          "technicalName": "global_mangroves_gmw",
          "legendLayer": 11,
          "label": {
            "en": "Mangrove Forest",
            "fr": "Mangrove Forest",
            "es": "Mangrove Forest",
            "pt": "Mangrove Forest",
            "id": "Mangrove Forest",
            "zh": "Mangrove Forest"
          }
        },
        {
          "order": 2,
          "id": "IFL",
          "type": "dynamic",
          "url": "https://gis-gfw.wri.org/arcgis/rest/services/forest_cover/MapServer",
          "technicalName": "intact_forest_landscapes_change",
          "layerIds": [0],
          "label": {
            "en": "Intact Forest Landscape",
            "fr": "Paysage forestier intact",
            "es": "Paisajes Forestales Intactos",
            "pt": "Intact Forest Landscape",
            "id": "Intact Forest Landscape",
            "zh": "原生森林景观"
          }
        },
        {
          "order": 3,
          "id": "PRIMARY_FORESTS",
          "type": "primed",
          "url": "https://storage.googleapis.com/gee-tiles/079fae08-5696-4926-9417-794bd3a7e8dc%2F{z}%2F{x}%2F{y}%2Ftile_5b017146ab8a93bf55948f7fa3ec3d5e.png",
          "technicalName": "regional_primary_forests",
          "label": {
            "en": "Primary Forests",
            "fr": "Forêts primaires",
            "es": "Bosques Primarios",
            "pt": "Florestas Primárias",
            "id": "Hutan Primer",
            "zh": "主要森林",
            "ka": "პირველადი ტყეები"
          }
        },
        {
          "order": 4,
          "id": "AG_BIOMASS",
          "type": "image",
          "url": "https://gis-gfw.wri.org/arcgis/rest/services/image_services/whrc_carbon_tcd/ImageServer",
          "technicalName": "aboveground_biomass",
          "legendLayer": [8],
          "label": {
            "en": "Aboveground Live Woody Biomass Density",
            "fr": "Densité de la biomasse aérienne vivante",
            "es": "Densidad de la biomasa viva en la superficie del suelo",
            "pt": "Densidade de biomassa viva acima do solo",
            "id": "Aboveground Live Woody Biomass Density",
            "zh": "Aboveground Live Woody Biomass Density",
            "ka": "მიწისზედა ცოცხალი ტყის ბიომასის სიხშირე"
          }
        },
        {
          "order": 5,
          "id": "LAND_COVER",
          "type": "webtiled",
          "url": "https://wri-tiles.s3.amazonaws.com/global-landcover/{level}/{col}/{row}.png",
          "technicalName": "global_landcover",
          "legendLayer": 15,
          "rasterId": "$568",
          "bounds": [1,
            16
          ],
          "classes": {
            "en": ["Irrigated croplands",
              "Rainfed croplands",
              "Cropland forest mosaic",
              "Broadleaved evergreen or semi-deciduous forest",
              "Broadleaved deciduous forest",
              "Needleleaved evergreen or deciduous forest",
              "Mixed broadleaved and needleleaved forest",
              "Mosaic of forest, shrubland and grassland",
              "Shrubland",
              "Grassland",
              "Sparse vegetation",
              "Flooded broadleaved forest",
              "Flooded vegetation",
              "Artificial areas",
              "Bare areas",
              "Permanent snow and ice"
            ],
            "fr": ["Irrigated croplands",
              "Rainfed croplands",
              "Cropland forest mosaic",
              "Broadleaved evergreen or semi-deciduous forest",
              "Broadleaved deciduous forest",
              "Needleleaved evergreen or deciduous forest",
              "Mixed broadleaved and needleleaved forest",
              "Mosaic of forest, shrubland and grassland",
              "Shrubland",
              "Grassland",
              "Sparse vegetation",
              "Flooded broadleaved forest",
              "Flooded vegetation",
              "Artificial areas",
              "Bare areas",
              "Permanent snow and ice"
            ]
          },
          "colors": ["#825D26",
            "#D1A969",
            "#DED6B4",
            "#157562",
            "#CC7A29",
            "#6DAD96",
            "#968635",
            "#C2B32F",
            "#6F7A53",
            "#96A36F",
            "#CDDB93",
            "#7DBDE8",
            "#0D63A1",
            "#F41E65",
            "#FFFFFF",
            "#DBDBDB"
          ],
          "label": {
            "en": "Land cover",
            "fr": "Couverture des sols"
          }
        },
        {
          "order": 6,
          "id": "TREE_COVER",
          "type": "image",
          "url": "https://gis-treecover.wri.org/arcgis/rest/services/TreeCover2000/ImageServer",
          "technicalName": "tree_cover",
          "colormap": [
            [1,
              0,
              179,
              0
            ]
          ],
          "inputRange": [30,
            101
          ],
          "outputRange": [1],
          "opacity": 0.8,
          "legendLayer": 2,
          "label": {
            "en": "Tree cover density",
            "fr": "Densité du couvert arboré",
            "es": "Densidad de follaje",
            "pt": "Tree cover density",
            "id": "Tree cover density",
            "zh": "森林覆盖密度"
          },
          "sublabel": {
            "en": "(year 2000, 30m global, Hansen/UMD/Google/USGS/NASA)",
            "fr": "(année 2000, 30m global, Hansen/UMD/Google/USGS/NASA)",
            "es": "(2000, 30m, global, Hansen/UMD/Google/USGS/NASA)",
            "pt": "(year 2000, 30m global, Hansen/UMD/Google/USGS/NASA)",
            "id": "(year 2000, 30m global, Hansen/UMD/Google/USGS/NASA)",
            "zh": "(2000年, 30米 全球覆盖, 汉森/马里兰大学/谷歌/美国地质测量局(USGS)/美国宇航局(NASA))"
          }
        }
      ]
    },
    "GROUP_IMAGERY": {
      "groupType": "imagery",
      "order": 4,
      "label": {
        "en": "Recent Imagery",
        "fr": "Recent Imagery",
        "es": "Recent Imagery",
        "pt": "Recent Imagery",
        "id": "Recent Imagery",
        "zh": "Recent Imagery",
        "ka": "Recent Imagery"
      },
      "layers": [{
        "order": 1,
        "id": "RECENT_IMAGERY",
        "type": "imagery",
        "technicalName": "recent_satellite_imagery",
        "visible": false,
        "label": {
          "en": "Recent Imagery",
          "fr": "Recent Imagery",
          "es": "Recent Imagery",
          "pt": "Recent Imagery",
          "id": "Recent Imagery",
          "zh": "Recent Imagery",
          "ka": "Recent Imagery"
        },
        "dynamicSublabel": {
          "en": "({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})",
          "fr": "({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})",
          "es": "({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})",
          "pt": "({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})",
          "id": "({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})",
          "zh": "({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})",
          "ka": "({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})"
        }
      }]
    },
    "GROUP_BASEMAP": {
      "groupType": "basemap",
      "order": 5,
      "label": {
        "en": "Basemap",
        "fr": "Basemap",
        "es": "Basemap",
        "pt": "Basemap",
        "id": "Basemap",
        "zh": "Basemap"
      },
      "layers": [{
          "id": "landsat",
          "thumbnailUrl": "https://my.gfw-mapbuilder.org/img/basemaps-sdd18a411a3-5bf18f445e58b8766f773184b7741c67.png",
          "templateUrl": "https://d2h71bpqsyf4vw.cloudfront.net/2016/${level}/${col}/${row}.png",
          "years": ["2000",
            "2001",
            "2002",
            "2003",
            "2004",
            "2005",
            "2006",
            "2007",
            "2008",
            "2009",
            "2010",
            "2011",
            "2012",
            "2013",
            "2014",
            "2015",
            "2016"
          ],
          "title": {
            "en": "Landsat",
            "fr": "Landsat",
            "es": "Landsat",
            "pt": "Landsat",
            "id": "Landsat",
            "zh": "Landsat"
          }
        },
        {
          "id": "wri_mono",
          "thumbnailUrl": "https://my.gfw-mapbuilder.org/img/wri_mono.png",
          "title": {
            "en": "WRI Mono",
            "fr": "WRI Mono",
            "es": "WRI Mono",
            "pt": "WRI Mono",
            "id": "WRI Mono",
            "zh": "WRI Mono"
          }
        },
        {
          "id": "wri_contextual",
          "thumbnailUrl": "https://my.gfw-mapbuilder.org/img/wri_contextual.png",
          "title": {
            "en": "WRI Contextual",
            "fr": "WRI Contextual",
            "es": "WRI Contextual",
            "pt": "WRI Contextual",
            "id": "WRI Contextual",
            "zh": "WRI Contextual"
          }
        }
      ]
    },
    "extraLayers": [{
        "id": "MASK",
        "type": "dynamic",
        "order": 10000,
        "url": "https://gis.forest-atlas.org/server/rest/services/country_masks/country_mask_global/MapServer",
        "opacity": 0.35,
        "layerIds": [0]
      },
      {
        "id": "LEGEND_LAYER",
        "type": "dynamic",
        "url": "https://gis-gfw.wri.org/arcgis/rest/services/legends/MapServer",
        "visible": false,
        "opacity": 0,
        "layerIds": []
      },
      {
        "id": "USER_FEATURES",
        "type": "graphic",
        "visible": true
      }
    ]
  }
};
