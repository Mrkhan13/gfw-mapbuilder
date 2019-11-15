import ModalWrapper from 'components/Modals/ModalWrapper';
import ModalStore from 'stores/ModalStore';
import {modalText} from 'js/config';
import utils from 'utils/AppUtils';
import React, {Component, PropTypes} from 'react';
import SVGIcon from 'utils/svgIcon';
import resources from '../../../resources';
import {defaultColorTheme} from '../../config';

const windowOptions = 'toolbar=0,status=0,height=650,width=450';

export default class ShareModal extends Component {
  static contextTypes = {
    settings: PropTypes.object.isRequired
  };
  
  constructor (props) {
    super(props);
    this.state = {
      copyText: modalText.share.copyButton,
      ...ModalStore.getState()
    };
  }
  
  componentDidMount() {
    ModalStore.listen(this.storeDidUpdate);
  }
  
  storeDidUpdate = () => {
    this.setState(ModalStore.getState());
  };

  copyShare () {
    const element = this.refs.shareInput;
    if (utils.copySelectionFrom(element)) {
      this.setState({ copyText: modalText.share.copiedButton });
    } else {
      alert(modalText.share.copyFailure);
    }
  }

  shareFacebook () {
    const url = modalText.share.facebookUrl(this.props.url ? this.props.url : this.state.bitlyUrl);
    window.open(url, 'Facebook', windowOptions);
  }

  shareTwitter () {
    const url = modalText.share.twitterUrl(this.props.url ? this.props.url : this.state.bitlyUrl);
    window.open(url, 'Twitter', windowOptions);
  }

  handleFocus (e) {
    setTimeout(() => {
      if (e && e.target) {
        e.target.select();
      }
    }, 0);
  }

  render () {
    const {url} = this.props;
    let customColorTheme;
    if (this.context.settings) {
      customColorTheme = this.context.settings.customColorTheme;
    } else {
      customColorTheme = resources.customColorTheme;
    }
    return (
      <ModalWrapper>
        <div className='modal-title'>{modalText.share.title}</div>
        <div className='share-instructions'>{modalText.share.linkInstructions}</div>
        <div className='share-input'>
          <input ref='shareInput' type='text' readOnly value={url ? url : this.state.bitlyUrl} onClick={this.handleFocus} />
          <button
            style={{border: `1px solid ${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`}}
            className='gfw-btn white pointer'
            onClick={() => this.copyShare()}
          >
            {this.state.copyText}
          </button>
        </div>
        <div className='share-items'>
          <div title='Twitter' className='share-card twitter-modal pointer' onClick={() => this.shareTwitter()}>
            <SVGIcon id={'icon-twitter'} />
          </div>
          <div title='Facebook' className='share-card facebook-modal pointer' onClick={() => this.shareFacebook()}>
            <SVGIcon id={'icon-facebook'} />
          </div>
        </div>
      </ModalWrapper>
    );
  }
}
