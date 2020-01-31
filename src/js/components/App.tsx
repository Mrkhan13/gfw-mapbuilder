import * as React from 'react';
import { useState, useEffect } from 'react';
import MapContent from './MapContent';
import Header from './header/Header';
import ModalCard from './modal/modalCard';
import { RootState } from 'js/store/index';
import { useSelector, useDispatch } from 'react-redux';

import 'arcgis-js-api/themes/light/main.scss';
import 'css/index.scss';
import resources from '../../../configs/resources';
import { overwriteSettings } from 'js/store/appSettings/actions';

//TODO: SPinners should be SVGs in images/ folder that get imported
const GlobalSpinner = (): React.ReactElement => <h4>App Loading...</h4>;
const MapSpinner = (): React.ReactElement => (
  <h4 style={{ position: 'absolute', top: '50%', left: '50%' }}>
    Map is Loading...
  </h4>
);
// const ErrorScreen = (): React.ReactElement => <h4>Map Loading Error</h4>;

const App = (): JSX.Element => {
  //INIT with global spinner set to true
  const [showGlobalSpinner, setShowGlobalSpinner] = useState(true);
  const dispatch = useDispatch();

  //Mock resources parsing and merging async step here
  useEffect(() => {
    setTimeout(() => {
      //IF APPID > ASYNC Get Resources
      //
      //Determine which resources we are reading from
      //Read our local resources.js file
      dispatch(overwriteSettings(resources));
      //Send that to our redux appSettings overwriting whatever is there
      setShowGlobalSpinner(false);
    }, 500);
  }, [dispatch]); //dispatch should never update and this useEffect should fire only once, adding per eslint rule warning

  //Listen to map loading state that comes from mapController via redux store change
  const isMapReady = useSelector(
    (store: RootState) => store.mapviewState.isMapReady
  );
  // const loadError = useSelector(
  //   (store: RootState) => store.mapviewState.loadError
  // );
  const modalType = useSelector(
    (state: RootState) => state.appState.renderModal
  );

  return (
    <>
      {showGlobalSpinner ? (
        <GlobalSpinner />
      ) : (
        <>
          <Header />
          <MapContent />
          {!isMapReady && <MapSpinner />}
          {modalType.length ? <ModalCard /> : null}
        </>
      )}
    </>
  );
};

export default App;
