import store from 'js/store/index';
import { mapController } from 'js/controllers/mapController';
import { selectActiveTab, setCanopyDensity } from 'js/store/appState/actions';

/* eslint no-case-declarations: 0 */

//this is a map of what we are tracking and parsing
const urlEncodingMap = {
  lang: 'selectedLanguage',
  b: 'activeBasemap',
  z: 'zoom',
  coords: 'coordinates',
  d: 'density',
  tab: 'activeTab',
  l: 'layers',
  o: 'opacity',
  gs: 'glad_start_date',
  ge: 'glad_end_date',
  vs: 'virs_start_date',
  ve: 'virs_end_date',
  ms: 'modis_start_date',
  me: 'modis_end_date'
};

//Generates a shareable URL
export function getShareableURL(): string {
  const urlParams = [];

  const { appState, mapviewState } = store.getState();

  //Basemap LayerID
  const { activeBasemap } = mapviewState;
  urlParams.push(`b=${activeBasemap}`);

  //X Y Z
  const { zoom, latitude, longitude } = mapController.getMapviewCoordinates();
  console.log(zoom);
  urlParams.push(`z=${zoom}`);
  urlParams.push(`coords=${longitude}%2C${latitude}`);

  //Canopy Density Value
  const { density } = appState.leftPanel;
  urlParams.push(`d=${density}`);

  //Visible Layer IDS Opacity
  const { allAvailableLayers } = mapviewState;
  const visibleLayers = allAvailableLayers.filter(l => l.visible);
  const layerIDS: string[] = [];
  const layerOpacities: number[] = [];
  visibleLayers.forEach(l => {
    if (l.sublayer) {
      layerIDS.push(`${l.parentID}[s]${l.id}`);
    } else {
      layerIDS.push(l.id);
    }
    layerOpacities.push(l.opacity);
  });
  const layerIDSString = layerIDS.join('%2C');
  const layerOpacitiesString = layerOpacities.join('%2C');

  urlParams.push(`l=${layerIDSString}`);
  urlParams.push(`o=${layerOpacitiesString}`);

  //Active Tab
  const { activeTab } = appState.leftPanel;
  urlParams.push(`tab=${activeTab}`);
  return urlParams.join('&');
}

export function getLayerInfoFromURL(): any[] {
  const parsedURL = new URL(window.location.href);
  const allLayerIDS = parsedURL.searchParams.get('l')?.split(',');
  const opacityArray = parsedURL.searchParams
    .get('o')
    ?.split(',')
    .map(o => Number(o));

  const mergedLayerInfosFromUrl = allLayerIDS
    ? allLayerIDS.map((id: string, i: number) => {
        const outputObject = {} as any;
        const isSublayer = id.includes('[s]');
        if (isSublayer) {
          const layerAndSubIds = id.split('[s]');
          outputObject.layerID = layerAndSubIds[0];
          outputObject.sublayerID = layerAndSubIds[1];
          outputObject.opacity = opacityArray?.[i];
        } else {
          outputObject.layerID = id;
          outputObject.sublayerID = null;
          outputObject.opacity = opacityArray?.[i];
        }
        return outputObject;
      })
    : [];
  return mergedLayerInfosFromUrl;
}

export function parseURLandApplyChanges(): void {
  const { mapviewState } = store.getState();
  const parsedURL = new URL(window.location.href);
  Object.keys(urlEncodingMap).forEach((param: string) => {
    const urlParamValue = parsedURL.searchParams.get(param);
    if (urlParamValue) {
      //we got a param match, apply it to the global application state where appropriate
      switch (param) {
        case 'z':
          mapController._mapview.zoom = Number(urlParamValue);
          break;
        case 'coords':
          const coordinates = urlParamValue.split(',').map(c => Number(c));
          mapController._mapview.goTo(coordinates);
          break;
        case 'd':
          store.dispatch(setCanopyDensity(Number(urlParamValue)));
          break;
        case 'tab':
          store.dispatch(selectActiveTab(urlParamValue));
          break;
        default:
          break;
      }
    }
  });
}
