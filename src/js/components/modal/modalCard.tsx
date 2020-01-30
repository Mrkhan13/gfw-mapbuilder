import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PrintContent from 'js/components/mapWidgets/widgetContent/printContent';
import ShareContent from 'js/components/mapWidgets/widgetContent/shareContent';
import PenContent from 'js/components/mapWidgets/widgetContent/penContent';
import SearchContent from 'js/components/mapWidgets/widgetContent/searchContent';
import CoordinatesForm from 'js/components/mapWidgets/widgetContent/coordinatesForm';
import MeasureContent from '../mapWidgets/widgetContent/measureContent';

import { renderModal } from 'js/store/appState/actions';

import 'css/modalCard.scss';

const ModalCard: FunctionComponent<{}> = () => {
  const modalType = useSelector((state: any) => state.appState.renderModal);
  const dispatch = useDispatch();
  let className = '';

  const handleEscapeKey = (e: React.KeyboardEvent) => {
    if (e.keyCode === 27) {
      // * NOTE ESC button has a keyCode of 27
      dispatch(renderModal(''));
    }
  };

  const returnContent = () => {
    switch (modalType) {
      case 'PrintWidget':
        return <PrintContent />;
      case 'ShareWidget':
        return <ShareContent />;
      case 'PenWidget':
        // className = 'pen-widget';
        return <PenContent />;
      case 'PenWidget-CoordinatesForm':
        return <CoordinatesForm />;
      case 'SearchWidget':
        return <SearchContent />;
      case 'MeasureWidget':
        className = 'measure-widget';
        return <MeasureContent />;
      default:
        break;
    }
  };

  const setClassName = () => {
    switch (modalType) {
      case 'MeasureWidget':
        return 'measure-widget';
      case 'PenWidget':
        return 'pen-widget';
      default:
        break;
    }
  };

  // switch (modalType) {
  //   case 'MeasureWidget':
  //     className = 'measure-widget';
  //   case 'PenWidget':
  //     className = 'pen-widget';
  //   default:
  //     break;
  // }

  return (
    <>
      <div
        // className={`dim-container ${className}`}
        className={`dim-container ${setClassName()}`}
        onClick={() => dispatch(renderModal(''))}
      ></div>
      {/* <div className={`modal-card-container ${className}`}> */}
      <div className={`modal-card-container ${setClassName()}`}>
        <button
          className="exit-button"
          onClick={() => dispatch(renderModal(''))}
          onKeyDown={e => handleEscapeKey(e)}
        >
          <svg className="svg-icon">
            <svg id="shape-close" viewBox="0 0 25 25">
              <title>Close</title>
              <path d="M 5 19 L 19 5 L 21 7 L 7 21 L 5 19 ZM 7 5 L 21 19 L 19 21 L 5 7 L 7 5 Z"></path>
            </svg>
          </svg>
        </button>
        {returnContent()}
      </div>
    </>
  );
};

export default ModalCard;
