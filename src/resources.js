export default {
   "webmap":"7b64776e2f8b4280a806b7b46ccddc78",
   "title":"Natural Strongholds Impact Platform",
   "subtitle":"Demonstrating Our Global Impact",
   "logoUrl":"https://programs.wcs.org/Desktopmodules/WCSMapBuilder/wcslogo.png",
   "logoLinkUrl":"https://www.wcs.org",
   "aboutLinkUrl":"",
   "downloadLinkUrl":"",
   "printServiceUrl":"https://gis.forest-atlas.org/server/rest/services/print/ExportWebMap/GPServer/Export Web Map",
   "maskServiceUrl":"",
   "mapThemeIds":"",
   "mapThemes":"",
   "narrative":"",
   "includeSubscribeButton":false,
   "includeMyGFWLogin":false,
   "navLinksInNewTab":false,
   "hideHeader":false,
   "hideFooter":false,
   "language":"en",
   "useAlternativeLanguage":true,
   "alternativeWebmap":"",
   "alternativeLanguage":"fr",
   "alternativeLanguageTitle":"",
   "alternativeLanguageSubtitle":"",
   "alternativeMapThemes":"",
   "alternativeNarrative":"",
   "alternativeWebmapMenuName":"",
   "includeDocumentsTab":false,
   "documentsDirectory":"",
   "documentsMapserver":"",
   "iso":"",
   "initialExtent":{
      "x":"",
      "y":"",
      "z":""
   },
   "viirsFires":true,
   "modisFires":true,
   "intactForests":true,
   "aboveGroundBiomass":true,
   "landCover":true,
   "mangroves":true,
   "sadAlerts":true,
   "gladAlerts":true,
   "terraIAlerts":true,
   "webmapMenuName":"",
   "slopePotentialOptions":"",
   "alternativeSlopePotentialOptions":"",
   "slopePotentialColors":"",
   "slopeClassNames":"",
   "slopeClassColors":"",
   "treeCoverClassNames":"",
   "treeCoverClassColors":"",
   "landCoverClassNames":"",
   "landCoverClassColors":"",
   "populationClassNames":"",
   "populationClassColors":"",
   "rainfallClassNames":"",
   "rainfallClassColors":"",
   "alternativeSlopeDescription":"",
   "sharinghost":"https://www.arcgis.com",
   "analyticsCode":"",
   "userFeatureToken":"",
     "analysisModules": [
        {
           "analysisId": "AnnualPopulationTrend",
           "fieldToSubstitute": "AnnualPopulationTrend",
           "label": {
              "en": "Elephant Population Trend"
           },
           "title": {
              "en": "Elephant Population Trend"
           },
           "description": {
              "en": "A demonstration widget for registration knowledge transfer"
           },
           "useGfwWidget": true,
           "widgetId": "53a2ad48-46c2-41b0-9a72-8d6ef34131c9",
           "uiParams": "none"
        }
        ,
      {
           "analysisId": "FRAGMENTATION",
           "label": {
              "en": "Fragmentation Analysis",
              "fr": "Total perte/ gain en couvert arborÃ©",
              "es": "PÃ©rdida/ Aumento de la cobertura arbÃ³rea",
              "pt": "Perda/ Ganho de cobertura arbÃ³rea",
              "id": "Total tree cover loss/ gain",
              "zh": "æ£®æž—è¦†ç›–æŸå¤±/ æ£®æž—è¦†ç›–å¢žï¿½ ",
              "ka": "áƒ®áƒ˜áƒ¡ áƒ•áƒï¿½ áƒ¯áƒ˜áƒ¡ áƒ™áƒï¿½ áƒ’áƒ•áƒ/ áƒœáƒáƒ›áƒáƒ¢áƒ˜"
           },
           "title": {
              "en": "Fragmentation",
              "fr": "Forest Loss Analysis",
              "es": "Forest Loss Analysis",
              "pt": "Forest Loss Analysis",
              "id": "Forest Loss Analysis",
              "zh": "Forest Loss Analysis",
              "ka": "Forest Loss Analysis"
           },
           "description": {
              "en": "Select a year range click the run analysis button to see results",
              "fr": "Select range and tree cover density then click the run analysis button to see results",
              "es": "Select range and tree cover density then click the run analysis button to see results",
              "pt": "Select range and tree cover density then click the run analysis button to see results",
              "id": "Select range and tree cover density then click the run analysis button to see results",
              "zh": "Select range and tree cover density then click the run analysis button to see results",
              "ka": "Select range and tree cover density then click the run analysis button to see results"
           },
           "chartType": "badge",
           "valueAttribute": "data",
           "analysisUrl": "https://us-central1-ambell-166721.cloudfunctions.net/wcs-ee-deforestation-debug",
           "uiParams": [{
              "inputType": "rangeSlider",
              "startParamName": "period",
              "combineParams": true,
              "valueSeparator": ",",
              "bounds": [2001, 2017],
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
           }]
        },
        {
           "analysisId": "TC_LOSS_GAIN",
           "label": {
              "en": "Total tree cover loss/ gain",
              "fr": "Total perte/ gain en couvert arborÃ©",
              "es": "PÃ©rdida/ Aumento de la cobertura arbÃ³rea",
              "pt": "Perda/ Ganho de cobertura arbÃ³rea",
              "id": "Total tree cover loss/ gain",
              "zh": "æ£®æž—è¦†ç›–æŸå¤±/ æ£®æž—è¦†ç›–å¢žï¿½ ",
              "ka": "áƒ®áƒ˜áƒ¡ áƒ•áƒï¿½ áƒ¯áƒ˜áƒ¡ áƒ™áƒï¿½ áƒ’áƒ•áƒ/ áƒœáƒáƒ›áƒáƒ¢áƒ˜"
           },
           "title": {
              "en": "Forest Loss Analysis",
              "fr": "Forest Loss Analysis",
              "es": "Forest Loss Analysis",
              "pt": "Forest Loss Analysis",
              "id": "Forest Loss Analysis",
              "zh": "Forest Loss Analysis",
              "ka": "Forest Loss Analysis"
           },
           "description": {
              "en": "Select range and tree cover density then click the run analysis button to see results",
              "fr": "Select range and tree cover density then click the run analysis button to see results",
              "es": "Select range and tree cover density then click the run analysis button to see results",
              "pt": "Select range and tree cover density then click the run analysis button to see results",
              "id": "Select range and tree cover density then click the run analysis button to see results",
              "zh": "Select range and tree cover density then click the run analysis button to see results",
              "ka": "Select range and tree cover density then click the run analysis button to see results"
           },
           "chartType": "badge",
           "valueAttribute": "data.attributes.loss",
           "analysisUrl": "https://production-api.globalforestwatch.org/v1/umd-loss-gain",
           "uiParams": [{
              "inputType": "rangeSlider",
              "startParamName": "period",
              "combineParams": true,
              "valueSeparator": ",",
              "bounds": [2001, 2017],
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
           }, {
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
           }]
        }, {
           "analysisId": "TC_LOSS",
           "label": {
              "en": "Tree cover loss",
              "fr": "Perte en couvert arborÃ©",
              "es": "PÃ©rdida de la cobertura arbÃ³rea",
              "pt": "Perda de cobertura arbÃ³rea",
              "id": "Tree cover loss",
              "zh": "æ£®æž—è¦†ç›–æŸå¤±",
              "ka": "áƒ®áƒ˜áƒ¡ áƒ•áƒï¿½ áƒ¯áƒ˜áƒ¡ áƒ™áƒï¿½ áƒ’áƒ•áƒ"
           },
           "title": {
              "en": "Tree cover loss",
              "fr": "Perte en couvert arborÃ©",
              "es": "PÃ©rdida de la cobertura arbÃ³rea",
              "pt": "Perda de cobertura arbÃ³rea",
              "id": "Tree cover loss",
              "zh": "æ£®æž—è¦†ç›–æŸå¤±",
              "ka": "áƒ®áƒ˜áƒ¡ áƒ•áƒï¿½ áƒ¯áƒ˜áƒ¡ áƒ™áƒï¿½ áƒ’áƒ•áƒ"
           },
           "description": {
              "en": "Select range and tree cover density then click the run analysis button to see results",
              "fr": "Select range and tree cover density then click the run analysis button to see results",
              "es": "Select range and tree cover density then click the run analysis button to see results",
              "pt": "Select range and tree cover density then click the run analysis button to see results",
              "id": "Select range and tree cover density then click the run analysis button to see results",
              "zh": "Select range and tree cover density then click the run analysis button to see results",
              "ka": "Select range and tree cover density then click the run analysis button to see results"
           },
           "chartType": "bar",
           "chartBounds": [2001, 2017],
           "analysisUrl": "https://production-api.globalforestwatch.org/v1/umd-loss-gain",
           "uiParams": [{
              "inputType": "rangeSlider",
              "startParamName": "period",
              "combineParams": true,
              "valueSeparator": ",",
              "bounds": [2001, 2017],
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
           }, {
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
           }],
           "params": [{
              "name": "aggregate_values",
              "value": "false"
           }]
        }, {
           "analysisId": "BIO_LOSS",
           "label": {
              "en": "Aboveground Live Woody Biomass Density",
              "fr": "DensitÃ© de la biomasse aÃ©rienne vivante",
              "es": "Densidad de la biomasa viva en la superficie del suelo",
              "pt": "Densidade de biomassa viva acima do solo",
              "id": "Aboveground Live Woody Biomass Density",
              "zh": "Aboveground Live Woody Biomass Density",
              "ka": "áƒ›áƒ˜áƒ¬áƒ˜áƒ¡áƒ–áƒ”áƒ“áƒ áƒªáƒáƒªáƒ®áƒáƒšáƒ˜ áƒ¢áƒ§áƒ˜áƒ¡ áƒ‘áƒ˜áƒáƒ›áƒáƒ¡áƒ˜áƒ¡ áƒ¡áƒ˜áƒ®áƒ¨áƒ˜ï¿½ áƒ”"
           },
           "title": {
              "en": "Aboveground Live Woody Biomass Density",
              "fr": "DensitÃ© de la biomasse aÃ©rienne vivante",
              "es": "Densidad de la biomasa viva en la superficie del suelo",
              "pt": "Densidade de biomassa viva acima do solo",
              "id": "Aboveground Live Woody Biomass Density",
              "zh": "Aboveground Live Woody Biomass Density",
              "ka": "áƒ›áƒ˜áƒ¬áƒ˜áƒ¡áƒ–áƒ”áƒ“áƒ áƒªáƒáƒªáƒ®áƒáƒšáƒ˜ áƒ¢áƒ§áƒ˜áƒ¡ áƒ‘áƒ˜áƒáƒ›áƒáƒ¡áƒ˜áƒ¡ áƒ¡áƒ˜áƒ®áƒ¨áƒ˜ï¿½ áƒ”"
           },
           "chartType": "biomassLoss",
           "colors": {
              "loss": "#FF6699",
              "carbon": "#BEBCC2"
           },
           "analysisUrl": "https://production-api.globalforestwatch.org/v1/biomass-loss",
           "uiParams": [{
              "inputType": "rangeSlider",
              "startParamName": "period",
              "combineParams": true,
              "valueSeparator": ",",
              "bounds": [2001, 2014],
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
           }, {
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
           }]
        }, {
           "analysisId": "IFL",
           "label": {
              "en": "Intact Forest Landscape",
              "fr": "Paysage forestier intact",
              "es": "Paisajes Forestales Intactos",
              "pt": "Paisagens Florestais Intactas",
              "id": "Intact Forest Landscape",
              "zh": "åŽŸç”Ÿæ£®æž—æ™¯è§‚",
              "ka": "áƒ®áƒ”áƒšáƒ£áƒ®áƒšáƒ”áƒ‘áƒ”áƒšáƒ˜ áƒ¢áƒ§áƒ˜áƒ¡ áƒšáƒáƒœáƒ“áƒ¨áƒáƒ¤áƒ¢áƒ˜"
           },
           "chartType": "bar",
           "chartBounds": [2001, 2015],
           "colors": ["#186513"],
           "analysisUrl": "https://production-api.globalforestwatch.org/v1/loss-by-landcover",
           "params": [{
              "name": "layer",
              "value": "ifl2000"
           }],
           "uiParams": [{
              "inputType": "rangeSlider",
              "startParamName": "period",
              "combineParams": true,
              "valueSeparator": ",",
              "bounds": [2001, 2015],
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
           }, {
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
           }]
        }, {
           "analysisId": "GLAD_ALERTS",
           "label": {
              "en": "GLAD Alerts",
              "fr": "Alertes GLAD",
              "es": "Alertas GLAD",
              "pt": "Alertas GLAD",
              "id": "GLAD Alerts",
              "zh": "GLAD Alerts",
              "ka": "GLAD áƒ¨áƒ”áƒ¢áƒ§áƒáƒ‘áƒ˜áƒœáƒ”áƒ‘áƒ”áƒ‘áƒ˜"
           },
           "title": {
              "en": "GLAD Alerts",
              "fr": "Alertes GLAD",
              "es": "Alertas GLAD",
              "pt": "Alertas GLAD",
              "id": "GLAD Alerts",
              "zh": "GLAD Alerts",
              "ka": "GLAD áƒ¨áƒ”áƒ¢áƒ§áƒáƒ‘áƒ˜áƒœáƒ”áƒ‘áƒ”áƒ‘áƒ˜"
           },
           "chartType": "timeSeries",
           "analysisUrl": "https://production-api.globalforestwatch.org/v1/glad-alerts",
           "uiParams": [{
              "inputType": "datepicker",
              "startParamName": "period",
              "combineParams": true,
              "valueSeparator": ",",
              "multi": true,
              "defaultStartDate": "2016-01-01",
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
           }],
           "params": [{
              "name": "aggregate_values",
              "value": "true"
           }, {
              "name": "aggregate_by",
              "value": "day"
           }]
        }, {
           "analysisId": "TERRAI_ALERTS",
           "label": {
              "en": "Terra-I Alerts",
              "fr": "Alertes Terra-I",
              "es": "Alertas Terra-I",
              "pt": "Alertas Terra-I",
              "id": "Terra-I Alerts",
              "zh": "Terra-I Alerts",
              "ka": "Terra-I áƒ¨áƒ”áƒ¢áƒ§áƒáƒ‘áƒ˜áƒœáƒ”áƒ‘áƒ”áƒ‘áƒ˜"
           },
           "chartType": "timeSeries",
           "analysisUrl": "https://production-api.globalforestwatch.org/v1/terrai-alerts",
           "uiParams": [{
              "inputType": "datepicker",
              "startParamName": "period",
              "combineParams": true,
              "valueSeparator": ",",
              "multi": true,
              "defaultStartDate": "2006-06-20",
              "minDate": "2004-01-01",
              "maxDate": "2016-07-12",
              "label": {
                 "en": "Select date(s) for analysis",
                 "fr": "Select date(s) for analysis",
                 "es": "Select date(s) for analysis",
                 "pt": "Select date(s) for analysis",
                 "id": "Select date(s) for analysis",
                 "zh": "Select date(s) for analysis",
                 "ka": "Select date(s) for analysis"
              }
           }],
           "params": [{
              "name": "aggregate_values",
              "value": "true"
           }, {
              "name": "aggregate_by",
              "value": "day"
           }]
        }, {
           "analysisId": "VIIRS_FIRES",
           "label": {
              "en": "VIIRS Active Fires",
              "fr": "Feux actifs VIIRS",
              "es": "Incendios activos VIIRS",
              "pt": "IncÃªndios ativos VIIRS",
              "id": "VIIRS Active fires",
              "zh": "æ´»è·ƒç«ç‚¹ VIIRS",
              "ka": "VIIRS áƒáƒ¥áƒ¢áƒ˜áƒ£ï¿½ áƒ˜ áƒ®áƒáƒœáƒ«ï¿½ áƒ”áƒ‘áƒ˜"
           },
           "chartType": "badge",
           "valueAttribute": "data.attributes.value",
           "badgeLabel": {
              "en": "Active Fires",
              "fr": "Feux actifs",
              "es": "Incendios activos",
              "pt": "IncÃªndios ativos",
              "id": "Active fires",
              "zh": "æ´»è·ƒç«ç‚¹",
              "ka": "áƒáƒ¥áƒ¢áƒ˜áƒ£ï¿½ áƒ˜ áƒ®áƒáƒœáƒ«ï¿½ áƒ”áƒ‘áƒ˜"
           },
           "color": "#5ea1ed",
           "analysisUrl": "https://production-api.globalforestwatch.org/v1/viirs-active-fires",
           "uiParams": [{
              "inputType": "datepicker",
              "startParamName": "period",
              "combineParams": true,
              "valueSeparator": ",",
              "multi": true,
              "minDate": "2004-01-01",
              "label": {
                 "en": "Select date(s) for analysis",
                 "fr": "Select date(s) for analysis",
                 "es": "Select date(s) for analysis",
                 "pt": "Select date(s) for analysis",
                 "id": "Select date(s) for analysis",
                 "zh": "Select date(s) for analysis",
                 "ka": "Select date(s) for analysis"
              }
           }]
        }, {
           "analysisId": "LCC",
           "label": {
              "en": "Land Cover Composition",
              "fr": "Couverture des sols",
              "es": "Cobertura terrestre",
              "pt": "Cobertura do Solo",
              "id": "Land Cover",
              "zh": "åœŸåœ°è¦†ç›–",
              "ka": "áƒ›áƒ˜áƒ¬áƒ˜áƒ¡ áƒ¡áƒáƒ¤áƒï¿½ áƒ˜"
           },
           "chartType": "lccPie",
           "classes": {
              "en": ["Land Cover", "Agriculture", "Forest", "Grassland", "Shrubland", "Sparse vegetation", "Wetland", "Settlement", "Bare", "Water", "Permanent snow and ice"],
              "fr": ["Irrigated croplands", "Rainfed croplands", "Cropland forest mosaic", "Broadleaved evergreen or semi-deciduous forest", "Broadleaved deciduous forest", "Needleleaved evergreen or deciduous forest", "Mixed broadleaved and needleleaved forest", "Mosaic of forest, shrubland and grassland", "Shrubland", "Grassland", "Sparse vegetation", "Flooded broadleaved forest", "Flooded vegetation", "Artificial areas", "Bare areas", "Permanent snow and ice"],
              "es": ["Irrigated croplands", "Rainfed croplands", "Cropland forest mosaic", "Broadleaved evergreen or semi-deciduous forest", "Broadleaved deciduous forest", "Needleleaved evergreen or deciduous forest", "Mixed broadleaved and needleleaved forest", "Mosaic of forest, shrubland and grassland", "Shrubland", "Grassland", "Sparse vegetation", "Flooded broadleaved forest", "Flooded vegetation", "Artificial areas", "Bare areas", "Permanent snow and ice"],
              "pt": ["Culturas Irrigadas", "Rainfed croplands", "Mosaico de areas florestais e de cultivo", "Floresta verde ou semi-decÃ­dua", "Floresta decÃ­dua de folha larga", "Floresta verde de conÃ­feras ou Floresta decÃ­dua", "Misto de floresta de conifera e de folha larga", "Mosaic of forest, shrubland and grassland ", "Shrubland ", "Grassland ", "Sparse vegetation ", "Flooded broadleaved forest ", "Flooded vegetation ", "Artificial areas ", "Bare areas ", "Permanent snow and ice "],
              "id": ["Irrigated croplands", "Rainfed croplands", "Cropland forest mosaic", "Broadleaved evergreen or semi-deciduous forest", "Broadleaved deciduous forest", "Needleleaved evergreen or deciduous forest", "Mixed broadleaved and needleleaved forest", "Mosaic of forest, shrubland and grassland", "Shrubland", "Grassland", "Sparse vegetation", "Flooded broadleaved forest", "Flooded vegetation", "Artificial areas", "Bare areas", "Permanent snow and ice"],
              "zh": ["Irrigated croplands", "Rainfed croplands", "Cropland forest mosaic", "Broadleaved evergreen or semi-deciduous forest", "Broadleaved deciduous forest", "Needleleaved evergreen or deciduous forest", "Mixed broadleaved and needleleaved forest", "Mosaic of forest, shrubland and grassland", "Shrubland", "Grassland", "Sparse vegetation", "Flooded broadleaved forest", "Flooded vegetation", "Artificial areas", "Bare areas", "Permanent snow and ice"],
              "ka": ["áƒ›áƒï¿½ áƒ¬áƒ§áƒ•áƒáƒ“áƒ˜ áƒ¡/áƒ¡ áƒ™áƒ£áƒšáƒ¢áƒ£ï¿½ áƒ”áƒ‘áƒ˜", "áƒ¬áƒ•áƒ˜áƒ›áƒ˜áƒ— áƒ›áƒï¿½ áƒ¬áƒ§áƒ•áƒáƒ“áƒ˜ áƒ™áƒ£áƒšáƒ¢áƒ£ï¿½ áƒ”áƒ‘áƒ˜", "áƒ¡/áƒ¡ áƒ™áƒ£áƒšáƒ¢áƒ£ï¿½ áƒ”áƒ‘áƒ˜áƒ¡ áƒ“áƒ áƒ¢áƒ§áƒ˜áƒ¡ áƒ›áƒáƒ–áƒáƒ˜áƒ™áƒ", "áƒ¤áƒï¿½ áƒ—áƒáƒ¤áƒáƒ—áƒšáƒáƒ•áƒáƒœáƒ˜ áƒ›áƒï¿½ áƒáƒ“áƒ›áƒ¬áƒ•áƒáƒœáƒ” áƒáƒœ áƒœáƒáƒ®áƒ”áƒ•ï¿½ áƒáƒ“-áƒ¤áƒáƒ—áƒáƒšáƒ›áƒªáƒ•áƒ”áƒœáƒ˜ áƒ¢áƒ§áƒ”", "áƒ¤áƒï¿½ áƒ—áƒáƒ¤áƒáƒ—áƒšáƒáƒ•áƒáƒœáƒ˜ áƒ¤áƒáƒ—áƒáƒšáƒ›áƒªáƒ•áƒ”áƒœáƒ˜ áƒ¢áƒ§áƒ”", "áƒ¬áƒ˜áƒ¬áƒ•áƒáƒ•áƒáƒœáƒ˜ áƒ›áƒï¿½ áƒáƒ“áƒ›áƒ¬áƒ•áƒáƒœáƒ” áƒáƒœ áƒ¤áƒáƒ—áƒáƒšáƒ›áƒªáƒ•áƒ”áƒœáƒ˜ áƒ¢áƒ§áƒ”", "áƒ¨áƒ”ï¿½ áƒ”áƒ£áƒšáƒ˜ áƒ¤áƒï¿½ áƒ—áƒáƒ¤áƒáƒ—áƒšáƒáƒ•áƒáƒœáƒ˜ áƒ“áƒ áƒ¬áƒ˜áƒ¬áƒ•áƒáƒ•áƒáƒœáƒ˜ áƒ¢áƒ§áƒ”", "áƒ¢áƒ§áƒ˜áƒ¡, áƒ‘áƒ£áƒ©áƒ¥áƒœáƒï¿½ áƒ˜áƒ¡ áƒ“áƒ áƒ›áƒ˜áƒœáƒ“áƒï¿½ áƒ˜áƒ¡ áƒ›áƒáƒ–áƒáƒ˜áƒ™áƒ", "áƒ‘áƒ£áƒ©áƒ¥áƒœáƒï¿½ áƒ˜", "áƒ›áƒ˜áƒœáƒ“áƒï¿½ áƒ˜", "áƒ›áƒ”áƒ©áƒ®áƒ”ï¿½ áƒ˜ áƒ›áƒªáƒ”áƒœáƒï¿½ áƒ”áƒ£áƒšáƒáƒ‘áƒ", "áƒ“áƒáƒ¢áƒ‘áƒï¿½ áƒ˜áƒšáƒ˜ áƒ¤áƒï¿½ áƒ—áƒáƒ¤áƒáƒ—áƒšáƒáƒ•áƒáƒœáƒ˜ áƒ¢áƒ§áƒ”", "áƒ“áƒáƒ¢áƒ‘áƒï¿½ áƒ˜áƒšáƒ˜ áƒ›áƒªáƒ”áƒœáƒï¿½ áƒ”áƒ£áƒšáƒáƒ‘áƒ", "áƒ¡áƒáƒ®áƒ”áƒªáƒ•áƒšáƒ˜áƒšáƒ˜ (áƒ®áƒ”áƒšáƒáƒ•áƒœáƒ£ï¿½ áƒ˜) áƒáƒ“áƒ’áƒ˜áƒšáƒ”áƒ‘áƒ˜", "áƒ›áƒáƒ¨áƒ˜áƒ¨áƒ•áƒšáƒ”áƒ‘áƒ£áƒšáƒ˜ áƒáƒ“áƒ’áƒ˜áƒšáƒ”áƒ‘áƒ˜", "áƒ›áƒ£áƒ“áƒ›áƒ˜áƒ•áƒ˜ áƒ—áƒáƒ•áƒšáƒ˜ áƒ“áƒ áƒ§áƒ˜áƒœáƒ£áƒšáƒ˜"]
           },
           "colors": ["#D2A965", "#157764", "#CCDB98", "#596B2C", "#D5C998", "#2789D4", "#E9462B", "#F6F0EA", "#A3DCFF", "#FFFFFF"],
           "analysisUrl": "https://production-api.globalforestwatch.org/v1/loss-by-landcover",
           "uiParams": "none",
           "params": [{
              "name": "layer",
              "value": "gfw-landcover-2015"
           }]
        }, {
           "analysisId": "VEGA_RESTORATION_TREE_COVER",
           "label": {
              "en": "Tree cover"
           },
           "title": {
              "en": "Tree cover analysis"
           },
           "description": {
              "en": "Restoration potential per tree cover class"
           },
           "useGfwWidget": true,
           "widgetId": "9a200983-65aa-400e-9415-912ab0312cf8",
           "uiParams": "none"
        }, {
           "analysisId": "VEGA_RESTORATION_LAND_COVER",
           "label": {
              "en": "Land Cover"
           },
           "title": {
              "en": "Land Cover Analysis"
           },
           "description": {
              "en": "Restoration potential per land cover class"
           },
           "useGfwWidget": true,
           "widgetId": "fcf6788a-1382-4e16-8828-0d45354b9def",
           "uiParams": "none"
        }, {
           "analysisId": "VEGA_RESTORATION_POP_DEN",
           "label": {
              "en": "Population Density"
           },
           "title": {
              "en": "Population Density Analysis"
           },
           "description": {
              "en": "Restoration potential per analysis class"
           },
           "useGfwWidget": true,
           "widgetId": "569c65a4-3107-41cc-8100-f5d8dc71ec6e",
           "uiParams": "none"
        }, {
           "analysisId": "VEGA_RESTORATION_RAINFALL",
           "label": {
              "en": "Average Annual Rainfall"
           },
           "title": {
              "en": "Average Annual Rainfall Analysis"
           },
           "description": {
              "en": "Restoration potential per rainfall class"
           },
           "useGfwWidget": true,
           "widgetId": "6ade3c8e-cec1-415e-bf72-3f9cd69e2369",
           "uiParams": "none"
        }, {
           "analysisId": "VEGA_RESTORATION_SLOPE",
           "label": {
              "en": "Slope"
           },
           "title": {
              "en": "Slope Analysis"
           },
           "description": {
              "en": "Restoration potential per slope class"
           },
           "useGfwWidget": true,
           "widgetId": "f01ef13d-cfbe-4588-ae16-27ef2713a15a",
           "uiParams": "none"
        }


     ]




   ,
   "layerPanel":{
      "GROUP_WEBMAP":{
         "order":1,
         "label":{
            "en":"WCS Scapes"
         },
         "layers":[

         ]
      },
      "GROUP_LCD":{
         "groupType":"default",
         "order":2,
         "label":{
            "en":"Land Cover Dynamics",
            "fr":"Evolution de la couverture des sols",
            "es":"Din?mica de la Cobertura del Suelo",
            "pt":"Din?mica de cobertura da terra ",
            "id":"Land Cover Dynamics",
            "zh":"????????",
            "ka":"????? ??????? ????????"
         },
         "layers":[
            {
               "order":1,
               "id":"TREE_COVER_LOSS",
               "type":"loss",
               "url":"https://storage.googleapis.com/wri-public/Hansen_16/tiles/hansen_world/v1/tc30/{z}/{x}/{y}.png",
               "minYear":7,
               "maxYear":20,
               "technicalName":"tree_cover_loss",
               "legendLayer":[
                  0
               ],
               "label":{
                  "en":"Tree Cover Loss",
                  "fr":"Perte en couvert arbor?",
                  "es":"P?rdida de la cobertura arb?rea",
                  "pt":"Perda de cobertura arb?rea",
                  "id":"Tree cover loss",
                  "zh":"??????",
                  "ka":"??? ?????? ??????"
               },
               "sublabel":{
                  "en":"(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)",
                  "fr":"(annuel, 30m, global, Hansen/UMD/Google/USGS/NASA)",
                  "es":"(anual, 30m, global, Hansen/UMD/Google/USGS/NASA)",
                  "pt":"(anual, 30m, global, Hansen/UMD/Google/USGS/NASA)",
                  "id":"(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)",
                  "zh":"(????, 30?, ????, ??/?????/??/???????(USGS)/?????(NASA))",
                  "ka":"(??????, 30?, ?????????, Hansen/UMD/Google/USGS/NASA)"
               }
            },
            {
               "order":2,
               "id":"TREE_COVER_GAIN",
               "type":"gain",
               "url":"https://earthengine.google.org/static/hansen_2013/gain_alpha/{z}/{x}/{y}.png",
               "technicalName":"tree_cover_gain",
               "legendLayer":[
                  1
               ],
               "label":{
                  "en":"Tree cover gain",
                  "fr":"Gain en couvert arbor?",
                  "es":"Aumento de la cobertura arb?rea",
                  "pt":"Ganho de cobertura arb?rea",
                  "id":"Tree cover gain",
                  "zh":"??????",
                  "ka":"??? ?????? ??????"
               },
               "sublabel":{
                  "en":"(12 years, 30m, global, Hansen/UMD/Google/USGS/NASA)",
                  "fr":"(12 ans, 30m, global, Hansen/UMD/Google/USGS/NASA)",
                  "es":"(12 a?os, 30m, global, Hansen/UMD/Google/USGS/NASA)",
                  "pt":"(12 anos, 30m, global, Hansen/UMD/Google/USGS/NASA)",
                  "id":"(12 years, 30m, global, Hansen/UMD/Google/USGS/NASA)",
                  "zh":"(12 ?, 30?, ????, ??/?????/??/???????(USGS)/?????(NASA))",
                  "ka":"(12 ????????, 30?, ?????????, Hansen/UMD/Google/USGS/NASA)"
               }
            },
            {
               "order":3,
               "id":"IMAZON_SAD",
               "type":"dynamic",
               "url":"https://gis-gfw.wri.org/arcgis/rest/services/forest_change/MapServer",
               "technicalName":"imazon_sad",
               "layerIds":[
                  2
               ],
               "label":{
                  "en":"SAD alerts",
                  "fr":"Alertes SAD",
                  "es":"Alertas SAD",
                  "pt":"Alertas SAD",
                  "id":"SAD alerts",
                  "zh":"SAD alerts",
                  "ka":"SAD ?????????????"
               },
               "sublabel":{
                  "en":"(monthly, 250m, Brazilian Amazon, Imazon)",
                  "fr":"(mensuel, 250m, Amazonie br?silienne, Imazon)",
                  "es":"(mensual, 250m, Amazonia brasile?a, Imazon)",
                  "pt":"(mensal, 250m, Amaz?nia brasileira, Imazon)",
                  "id":"(monthly, 250m, Brazilian Amazon, Imazon)",
                  "zh":"(monthly, 250m, Brazilian Amazon, Imazon)",
                  "ka":"(???????????, 250?, ????????? ????????, Imazon)"
               }
            },
            {
               "order":4,
               "id":"GLAD_ALERTS",
               "type":"glad",
               "url":"https://wri-tiles.s3.amazonaws.com/glad_prod/tiles/{z}/{x}/{y}.png",
               "technicalName":"umd_landsat_alerts",
               "legendLayer":[
                  7
               ],
               "minDateValue":15000,
               "maxDateValue":999999,
               "confidence":[
                  0,
                  1
               ],
               "label":{
                  "en":"GLAD Alerts",
                  "fr":"Alertes GLAD",
                  "es":"Alertas GLAD",
                  "pt":"Alertas GLAD",
                  "id":"GLAD Alerts",
                  "zh":"GLAD Alerts",
                  "ka":"GLAD ?????????????"
               },
               "sublabel":{
                  "en":"(weekly, 30m, select countries, UMD/ GLAD)",
                  "fr":"(hebdomadaire, 30m, certains pays, UMD/ GLAD)",
                  "es":"(semanal, 30m, select countries, UMD/ GLAD)",
                  "pt":"(semanal, 30m, select countries, UMD/ GLAD)",
                  "id":"(weekly, 30m, select countries, UMD/ GLAD)",
                  "zh":"(weekly, 30m, select countries, UMD/ GLAD)",
                  "ka":"(?????????????, 30?, ??????? ????????, UMD/ GLAD)"
               }
            },
            {
               "order":5,
               "id":"TERRA_I_ALERTS",
               "type":"terra",
               "url":"https://wri-tiles.s3.amazonaws.com/terrai_prod/tiles/{z}/{x}/{y}.png",
               "technicalName":"terra_i_alerts",
               "legendLayer":[
                  13
               ],
               "maxZoom":10,
               "minDateValue":4000,
               "maxDateValue":20000,
               "imageServer":"https://gis-gfw.wri.org/arcgis/rest/services/image_services/terrai_analysis/ImageServer",
               "label":{
                  "en":"Terra-I Alerts",
                  "fr":"Alertes Terra-I",
                  "es":"Alertas Terra-I",
                  "pt":"Alertas Terra-I",
                  "id":"Terra-I Alerts",
                  "zh":"Terra-I Alerts",
                  "ka":"Terra-I ?????????????"
               },
               "sublabel":{
                  "en":"(monthly, 250m, Latin America, CIAT)",
                  "fr":"(mensuel, 250m, Am?rique Latine, CIAT)",
                  "es":"(mensual, 250m, Latin America, CIAT)",
                  "pt":"(Mensal, 250m, Latin America, CIAT)",
                  "id":"(monthly, 250m, Latin America, CIAT)",
                  "zh":"(monthly, 250m, Latin America, CIAT)",
                  "ka":"(???????????, 250?, ???????? ???????, CIAT)"
               }
            },
            {
               "order":6,
               "id":"VIIRS_ACTIVE_FIRES",
               "type":"dynamic",
               "url":"https://gis-gfw.wri.org/arcgis/rest/services/Fires/FIRMS_Global/MapServer",
               "technicalName":"viirs_fires",
               "layerIds":[
                  8
               ],
               "label":{
                  "en":"VIIRS Active Fires",
                  "fr":"Feux actifs",
                  "es":"Incendios activos",
                  "pt":"Inc?ndios ativos",
                  "id":"Active fires",
                  "zh":"????",
                  "ka":"VIIRS ??????? ????????"
               },
               "sublabel":{
                  "en":"(daily, 375m, global, NASA)",
                  "fr":"(journalier, 375m, global, NASA)",
                  "es":"(Diaria, 375m, global, NASA)",
                  "pt":"(Di?ria, 375m, global, NASA)",
                  "id":"(daily, 375m, global, NASA)",
                  "zh":"(????, 375?, ????, ??????NASA))",
                  "ka":"(???????????, 375?, ?????????, NASA)"
               },
               "popup":{
                  "title":{
                     "en":"Active Fires"
                  },
                  "content":{
                     "en":[
                        {
                           "label":"Brightness",
                           "fieldExpression":"BRIGHTNESS"
                        },
                        {
                           "label":"Confidence",
                           "fieldExpression":"CONFIDENCE"
                        },
                        {
                           "label":"Latitude",
                           "fieldExpression":"LATITUDE"
                        },
                        {
                           "label":"Longitude",
                           "fieldExpression":"LONGITUDE"
                        },
                        {
                           "label":"Acquisition Date",
                           "fieldExpression":"ACQ_DATE:DateString(hideTime:true)"
                        },
                        {
                           "label":"Acquisition Time",
                           "fieldExpression":"ACQ_TIME"
                        }
                     ]
                  },
                  "sublabel":{
                     "en":"(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)",
                     "fr":"(annuel, 30m, global, Hansen/UMD/Google/USGS/NASA)",
                     "es":"(anual, 30m, global, Hansen/UMD/Google/USGS/NASA)",
                     "pt":"(anual, 30m, global, Hansen/UMD/Google/USGS/NASA)",
                     "id":"(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)",
                     "zh":"(????, 30?, ????, ??/?????/??/???????(USGS)/?????(NASA))",
                     "ka":"(??????, 30?, ?????????, Hansen/UMD/Google/USGS/NASA)"
                  }
               }
            },
            {
               "order":7,
               "id":"MODIS_ACTIVE_FIRES",
               "type":"dynamic",
               "url":"https://gis-gfw.wri.org/arcgis/rest/services/Fires/FIRMS_Global/MapServer",
               "technicalName":"firms_active_fires",
               "layerIds":[
                  9
               ],
               "label":{
                  "en":"MODIS Active Fires",
                  "fr":"Feux actifs",
                  "es":"Incendios activos",
                  "pt":"Inc?ndios ativos",
                  "id":"Active fires",
                  "zh":"????",
                  "ka":"MODIS ??????? ????????"
               },
               "sublabel":{
                  "en":"(daily, 1km, global, NASA)",
                  "fr":"(journalier, 1km, global, NASA)",
                  "es":"(Diaria, 1km, global, NASA)",
                  "pt":"(Di?ria, 1km, global, NASA)",
                  "id":"(daily, 1km, global, NASA)",
                  "zh":"(????, 1??, ????, ??????NASA))",
                  "ka":"(???????????, 1??, ?????????, NASA)"
               },
               "popup":{
                  "title":{
                     "en":"Active Fires"
                  },
                  "content":{
                     "en":[
                        {
                           "label":"Brightness",
                           "fieldExpression":"BRIGHTNESS"
                        },
                        {
                           "label":"Confidence",
                           "fieldExpression":"CONFIDENCE"
                        },
                        {
                           "label":"Latitude",
                           "fieldExpression":"LATITUDE"
                        },
                        {
                           "label":"Longitude",
                           "fieldExpression":"LONGITUDE"
                        },
                        {
                           "label":"Acquisition Date",
                           "fieldExpression":"ACQ_DATE:DateString(hideTime:true)"
                        },
                        {
                           "label":"Acquisition Time",
                           "fieldExpression":"ACQ_TIME"
                        }
                     ]
                  },
                  "sublabel":{
                     "en":"(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)",
                     "fr":"(annuel, 30m, global, Hansen/UMD/Google/USGS/NASA)",
                     "es":"(anual, 30m, global, Hansen/UMD/Google/USGS/NASA)",
                     "pt":"(anual, 30m, global, Hansen/UMD/Google/USGS/NASA)",
                     "id":"(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)",
                     "zh":"(????, 30?, ????, ??/?????/??/???????(USGS)/?????(NASA))",
                     "ka":"(??????, 30?, ?????????, Hansen/UMD/Google/USGS/NASA)"
                  }
               }
            }
         ]
      },
      "GROUP_LC":{
         "groupType":"default",
         "order":3,
         "label":{
            "en":"Land Cover",
            "fr":"Couverture des sols",
            "es":"Cobertura terrestre",
            "pt":"Cobertura do Solo",
            "id":"Land Cover",
            "zh":"????",
            "ka":"????? ??????"
         },
         "layers":[
            {
               "order":1,
               "id":"GLOB_MANGROVE",
               "type":"webtiled",
               "url":"https://{subDomain}.ashbu.cartocdn.com/wri-01/api/v1/map/209485bfcb3eafb435befa0c405242ae:1467735931596/0/{level}/{col}/{row}.png",
               "subDomains":[
                  0,
                  1,
                  2,
                  3
               ],
               "technicalName":"global_mangroves",
               "legendLayer":[
                  11
               ],
               "label":{
                  "en":"Global Mangrove",
                  "fr":"Global Mangrove",
                  "es":"Global Mangrove",
                  "pt":"Global Mangrove",
                  "id":"Global Mangrove",
                  "zh":"Global Mangrove",
                  "ka":"????????? ????????"
               }
            },
            {
               "order":2,
               "id":"IFL",
               "type":"dynamic",
               "url":"https://gis-gfw.wri.org/arcgis/rest/services/forest_cover/MapServer",
               "technicalName":"intact_forest_landscapes_change",
               "layerIds":[
                  0
               ],
               "label":{
                  "en":"WCS Intact Forest",
                  "fr":"Paysage forestier intact",
                  "es":"Paisajes Forestales Intactos",
                  "pt":"Paisagens Florestais Intactas",
                  "id":"Intact Forest Landscape",
                  "zh":"??????",
                  "ka":"??????????? ???? ?????????"
               }
            },
            {
               "order":3,
               "id":"AG_BIOMASS",
               "type":"image",
               "url":"https://gis-gfw.wri.org/arcgis/rest/services/image_services/whrc_carbon_tcd/ImageServer",
               "technicalName":"aboveground_biomass",
               "legendLayer":[
                  8
               ],
               "label":{
                  "en":"Aboveground Live Woody Biomass Density",
                  "fr":"Densit? de la biomasse a?rienne vivante",
                  "es":"Densidad de la biomasa viva en la superficie del suelo",
                  "pt":"Densidade de biomassa viva acima do solo",
                  "id":"Aboveground Live Woody Biomass Density",
                  "zh":"Aboveground Live Woody Biomass Density",
                  "ka":"????????? ??????? ???? ???????? ???????"
               }
            },
            {
               "order":4,
               "id":"LAND_COVER",
               "type":"webtiled",
               "url":"https://wri-tiles.s3.amazonaws.com/global-landcover/{level}/{col}/{row}.png",
               "technicalName":"global_landcover",
               "legendLayer":[
                  15
               ],
               "rasterId":"$568",
               "bounds":[
                  1,
                  16
               ],
               "classes":{
                  "en":[
                     "Land Cover",
                     "Agriculture",
                     "Forest",
                     "Grassland",
                     "Shrubland",
                     "Sparse vegetation",
                     "Wetland",
                     "Settlement",
                     "Bare",
                     "Water",
                     "Permanent snow and ice"
                  ],
                  "fr":[
                     "Irrigated croplands",
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
                  "es":[
                     "Irrigated croplands",
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
                  "pt":[
                     "Culturas Irrigadas",
                     "Rainfed croplands",
                     "Mosaico de areas florestais e de cultivo",
                     "Floresta verde ou semi-dec?dua",
                     "Floresta dec?dua de folha larga",
                     "Floresta verde de con?feras ou Floresta dec?dua",
                     "Misto de floresta de conifera e de folha larga",
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
                  "id":[
                     "Irrigated croplands",
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
                  "zh":[
                     "Irrigated croplands",
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
                  "ka":[
                     "????????? ?/? ?????????",
                     "?????? ????????? ?????????",
                     "?/? ?????????? ?? ???? ???????",
                     "?????????????? ??????????? ?? ????????-??????????? ???",
                     "?????????????? ??????????? ???",
                     "????????? ??????????? ?? ??????????? ???",
                     "??????? ?????????????? ?? ????????? ???",
                     "????, ????????? ?? ???????? ???????",
                     "????????",
                     "???????",
                     "??????? ????????????",
                     "????????? ?????????????? ???",
                     "????????? ????????????",
                     "?????????? (?????????) ????????",
                     "???????????? ????????",
                     "??????? ????? ?? ??????"
                  ]
               },
               "colors":[
                  "#D2A965",
                  "#157764",
                  "#CCDB98",
                  "#596B2C",
                  "#D5C998",
                  "#2789D4",
                  "#E9462B",
                  "#F6F0EA",
                  "#A3DCFF",
                  "#FFFFFF"
               ],
               "label":{
                  "en":"Land Cover",
                  "fr":"Couverture des sols",
                  "es":"Cobertura vegetal",
                  "pt":"Land cover",
                  "id":"Land cover",
                  "zh":"????",
                  "ka":"????? ??????"
               }
            },
            {
               "order":5,
               "id":"TREE_COVER",
               "type":"image",
               "url":"https://gis-treecover.wri.org/arcgis/rest/services/TreeCover2000/ImageServer",
               "technicalName":"tree_cover",
               "colormap":[
                  [
                     1,
                     0,
                     179,
                     0
                  ]
               ],
               "inputRange":[
                  30,
                  101
               ],
               "outputRange":[
                  1
               ],
               "opacity":0.8,
               "legendLayer":[
                  2
               ],
               "label":{
                  "en":"Tree cover density",
                  "fr":"Densit? du couvert arbor?",
                  "es":"Densidad de follaje",
                  "pt":"Tree cover density",
                  "id":"Tree cover density",
                  "zh":"??????",
                  "ka":"??? ?????? ???????"
               },
               "sublabel":{
                  "en":"(year 2000, 30m global, Hansen/UMD/Google/USGS/NASA)",
                  "fr":"(ann?e 2000, 30m global, Hansen/UMD/Google/USGS/NASA)",
                  "es":"(2000, 30m, global, Hansen/UMD/Google/USGS/NASA)",
                  "pt":"(year 2000, 30m global, Hansen/UMD/Google/USGS/NASA)",
                  "id":"(year 2000, 30m global, Hansen/UMD/Google/USGS/NASA)",
                  "zh":"(2000?, 30? ????, ??/?????/??/???????(USGS)/?????(NASA))",
                  "ka":"(2000 ?, 30? ?????????, Hansen/UMD/Google/USGS/NASA)"
               }
            }
         ]
      },
      //- "GROUP_Range":{
      //-    "order":4,
      //-    "label":{
      //-       "en":"Species Ranges"
      //-    },
      //-    "layers":[
      //-       {
      //-          "order":1,
      //-          "id":"MR",
      //-          "type":"dynamic",
      //-          "url":"https://ca.dep.state.fl.us/arcgis/rest/services/Map_Direct/Parks/MapServer",
      //-          "layerIds":[
      //-             0
      //-          ],
      //-          "visible":false,
      //-          "label":{
      //-             "en":"Elephant"
      //-          }
      //-       },
      //-       {
      //-          "order":2,
      //-          "id":"MRT",
      //-          "type":"dynamic",
      //-          "url":"https://ca.dep.state.fl.us/arcgis/rest/services/Map_Direct/Parks/MapServer",
      //-          "layerIds":[
      //-             0
      //-          ],
      //-          "visible":false,
      //-          "label":{
      //-             "en":"Tiger"
      //-          }
      //-       },
      //-       {
      //-          "order":3,
      //-          "id":"MRG",
      //-          "type":"dynamic",
      //-          "url":"https://ca.dep.state.fl.us/arcgis/rest/services/Map_Direct/Parks/MapServer",
      //-          "layerIds":[
      //-             0
      //-          ],
      //-          "visible":false,
      //-          "label":{
      //-             "en":"Western Gorilla"
      //-          }
      //-       },
      //-       {
      //-          "order":3,
      //-          "id":"MRJAG",
      //-          "type":"dynamic",
      //-          "url":"https://ca.dep.state.fl.us/arcgis/rest/services/Map_Direct/Parks/MapServer",
      //-          "layerIds":[
      //-             0
      //-          ],
      //-          "visible":false,
      //-          "label":{
      //-             "en":"Jaguar"
      //-          }
      //-       }
      //-    ]
      //- },
      "GROUP_Other":{
         "order":5,
         "label":{
            "en":"Other"
         },
         "layers":[
            {
               "order":1,
               "id":"Oth1",
               "type":"dynamic",
               "url":"https://gis-gfw.wri.org/arcgis/rest/services/hydrology/MapServer",
               "layerIds":[
                  2
               ],
               "visible":false,
               "label":{
                  "en":"Hydrology"
               }
            },
            {
               "order":2,
               "id":"Oth2",
               "type":"dynamic",
               "url":"https://sampleserver6.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer",
               "layerIds":[
                  0
               ],
               "visible":false,
               "label":{
                  "en":"Roads"
               }
            }
         ]
      },
      "GROUP_BASEMAP":{
         "groupType":"basemap",
         "order":200,
         "label":{
            "en":"Basemap",
            "fr":"Basemap",
            "es":"Basemap",
            "pt":"Basemap",
            "id":"Basemap",
            "zh":"Basemap",
            "ka":"?????? ????"
         },
         "layers":[
            {
               "id":"landsat",
               "thumbnailUrl":"https://my.gfw-mapbuilder.org/img/basemaps-sdd18a411a3-5bf18f445e58b8766f773184b7741c67.png",
               "templateUrl":"https://d2h71bpqsyf4vw.cloudfront.net/2016/${level}/${col}/${row}.png",
               "years":[
                  "2000",
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
               "title":{
                  "en":"Landsat",
                  "fr":"Landsat",
                  "es":"Landsat",
                  "pt":"Landsat",
                  "id":"Landsat",
                  "zh":"Landsat",
                  "ka":"Landsat"
               }
            },
            {
               "id":"wri_mono",
               "thumbnailUrl":"https://my.gfw-mapbuilder.org/img/wri_mono.png",
               "title":{
                  "en":"Grey Basemap",
                  "fr":"Mono",
                  "es":"Mono",
                  "pt":"Mono",
                  "id":"Mono",
                  "zh":"Mono",
                  "ka":"Mono"
               }
            },
            {
               "id":"wri_contextual",
               "thumbnailUrl":"https://my.gfw-mapbuilder.org/img/wri_contextual.png",
               "title":{
                  "en":"Contextual",
                  "fr":"Contextual",
                  "es":"Contextual",
                  "pt":"Contextual",
                  "id":"Contextual",
                  "zh":"Contextual",
                  "ka":"Contextual"
               }
            }
         ]
      },
      "extraLayers":[
         {
            "id":"MASK",
            "type":"dynamic",
            "order":10000,
            "url":"https://gis.forest-atlas.org/server/rest/services/country_masks/country_mask_global/MapServer",
            "opacity":0.35,
            "layerIds":[
               0
            ]
         },
         {
            "id":"LEGEND_LAYER",
            "type":"dynamic",
            "url":"https://gis-gfw.wri.org/arcgis/rest/services/legends/MapServer",
            "visible":false,
            "opacity":0,
            "layerIds":[

            ]
         },
         {
            "id":"USER_FEATURES",
            "type":"graphic",
            "visible":true
         }
      ]
   }
 };
