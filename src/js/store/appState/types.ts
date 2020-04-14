export interface LeftPanel {
  tabViewVisible: boolean;
  activeTab: string;
  openLayerGroup: string;
  density: 1 | 2 | 3 | 4 | 5 | 6 | 7 | number; //careful about introducing any more density numbers, AG_BIOMASS layer depends on those to render and update
  analysisDateRange: string[];
  analysisYearRange: number[];
}

interface SpecificAreaResults {
  area?: string;
  perimeter?: string;
}

interface SpecificDistanceResults {
  length?: string;
}

interface ClickResults {
  latitude?: number;
  longitude?: number;
}

export interface MeasureContent {
  activeButton?: string;
  areaResults?: SpecificAreaResults;
  distanceResults?: SpecificDistanceResults;
  coordinateMouseClickResults?: any; // ClickResults | undefined | Point;
  coordinatePointerMoveResults?: any; // ClickResults | undefined | Point;
}

interface SelectedSearchWidgetLayer {
  displayField: string;
  layerTitle: string;
}

export interface AppState {
  leftPanel: LeftPanel;
  renderModal: string;
  renderGFWDropdown: boolean;
  infoModalLayerID: string;
  selectedLanguage: string;
  measureContent: MeasureContent;
  hideWidgetActive: boolean;
  isLoggedIn: boolean;
  selectedSearchWidgetLayer: SelectedSearchWidgetLayer;
}

//Action names available
export const RENDER_MODAL = 'RENDER_MODAL';
export const RENDER_INFO_MODAL = 'RENDER_INFO_MODAL';
export const RENDER_GFW_DROPDOWN = 'RENDER_GFW_DROPDOWN';
export const SELECT_ACTIVE_TAB = 'SELECT_ACTIVE_TAB';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const TOGGLE_TABVIEW_PANEL = 'TOGGLE_TABVIEW_PANEL';
export const SET_OPEN_LAYER_GROUP = 'SET_OPEN_LAYER_GROUP';
export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const SET_MEASURE_RESULTS = 'SET_MEASURE_RESULTS';
export const SET_ACTIVE_MEASURE_BUTTON = 'SET_ACTIVE_MEASURE_BUTTON';
export const SET_HIDE_WIDGET = 'SET_HIDE_WIDGET';
export const SET_CANOPY_DENSITY = 'SET_CANOPY_DENSITY';
export const SET_ANALYSIS_DATE = 'SET_ANALYSIS_DATE';
export const SET_ANALYSIS_YEAR_RANGE = 'SET_ANALYSIS_YEAR_RANGE';
export const SET_SELECTED_SEARCH_WIDGET_LAYER =
  'SET_SELECTED_SEARCH_WIDGET_LAYER';

interface SetSelectedSearchWidgetLayer {
  type: typeof SET_SELECTED_SEARCH_WIDGET_LAYER;
  payload: AppState['selectedSearchWidgetLayer'];
}

interface SetOpenLayerGroup {
  type: typeof SET_OPEN_LAYER_GROUP;
  payload: LeftPanel['openLayerGroup'];
}

interface ToggleTabviewPanelAction {
  type: typeof TOGGLE_TABVIEW_PANEL;
  payload: LeftPanel['tabViewVisible'];
}

interface SetCanopyDensity {
  type: typeof SET_CANOPY_DENSITY;
  payload: LeftPanel['density'];
}

interface SetHideWidget {
  type: typeof SET_HIDE_WIDGET;
  payload: AppState['hideWidgetActive'];
}

interface RenderModalAction {
  type: typeof RENDER_MODAL;
  payload: AppState['renderModal'];
}

interface RenderInfoModalAction {
  type: typeof RENDER_INFO_MODAL;
  payload: AppState['infoModalLayerID'];
}

interface RenderGFWDropdownAction {
  type: typeof RENDER_GFW_DROPDOWN;
  payload: AppState['renderGFWDropdown'];
}

interface SetLoggedIn {
  type: typeof SET_LOGGED_IN;
  payload: AppState['isLoggedIn'];
}

interface SelectActiveTab {
  type: typeof SELECT_ACTIVE_TAB;
  payload: LeftPanel['activeTab'];
}

interface SetLanguageAction {
  type: typeof SET_LANGUAGE;
  payload: AppState['selectedLanguage'];
}

interface SetMeasureResults {
  type: typeof SET_MEASURE_RESULTS;
  payload: AppState['measureContent'];
}

interface SetActiveMeasureButton {
  type: typeof SET_ACTIVE_MEASURE_BUTTON;
  payload: AppState['measureContent']['activeButton'];
}

interface SetAnalysisDate {
  type: typeof SET_ANALYSIS_DATE;
  payload: AppState['leftPanel']['analysisDateRange'];
}

interface SetAnalysisYearRange {
  type: typeof SET_ANALYSIS_YEAR_RANGE;
  payload: AppState['leftPanel']['analysisYearRange'];
}

export type AppStateTypes =
  | ToggleTabviewPanelAction
  | RenderModalAction
  | RenderInfoModalAction
  | RenderGFWDropdownAction
  | SelectActiveTab
  | SetLanguageAction
  | SetOpenLayerGroup
  | SetLoggedIn
  | SetMeasureResults
  | SetActiveMeasureButton
  | SetHideWidget
  | SetCanopyDensity
  | SetAnalysisDate
  | SetAnalysisYearRange
  | SetSelectedSearchWidgetLayer;
