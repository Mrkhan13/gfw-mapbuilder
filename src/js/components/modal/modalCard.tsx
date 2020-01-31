import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PrintContent from 'js/components/mapWidgets/widgetContent/printContent';
import ShareContent from 'js/components/mapWidgets/widgetContent/shareContent';
import PenContent from 'js/components/mapWidgets/widgetContent/penContent';
import SearchContent from 'js/components/mapWidgets/widgetContent/searchContent';
import CoordinatesForm from 'js/components/mapWidgets/widgetContent/coordinatesForm';

import { renderModal } from 'js/store/appState/actions';

import { RootState } from 'js/store/index';

import 'css/modalCard.scss';

const ModalCard: FunctionComponent<{}> = () => {
  const modalType = useSelector(
    (state: RootState) => state.appState.renderModal
  );
  const dispatch = useDispatch();
  let className = '';

  const handleEscapeKey = (e: React.KeyboardEvent): void => {
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
        return <PenContent />;
      case 'PenWidget-CoordinatesForm':
        return <CoordinatesForm />;
      case 'SearchWidget':
        return <SearchContent />;
      default:
        break;
    }
  };

  switch (modalType) {
    case 'PenWidget':
      className = 'pen-widget';
      break;
    default:
      break;
  }
  return (
    <>
      <div
        className="dim-container"
        onClick={(): object => dispatch(renderModal(''))}
        onKeyDown={(): object => dispatch(renderModal(''))}
        role="button"
        tabIndex={0}
      ></div>
      <div className={`modal-card-container ${className}`}>
        <button
          className="exit-button"
          onClick={(): object => dispatch(renderModal(''))}
          onKeyDown={(e): void => handleEscapeKey(e)}
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
