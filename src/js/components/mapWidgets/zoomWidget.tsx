import React, { FunctionComponent } from 'react';

import { mapController } from '../../controllers/mapController';

import { ReactComponent as ZoomOutIcon } from '../../../images/zoomOut.svg';
import { ReactComponent as ZoomInIcon } from '../../../images/zoomIn.svg';

const ZoomWidget: FunctionComponent = () => {
  return (
    <>
      <div className="widget-container">
        <button
          className="image-wrapper"
          aria-pressed={undefined}
          onClick={(): void => mapController.zoomInOrOut({ zoomIn: false })}
        >
          <ZoomOutIcon height={25} width={25} fill={'#555'} />
        </button>
      </div>
      <div className="widget-container">
        <button
          className="image-wrapper"
          aria-pressed={undefined}
          onClick={(): void => mapController.zoomInOrOut({ zoomIn: true })}
        >
          <ZoomInIcon height={25} width={25} fill={'#555'} />
        </button>
      </div>
    </>
  );
};

export default ZoomWidget;
