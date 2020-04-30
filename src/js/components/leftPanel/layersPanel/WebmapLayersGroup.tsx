import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'js/store';
import { setOpenLayerGroup } from 'js/store/appState/actions';
import GenericLayerControl from './GenericLayerControl';

interface LayerGroupProps {
  layerGroupKey: string;
  layerGroupConfig: any;
}

const WebmapLayersGroup = (props: LayerGroupProps): React.ReactElement => {
  const { leftPanel } = useSelector((store: RootState) => store.appState);
  const selectedLanguage = useSelector(
    (store: RootState) => store.appState.selectedLanguage
  );

  const { allAvailableLayers } = useSelector(
    (store: RootState) => store.mapviewState
  );

  const language = useSelector(
    (store: RootState) => store.appSettings.language
  );
  const webmapMenuName = useSelector(
    (store: RootState) => store.appSettings.webmapMenuName
  );
  const alternativeWebmapMenuName = useSelector(
    (store: RootState) => store.appSettings.alternativeWebmapMenuName
  );

  const dispatch = useDispatch();

  const { layerGroupKey } = props;

  const webmapNameToUse =
    language === selectedLanguage ? webmapMenuName : alternativeWebmapMenuName;
  const layerGroupTitle = webmapNameToUse || 'Webmap Group';

  const groupOpen = leftPanel.openLayerGroup === layerGroupKey;

  const handleGroupToggle = () => {
    const openGroupKey = groupOpen ? '' : layerGroupKey;
    dispatch(setOpenLayerGroup(openGroupKey));
  };

  return (
    <div className="layer-group-container">
      <div
        className="layer-group-title"
        onClick={handleGroupToggle}
        onKeyPress={handleGroupToggle}
        role="button"
        tabIndex={0}
      >
        <span>{layerGroupTitle}</span>
        <button className="caret-button" onClick={handleGroupToggle}>
          {groupOpen ? '▼' : '▲'}
        </button>
      </div>
      <div className={groupOpen ? 'layers-control-container' : 'hidden'}>
        {allAvailableLayers
          .filter(layer => layer.group === 'webmap')
          .map(layer => (
            <GenericLayerControl
              sublayer={layer.sublayer}
              parentID={layer.parentID}
              id={layer.id}
              key={layer.id}
              type="default"
            />
          ))}
      </div>
    </div>
  );
};

export default WebmapLayersGroup;
