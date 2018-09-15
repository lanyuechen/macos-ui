import React from 'react';
import ReactDOM from 'react-dom';

import Modal from './modal';

function dialog(config) {
  const div = document.createElement('div');
  document.body.appendChild(div);

  function close(...args) {
    if (ReactDOM.unmountComponentAtNode(div) && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    if (config.onCancel) {
      config.onCancel(...args);
    }
  }

  ReactDOM.render((
    <Modal
      name="Finder"
      size="md"
      onCancel={close}
    >
      {config.content}
    </Modal>
  ), div);

  return {
    destroy: close
  };
}

export default dialog;
