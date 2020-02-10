import * as React from 'react';
import { mapController } from 'js/controllers/mapController';

interface LayerTransparencyProps {
  layerID: string;
  layerOpacity: number | undefined;
}

const LayerTransparencySlider = (
  props: LayerTransparencyProps
): React.ReactElement => {
  const { layerID, layerOpacity } = props;

  function handleOpacityChange(e: any) {
    mapController.setLayerOpacity(layerID, e.target.value);
  }

  return (
    <div className="transparency-slider">
      <p>Transparency Slider</p>
      <input
        type="range"
        min="0.1"
        max="1"
        step="0.05"
        name="tslider"
        id=""
        value={layerOpacity}
        onChange={handleOpacityChange}
      />
      <label htmlFor="tslider">{layerOpacity}</label>
    </div>
  );
};

export default LayerTransparencySlider;
